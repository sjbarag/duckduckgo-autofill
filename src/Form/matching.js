const {createCacheableVendorRegexes} = require('./vendor-regex')
const {TEXT_LENGTH_CUTOFF, ATTR_INPUT_TYPE} = require('../constants')
const {FORM_INPUTS_SELECTOR} = require('./selectors-css')

class Matching {
    /**
     * @type {MatchingConfiguration}
     */
    #config;
    /**
     * @type {{RULES: Record<keyof VendorRegexRules, RegExp|undefined>}}
     */
    #vendorRegExpCache;
    /**
     * @type {CssSelectorConfiguration['selectors']}
     */
    #cssSelectors;
    /**
     * @type {Record<string, DDGMatcher>}
     */
    #ddgMatchers;
    /**
     * @type {MatcherLists}
     */
    #matcherLists;
    /**
     * @param {MatchingConfiguration} config
     */
    constructor (config) {
        this.#config = config

        const { rules, ruleSets } = this.#config.strategies.vendorRegexes
        this.#vendorRegExpCache = createCacheableVendorRegexes(rules, ruleSets)
        this.#cssSelectors = this.#config.strategies.cssSelectors.selectors
        this.#ddgMatchers = this.#config.strategies.ddgMatchers.matchers

        this.#matcherLists = {
            cc: [],
            id: [],
            password: [],
            username: [],
            email: []
        }

