const { Matching } = require('./matching')
const {matchingConfiguration} = require('./matching-configuration')

const setFormHtml = (html) => {
    document.body.innerHTML = `
    <form>
        ${html}
    </form>
    `
    const formElement = document.querySelector('form')
    const inputs = Array.from(formElement?.querySelectorAll('input') || [])
    const labels = Array.from(formElement?.querySelectorAll('label') || [])
    if (!formElement) throw new Error('unreachable')
    return {formElement, inputs, labels}
}

beforeEach(() => {
    document.body.innerHTML = ''
})

describe('css-selector matching', () => {
    const selectors = matchingConfiguration.strategies.cssSelectors.selectors
    it.each([
        { html: `<input id=mail />`, selector: selectors['email'], matched: true },
        { html: `<input id=oops! />`, selector: selectors['email'], matched: false }
    ])(`$html: '$matched'`, (args) => {
        const { html, matched, selector } = args
        const { inputs } = setFormHtml(html)

        const matching = new Matching(matchingConfiguration)
        const result = matching.execCssSelector(selector, inputs[0])
        expect(result.matched).toBe(matched)
    })
})

describe('ddg-matchers matching', () => {
    const matchers = matchingConfiguration.strategies.ddgMatchers.matchers
    it.each([
        { html: `<input id=email />`, matcher: matchers.email, matched: true },
        { html: `<input id=mail />`, matcher: matchers.email, matched: false },
        { html: `<input id=email-search />`, matcher: matchers.email, matched: false },
        { html: `<input id="mm 2222" />`, matcher: { match: '.+', maxDigits: 3 }, matched: false, proceed: false }
    ])(`$html: '$matcher': $matched`, (args) => {
        const { html, matched, matcher, proceed } = args
        const { inputs, formElement } = setFormHtml(html)

        const matching = new Matching(matchingConfiguration)
        const result = matching.execDDGMatcher(matcher, inputs[0], formElement)
        expect(result.matched).toBe(matched)

        if (typeof proceed !== 'undefined') {
            expect(result.proceed).toBe(proceed)
        }
    })
})

describe('vendor-regexes matching', () => {
    it.each([
        { html: `<input id=email />`, regexName: 'email', matched: true },
        { html: `<input id=email-address />`, regexName: 'email', matched: true },
        { html: `<input name="courriel" />`, regexName: 'email', matched: true }, // fr
        { html: `<input id="メールアドレス" />`, regexName: 'email', matched: true } // ja-JP
    ])(`$html: '$regexName': $matched`, (args) => {
        const { html, matched, regexName } = args
        const { inputs, formElement } = setFormHtml(html)

        const matching = new Matching(matchingConfiguration)
        const regex = matching.vendorRegex(regexName)
        if (!regex) throw new Error('unreachable, vendor regex missing')
        const result = matching.execVendorRegex(regex, inputs[0], formElement)
        expect(result.matched).toBe(matched)
    })
})

describe('matching', () => {
    it('default config', () => {
        const matching = new Matching(Matching.emptyConfig)
        const {formElement, inputs} = setFormHtml(`<input name=email />`)
        const actual = matching.inferInputType(inputs[0], formElement)
        expect(actual).toBe('unknown')
    })
    it.each([
        { html: `<input id=mail />`, subtype: 'identities.emailAddress' },
        { html: `<input name="telefonnummer" value=0123456 />`, subtype: 'identities.phone' },
        { html: `<input id="電話" value=0123456 />`, subtype: 'identities.phone' },
        { html: `<input id="姓" value=0123456 />`, subtype: 'identities.lastName' },
        { html: `<input name="password" />`, subtype: 'credentials.password' },
        { html: `<input name="captcha-password" />`, subtype: 'unknown' },
        { html: `<input name="username" />`, subtype: 'credentials.username' },
        { html: `<input name="username-search" />`, subtype: 'unknown' },
        { html: `<input name="cc-name" />`, subtype: 'creditCard.cardName' },
        { html: `<input name="accountholdername" /><!-- second input is to trigger cc type --><input name="cc-number"/>`, subtype: 'creditCard.cardName' },
        { html: `<input name="Срок действия карты" /><!-- second input is to trigger cc type --><input name="cc-number"/>`, subtype: 'creditCard.expirationMonth' }
    ])(`$html should be '$subtype'`, (args) => {
        const { html, subtype } = args
        const { formElement, inputs } = setFormHtml(html)

        const matching = new Matching(matchingConfiguration)
        const inferred = matching.inferInputType(inputs[0], formElement)
        expect(inferred).toBe(subtype)
    })
    it('should not continue past a ddg-matcher that has a "not" regex', () => {
        const {formElement, inputs} = setFormHtml(`<input name="email-search" />`)
        const matching = new Matching({
            matchers: {
                lists: {},
                fields: {
                    email: {
                        type: 'email',
                        strategies: [
                            { kind: 'ddg-matcher', matcherName: 'email-ddg' },
                            { kind: 'vendor-regex', regexName: 'email' }
                        ]
                    }
                }
            },
            strategies: {
                'vendorRegexes': {
                    rules: {
                        email: null
                    },
                    ruleSets: [
                        {
                            email: 'email-'
                        }
                    ]
                },
                'ddgMatchers': {
                    matchers: {
                        'email-ddg': { match: 'email', not: 'search' }
                    }
                },
                'cssSelectors': {
                    selectors: {}
                }
            }
        })
        const asEmail = matching.inferInputType(inputs[0], formElement)
        /**
         * This should be 'unknown' because the negated 'search' regex in teh ddg-matcher should prevent
         * further strategies like the following vendor one
         */
        expect(asEmail).toBe('unknown')
    })
})
