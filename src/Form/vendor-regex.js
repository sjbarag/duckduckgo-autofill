/**
 * Given some ruleSets, create an efficient
 * lookup system for accessing cached regexes by name.
 *
 * @param {VendorRegexConfiguration["regexes"]} ruleSets
 * @return {{RULES: Record<keyof VendorRegexRules, RegExp | undefined>}}
 */
function createCacheableVendorRegexes (ruleSets) {
    const vendorRegExp = {
        /**
         * @type {Record<keyof VendorRegexRules, undefined>}
         */
        RULES: {
            email: undefined,
            tel: undefined,
            organization: undefined,
            'street-address': undefined,
            'address-line1': undefined,
            'address-line2': undefined,
            'address-line3': undefined,
            'address-level2': undefined,
            'address-level1': undefined,
            'postal-code': undefined,
            country: undefined,
            // Note: We place the `cc-name` field for Credit Card first, because
            // it is more specific than the `name` field below and we want to check
            // for it before we catch the more generic one.
            'cc-name': undefined,
            name: undefined,
            'given-name': undefined,
            'additional-name': undefined,
            'family-name': undefined,
            'cc-number': undefined,
            'cc-exp-month': undefined,
            'cc-exp-year': undefined,
            'cc-exp': undefined,
            'cc-type': undefined
        },
        RULE_SETS: ruleSets,
        _getRule (name) {
            let rules = []
            this.RULE_SETS.forEach(set => {
                if (set[name]) {
                    // Add the rule.
                    // We make the regex lower case so that we can match it against the
                    // lower-cased field name and get a rough equivalent of a case-insensitive
                    // match. This avoids a performance cliff with the "iu" flag on regular
                    // expressions.
                    rules.push(`(${set[name]?.toLowerCase()})`.normalize('NFKC'))
                }
            })
            const value = new RegExp(rules.join('|'), 'u')
            Object.defineProperty(this.RULES, name, {get: undefined})
            Object.defineProperty(this.RULES, name, {value})
            return value
        },
        init () {
            Object.keys(this.RULES).forEach(field =>
                Object.defineProperty(this.RULES, field, {
                    get () {
                        return vendorRegExp._getRule(field)
                    }
                })
            )
        }
    }
    vendorRegExp.init()
    return vendorRegExp
}

module.exports.createCacheableVendorRegexes = createCacheableVendorRegexes