        Object.keys(this.#config.matchers.lists).forEach(key => {
            const list = this.#config.matchers.lists[key]
            for (let fieldName of list) {
                if (!this.#matcherLists[key]) {
                    this.#matcherLists[key] = []
                }
                this.#matcherLists[key].push(this.#config.matchers.fields[fieldName])
            }
        })
    }

    /**
     * @param {string} regexName
     * @returns {RegExp | undefined}
     */
    vendorRegex (regexName) {
        const match = this.#vendorRegExpCache.RULES[regexName]
        if (!match) {
            console.warn('Vendor Regex not found for', regexName)
            return undefined
        }
        return match
    }

    /**
     * @param {keyof RequiredCssSelectors | string} selectorName
     * @returns {string};
     */
    cssSelector (selectorName) {
        const match = this.#cssSelectors[selectorName]
        if (!match) {
            console.warn('CSS selector not found for %s, using a default value', selectorName)
            if (selectorName === 'FORM_INPUTS_SELECTOR') {
                return FORM_INPUTS_SELECTOR
            }
            return ''
        }
        return match
    }

    /**
     * @param {keyof RequiredCssSelectors | string} matcherName
     * @returns {DDGMatcher | undefined}
     */
    ddgMatcher (matcherName) {
        const match = this.#ddgMatchers[matcherName]
        if (!match) {
            console.warn('DDG matcher not found for', matcherName)
            return undefined
        }
        return match
    }

    /**
     * @param {keyof MatcherLists | string} listName
     */
    matcherList (listName) {
        const matcherList = this.#matcherLists[listName]
        if (!matcherList) {
            console.warn('MatcherList not found for ', listName)
        }
        return matcherList
    }

    /**
     * @param {keyof MatcherLists} listName
     * @returns {string | undefined}
     */
    joinSelectors (listName) {
        const matcherList = this.matcherList(listName)
        if (!matcherList) {
            console.warn('Matcher list not found for', listName)
            return undefined
        }

        /**
         * @type {string[]}
         */
        const selectors = []

        for (let matcher of matcherList) {
            for (let strategy of matcher.strategies) {
                if (strategy.kind === 'css-selector') {
                    selectors.push(this.cssSelector(strategy.selectorName))
                }
            }
        }

        return selectors.join(', ')
    }

    /**
     * Tries to infer the input type
     * @param {HTMLInputElement} input
     * @param {HTMLFormElement} formEl
     * @param {{isLogin?: boolean}} [opts]
     * @returns {SupportedSubTypes | string}
     */
    inferInputType (input, formEl, opts = {}) {
        const presetType = input.getAttribute(ATTR_INPUT_TYPE)
        if (presetType) return presetType

        // For CC forms we run aggressive matches, so we want to make sure we only
        // run them on actual CC forms to avoid false positives and expensive loops
        if (this.isCCForm(formEl)) {
            const ccMatchers = this.matcherList('cc')
            const subtype = this.subtypeFromMatchers(ccMatchers, input, formEl)
            if (subtype) return `creditCard.${subtype}`
        }

        if (this.isPassword(input, formEl)) {
            return 'credentials.password'
        }

        if (this.isEmail(input, formEl)) {
            return opts.isLogin ? 'credentials.username' : 'identities.emailAddress'
        }

        if (this.isUserName(input, formEl)) {
            return 'credentials.username'
        }

        const idMatchers = this.matcherList('id')
        const idSubtype = this.subtypeFromMatchers(idMatchers, input, formEl)
        if (idSubtype) return `identities.${idSubtype}`

        return 'unknown'
    }

    /**
     * Sets the input type as a data attribute to the element and returns it
     * @param {HTMLInputElement} input
     * @param {HTMLFormElement} formEl
     * @param {{isLogin?: boolean}} [opts]
     * @returns {SupportedSubTypes | string}
     */
    setInputType (input, formEl, opts = {}) {
        const type = this.inferInputType(input, formEl, opts)
        input.setAttribute(ATTR_INPUT_TYPE, type)
        return type
    }

    /**
     * Tries to infer input subtype, with checks in decreasing order of reliability
     * @param {Matcher[]} matchers
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @return {MatcherTypeNames|undefined}
     */
    subtypeFromMatchers (matchers, el, form) {
        for (let matcher of matchers) {
            for (let strategy of matcher.strategies) {
                const result = this.executeMatchingStrategy(strategy, el, form)
                if (result.matched) {
                    return matcher.type
                }
                if (!result.matched && result.proceed === false) {
                    // If we get here, do not allow subsequent strategies to continue
                    break
                }
            }
        }
        return undefined
    }
    /**
     * @param {Strategy} strategy
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @returns {MatchingResult}
     */
    executeMatchingStrategy (strategy, el, form) {
        switch (strategy.kind) {
        case 'css-selector': {
            const selector = this.cssSelector(strategy.selectorName)
            return this.execCssSelector(selector, el)
        }
        case 'ddg-matcher': {
            const ddgMatcher = this.ddgMatcher(strategy.matcherName)
            if (!ddgMatcher || !ddgMatcher.match) {
                return { matched: false }
            }
            return this.execDDGMatcher(ddgMatcher, el, form)
        }
        case 'vendor-regex': {
            const rule = this.vendorRegex(strategy.regexName)
            if (!rule) {
                return { matched: false }
            }
            return this.execVendorRegex(rule, el, form)
        }
        default: return { matched: false }
        }
    }

    /**
     * @param {string} cssSelector
     * @param {HTMLInputElement} el
     * @returns {MatchingResult}
     */
    execCssSelector (cssSelector, el) {
        return { matched: el.matches(cssSelector) }
    }

    /**
     * @param {DDGMatcher} ddgMatcher
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @returns {MatchingResult}
     */
    execDDGMatcher (ddgMatcher, el, form) {
        for (let elementString of this.getElementStrings(el, form)) {
            if (!elementString) continue
            elementString = elementString.toLowerCase()

            // Scoring to ensure all DDG tests are valid
            let score = 0
            let requiredScore = ['match', 'not', 'maxDigits'].filter(x => Boolean(ddgMatcher[x])).length
            let matchRexExp = new RegExp(safeRegexString(ddgMatcher.match || ''), 'u')

            // if the `match` regex fails, moves onto the next string
            if (!matchRexExp.test(elementString)) {
                continue
            }

            // Otherwise, increment the score
            score++

            // If a negated regex was provided, ensure it does not match
            // If it DOES match - then we need to prevent any future strategies from continuing
            if (ddgMatcher.not) {
                let matchRex = new RegExp(safeRegexString(ddgMatcher.not), 'u')
                if (matchRex.test(elementString)) {
                    return { matched: false, proceed: false }
                } else {
                    // All good here, increment the score
                    score++
                }
            }

            // If a 'maxDigits' rule was provided, validate it
            if (ddgMatcher.maxDigits) {
                const digitLength = elementString.replace(/[^0-9]/g, '').length
                if (digitLength > ddgMatcher.maxDigits) {
                    return { matched: false, proceed: false }
                } else {
                    score++
                }
            }

            if (score === requiredScore) {
                return { matched: true }
            }
        }
        return { matched: false }
    }

    /**
     * @param {RegExp} regex
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @return {MatchingResult}
     */
    execVendorRegex (regex, el, form) {
        for (let elementString of this.getElementStrings(el, form)) {
            elementString = elementString.toLowerCase()
            if (!elementString) continue
            if (regex.test(elementString.toLowerCase())) {
                return { matched: true }
            }
        }
        return { matched: false }
    }

    /**
     * Yield strings in the order in which they should be checked against.
     *
     * For example, id is first, since this has the highest chance of matching
     * and then the rest are in decreasing order of value
     *
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @returns {Generator<string, void, *>}
     */
    * getElementStrings (el, form) {
        yield el.id
        yield el.name
        yield getExplicitLabelsText(el)
        yield el.placeholder || ''
        yield getRelatedText(el, form, this.cssSelector('FORM_INPUTS_SELECTOR'))
    }

    /**
     * Tries to infer if input is for password
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     */
    isPassword (el, form) {
        const pwMatchers = this.matcherList('password')
        return !!this.subtypeFromMatchers(pwMatchers, el, form)
    }

    /**
     * Tries to infer if input is for email
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @return {boolean}
     */
    isEmail (el, form) {
        const emailMatchers = this.matcherList('email')
        return !!this.subtypeFromMatchers(emailMatchers, el, form)
    }

    /**
     * Tries to infer if input is for username
     * @param {HTMLInputElement} el
     * @param {HTMLFormElement} form
     * @return {boolean}
     */
    isUserName (el, form) {
        const usernameMatchers = this.matcherList('username')
        return !!this.subtypeFromMatchers(usernameMatchers, el, form)
    }

    /**
     * Tries to infer if it's a credit card form
     * @param {HTMLFormElement} formEl
     * @returns {boolean}
     */
    isCCForm (formEl) {
        const ccFieldSelector = this.joinSelectors('cc')
        if (!ccFieldSelector) {
            return false
        }
        const hasCCSelectorChild = formEl.querySelector(ccFieldSelector)
        // If the form contains one of the specific selectors, we have high confidence
        if (hasCCSelectorChild) return true

        // Read form attributes to find a signal
        const hasCCAttribute = [...formEl.attributes].some(({name, value}) =>
            /(credit|payment).?card/i.test(`${name}=${value}`)
        )
        if (hasCCAttribute) return true

        // Match form textContent against common cc fields (includes hidden labels)
        const textMatches = formEl.textContent?.match(/(credit)?card(.?number)?|ccv|security.?code|cvv|cvc|csc/ig)

        // We check for more than one to minimise false positives
        return Boolean(textMatches && textMatches.length > 1)
    }

    /**
     * @param {MatcherConfiguration} matcherConfig
     * @param {string} listName
     * @return {Matcher[]}
     */
    static toMatcherList (matcherConfig, listName) {
        /**
         * @type {Matcher[]}
         */
        const matchers = []
        matcherConfig.lists[listName].forEach((matcherName) => {
            matchers.push(matcherConfig.fields[matcherName])
        })
        return matchers
    }

    /**
     * @type {MatchingConfiguration}
     */
    static emptyConfig = {
        matchers: {
            lists: {},
            fields: {}
        },
        strategies: {
            'vendorRegexes': {
                rules: {},
                ruleSets: []
            },
            'ddgMatchers': {
                matchers: {}
            },
            'cssSelectors': {
                selectors: {}
            }
        }
    }
}

module.exports.Matching = Matching

/**
 * Retrieves the input main type
 * @param {HTMLInputElement} input
 * @returns {SupportedSubTypes | string}
 */
const getInputMainType = (input) =>
    input.getAttribute(ATTR_INPUT_TYPE)?.split('.')[0] ||
    'unknown'

/**
 * Retrieves the input subtype
 * @param {HTMLInputElement|Element} input
 * @returns {SupportedSubTypes | string}
 */
const getInputSubtype = (input) =>
    input.getAttribute(ATTR_INPUT_TYPE)?.split('.')[1] ||
    input.getAttribute(ATTR_INPUT_TYPE)?.split('.')[0] ||
    'unknown'

/**
 * Remove whitespace of more than 2 in a row and trim the string
 * @param string
 * @return {string}
 */
const removeExcessWhitespace = (string = '') => {
    return string.replace(/\s{2,}/, ' ').trim()
}

/**
 * Get text from all explicit labels
 * @param {HTMLInputElement} el
 * @return {String}
 */
const getExplicitLabelsText = (el) => {
    const text = [...(el.labels || [])].reduce((text, label) => `${text} ${label.textContent}`, '')
    const ariaLabel = el.getAttribute('aria-label') || ''
    const labelledByText = document.getElementById(el.getAttribute('aria-labelled') || '')?.textContent || ''
    return removeExcessWhitespace(`${text} ${ariaLabel} ${labelledByText}`)
}

/**
 * Get all text close to the input (useful when no labels are defined)
 * @param {HTMLInputElement} el
 * @param {HTMLFormElement} form
 * @param {string} cssSelector
 * @return {string}
 */
const getRelatedText = (el, form, cssSelector) => {
    const container = getLargestMeaningfulContainer(el, form, cssSelector)

    // If there is no meaningful container return empty string
    if (container === el || container.nodeName === 'SELECT') return ''

    // If the container has a select element, remove its contents to avoid noise
    const noisyText = container.querySelector('select')?.textContent || ''
    const sanitizedText = removeExcessWhitespace(container.textContent?.replace(noisyText, ''))
    // If the text is longer than n chars it's too noisy and likely to yield false positives, so return ''
    if (sanitizedText.length < TEXT_LENGTH_CUTOFF) return sanitizedText
    return ''
}

/**
 * Find a container for the input field that won't contain other inputs (useful to get elements related to the field)
 * @param {HTMLElement} el
 * @param {HTMLFormElement} form
 * @param {string} cssSelector
 * @return {HTMLElement}
 */
const getLargestMeaningfulContainer = (el, form, cssSelector) => {
    /* TODO: there could be more than one select el for the same label, in that case we should
        change how we compute the container */
    const parentElement = el.parentElement
    if (!parentElement || el === form) return el

    const inputsInParentsScope = parentElement.querySelectorAll(cssSelector)
    // To avoid noise, ensure that our input is the only in scope
    if (inputsInParentsScope.length === 1) {
        return getLargestMeaningfulContainer(parentElement, form, cssSelector)
    }
    return el
}

/**
 * Find a regex match for a given input
 * @param {HTMLInputElement} input
 * @param {RegExp} regex
 * @param {HTMLFormElement} form
 * @param {string} cssSelector
 * @returns {RegExpMatchArray|null}
 */
const matchInPlaceholderAndLabels = (input, regex, form, cssSelector) => {
    return input.placeholder?.match(regex) ||
        getExplicitLabelsText(input).match(regex) ||
        getRelatedText(input, form, cssSelector).match(regex)
}

/**
 * Check if a given input matches a regex
 * @param {HTMLInputElement} input
 * @param {RegExp} regex
 * @param {HTMLFormElement} form
 * @param {string} cssSelector
 * @returns {boolean}
 */
const checkPlaceholderAndLabels = (input, regex, form, cssSelector) => {
    return !!matchInPlaceholderAndLabels(input, regex, form, cssSelector)
}

/**
 * @param {string} string
 * @returns {string} string
 */
const safeRegexString = (string) => {
    return String(string).toLowerCase().normalize('NFKC')
}

module.exports.getInputSubtype = getInputSubtype
module.exports.removeExcessWhitespace = removeExcessWhitespace
module.exports.getInputMainType = getInputMainType
module.exports.getExplicitLabelsText = getExplicitLabelsText
module.exports.getRelatedText = getRelatedText
module.exports.matchInPlaceholderAndLabels = matchInPlaceholderAndLabels
module.exports.checkPlaceholderAndLabels = checkPlaceholderAndLabels
