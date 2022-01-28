const css = require('./selectors-css')

/**
 * This is here to mimic what Remote Configuration might look like
 * later on.
 *
 * @type {MatchingConfiguration}
 */
const matchingConfiguration = {
    matchers: {
        fields: {
            email: {
                type: 'email',
                strategies: [
                    {kind: 'css-selector', selectorName: 'email'},
                    {kind: 'ddg-matcher', matcherName: 'email'},
                    {kind: 'vendor-regex', regexName: 'email'}
                ]
            },
            password: {
                type: 'password',
                strategies: [
                    {kind: 'css-selector', selectorName: 'password'},
                    {kind: 'ddg-matcher', matcherName: 'password'}
                ]
            },
            username: {
                type: 'username',
                strategies: [
                    {kind: 'css-selector', selectorName: 'username'},
                    {kind: 'ddg-matcher', matcherName: 'username'}
                ]
            },
            firstName: {
                type: 'firstName',
                strategies: [
                    {kind: 'css-selector', selectorName: 'firstName'},
                    {kind: 'ddg-matcher', matcherName: 'firstName'},
                    {kind: 'vendor-regex', regexName: 'given-name'}
                ]
            },
            middleName: {
                type: 'middleName',
                strategies: [
                    {kind: 'css-selector', selectorName: 'middleName'},
                    {kind: 'ddg-matcher', matcherName: 'middleName'},
                    {kind: 'vendor-regex', regexName: 'additional-name'}
                ]
            },
            lastName: {
                type: 'lastName',
                strategies: [
                    {kind: 'css-selector', selectorName: 'lastName'},
                    {kind: 'ddg-matcher', matcherName: 'lastName'},
                    {kind: 'vendor-regex', regexName: 'family-name'}
                ]
            },
            fullName: {
                type: 'fullName',
                strategies: [
                    {kind: 'css-selector', selectorName: 'fullName'},
                    {kind: 'ddg-matcher', matcherName: 'fullName'},
                    {kind: 'vendor-regex', regexName: 'name'}
                ]
            },
            phone: {
                type: 'phone',
                strategies: [
                    {kind: 'css-selector', selectorName: 'phone'},
                    {kind: 'ddg-matcher', matcherName: 'phone'},
                    {kind: 'vendor-regex', regexName: 'tel'}
                ]
            },
            addressStreet: {
                type: 'addressStreet',
                strategies: [
                    {kind: 'css-selector', selectorName: 'addressStreet'},
                    {kind: 'ddg-matcher', matcherName: 'addressStreet'},
                    {kind: 'vendor-regex', regexName: 'address-line1'}
                ]
            },
            addressStreet2: {
                type: 'addressStreet2',
                strategies: [
                    {kind: 'css-selector', selectorName: 'addressStreet2'},
                    {kind: 'ddg-matcher', matcherName: 'addressStreet2'},
                    {kind: 'vendor-regex', regexName: 'address-line2'}
                ]
            },
            addressCity: {
                type: 'addressCity',
                strategies: [
                    {kind: 'css-selector', selectorName: 'addressCity'},
                    {kind: 'ddg-matcher', matcherName: 'addressCity'},
                    {kind: 'vendor-regex', regexName: 'address-level2'}
                ]
            },
            addressProvince: {
                type: 'addressProvince',
                strategies: [
                    {kind: 'css-selector', selectorName: 'addressProvince'},
                    {kind: 'ddg-matcher', matcherName: 'addressProvince'},
                    {kind: 'vendor-regex', regexName: 'address-level1'}
                ]
            },
            addressPostalCode: {
                type: 'addressPostalCode',
                strategies: [
                    {kind: 'css-selector', selectorName: 'addressPostalCode'},
                    {kind: 'ddg-matcher', matcherName: 'addressPostalCode'},
                    {kind: 'vendor-regex', regexName: 'postal-code'}
                ]
            },
            addressCountryCode: {
                type: 'addressCountryCode',
                strategies: [
                    {kind: 'css-selector', selectorName: 'addressCountryCode'},
                    {kind: 'ddg-matcher', matcherName: 'addressCountryCode'},
                    {kind: 'vendor-regex', regexName: 'country'}
                ]
            },
            birthdayDay: {
                type: 'birthdayDay',
                strategies: [
                    {kind: 'css-selector', selectorName: 'birthdayDay'}
                ]
            },
            birthdayMonth: {
                type: 'birthdayMonth',
                strategies: [
                    {kind: 'css-selector', selectorName: 'birthdayMonth'}
                ]
            },
            birthdayYear: {
                type: 'birthdayYear',
                strategies: [
                    {kind: 'css-selector', selectorName: 'birthdayYear'}
                ]
            },
            cardName: {
                type: 'cardName',
                strategies: [
                    {kind: 'css-selector', selectorName: 'cardName'},
                    {kind: 'ddg-matcher', matcherName: 'cardName'},
                    {kind: 'vendor-regex', regexName: 'cc-name'}
                ]
            },
            cardNumber: {
                type: 'cardNumber',
                strategies: [
                    {kind: 'css-selector', selectorName: 'cardNumber'},
                    {kind: 'ddg-matcher', matcherName: 'cardNumber'},
                    {kind: 'vendor-regex', regexName: 'cc-number'}
                ]
            },
            cardSecurityCode: {
                type: 'cardSecurityCode',
                strategies: [
                    {kind: 'css-selector', selectorName: 'cardSecurityCode'},
                    {kind: 'ddg-matcher', matcherName: 'cardSecurityCode'}
                ]
            },
            expirationMonth: {
                type: 'expirationMonth',
                strategies: [
                    {kind: 'css-selector', selectorName: 'expirationMonth'},
                    {kind: 'ddg-matcher', matcherName: 'expirationMonth'},
                    {kind: 'vendor-regex', regexName: 'cc-exp-month'}
                ]
            },
            expirationYear: {
                type: 'expirationYear',
                strategies: [
                    {kind: 'css-selector', selectorName: 'expirationYear'},
                    {kind: 'ddg-matcher', matcherName: 'expirationYear'},
                    {kind: 'vendor-regex', regexName: 'cc-exp-year'}
                ]
            },
            expiration: {
                type: 'expiration',
                strategies: [
                    {kind: 'css-selector', selectorName: 'expiration'},
                    {kind: 'ddg-matcher', matcherName: 'expiration'},
                    {kind: 'vendor-regex', regexName: 'cc-exp'}
                ]
            }
        },
        lists: {
            'email': ['email'],
            'password': ['password'],
            'username': ['username'],
            'cc': ['cardName', 'cardNumber', 'cardSecurityCode', 'expirationMonth', 'expirationYear', 'expiration'],
            'id': [
                'firstName',
                'middleName',
                'lastName',
                'fullName',
                'phone',
                'addressStreet',
                'addressStreet2',
                'addressCity',
                'addressProvince',
                'addressPostalCode',
                'addressCountryCode',
                'birthdayDay',
                'birthdayMonth',
                'birthdayYear'
            ]
        }
    },
    strategies: {
        'cssSelectors': {
            selectors: {
                // todo: FORM_INPUTS_SELECTOR & SUBMIT_BUTTON_SELECTOR - these are not currently used from here.
                // They should be going forward, but for now they are here to
                // satisfy Typescript since that expects the whole configuration

                // Generic
                FORM_INPUTS_SELECTOR: css.FORM_INPUTS_SELECTOR,
                SUBMIT_BUTTON_SELECTOR: css.FORM_INPUTS_SELECTOR,
                GENERIC_TEXT_FIELD: css.__secret_do_not_use.GENERIC_TEXT_FIELD,

                // user
                'email': css.__secret_do_not_use.email,
                'password': css.__secret_do_not_use.password,
                'username': css.__secret_do_not_use.username,

                // CC
                'cardName': css.__secret_do_not_use.cardName,
                'cardNumber': css.__secret_do_not_use.cardNumber,
                'cardSecurityCode': css.__secret_do_not_use.cardSecurityCode,
                'expirationMonth': css.__secret_do_not_use.expirationMonth,
                'expirationYear': css.__secret_do_not_use.expirationYear,
                'expiration': css.__secret_do_not_use.expiration,

                // Identities
                'firstName': css.__secret_do_not_use.firstName,
                'middleName': css.__secret_do_not_use.middleName,
                'lastName': css.__secret_do_not_use.lastName,
                'fullName': css.__secret_do_not_use.fullName,
                'phone': css.__secret_do_not_use.phone,
                'addressStreet': css.__secret_do_not_use.addressStreet1,
                'addressStreet2': css.__secret_do_not_use.addressStreet2,
                'addressCity': css.__secret_do_not_use.addressCity,
                'addressProvince': css.__secret_do_not_use.addressProvince,
                'addressPostalCode': css.__secret_do_not_use.addressPostalCode,
                'addressCountryCode': css.__secret_do_not_use.addressCountryCode,
                'birthdayDay': css.__secret_do_not_use.birthdayDay,
                'birthdayMonth': css.__secret_do_not_use.birthdayMonth,
                'birthdayYear': css.__secret_do_not_use.birthdayYear
            }
        },
        'ddgMatchers': {
            matchers: {
                'email': {match: '.mail', not: 'search'},
                'password': {match: 'password', not: 'captcha'},
                'username': {match: 'user((.)?(name|id|login))?$', not: 'search'},

                // CC
                'cardName': {match: '(card.*name|name.*card)|(card.*holder|holder.*card)|(card.*owner|owner.*card)'},
                'cardNumber': {match: 'card.*number|number.*card'},
                'cardSecurityCode': {match: 'security.?code|card.?verif|cvv|csc|cvc'},
                'expirationMonth': {
                    match: '(card|\\bcc\\b)?.?(exp(iry|iration)?)?.?(month|\\bmm\\b(?![.\\s/-]yy))',
                    not: 'mm[/\\s.\\-_—–]'
                },
                'expirationYear': {match: '(card|\\bcc\\b)?.?(exp(iry|iration)?)?.?(year|yy)', not: 'mm[/\\s.\\-_—–]'},
                'expiration': {
                    match: '(\\bmm\\b|\\b\\d\\d\\b)[/\\s.\\-_—–](\\byy|\\bjj|\\baa|\\b\\d\\d)|\\bexp|\\bvalid(idity| through| until)',
                    not: 'invalid',
                    maxDigits: 6
                },
                //
                // // Identities
                'firstName': {match: '(first|given|fore).?name'},
                'middleName': {match: '(middle|additional).?name'},
                'lastName': {match: '(last|family|sur)[^i]?name'},
                'fullName': {match: '^(full.?|whole\\s)?name\\b', not: 'company|org'},
                'phone': {match: 'phone', not: 'code|pass'},
                'addressStreet': {match: 'address', not: 'email|\\bip\\b|address.*(2|two)|duck|log.?in|sign.?in'},
                'addressStreet2': {
                    match: 'address.*(2|two)|apartment|\\bapt\\b|\\bflat\\b|\\bline.*(2|two)',
                    not: 'email|\\bip\\b|duck|log.?in|sign.?in'
                },
                'addressCity': {match: 'city|town', not: 'vatican'},
                'addressProvince': {match: 'state|province|region|county', not: 'country|united'},
                'addressPostalCode': {match: '\\bzip\\b|postal|post.?code'},
                'addressCountryCode': {match: 'country'}
            }
        },
        'vendorRegexes': {
            'regexes': [
                //= ========================================================================
                // Firefox-specific rules
                {
                    'address-line1': 'addrline1|address_1',
                    'address-line2': 'addrline2|address_2',
                    'address-line3': 'addrline3|address_3',
                    'address-level1': 'land', // de-DE
                    'additional-name': 'apellido.?materno|lastlastname',
                    'cc-name':
                        'accountholdername' +
                        '|titulaire', // fr-FR
                    'cc-number': '(cc|kk)nr', // de-DE
                    'cc-exp-month': '(cc|kk)month', // de-DE
                    'cc-exp-year': '(cc|kk)year', // de-DE
                    'cc-type': 'type' +
                        '|kartenmarke' // de-DE
                },

                //= ========================================================================
                // These are the rules used by Bitwarden [0], converted into RegExp form.
                // [0] https://github.com/bitwarden/browser/blob/c2b8802201fac5e292d55d5caf3f1f78088d823c/src/services/autofill.service.ts#L436
                {
                    email: '(^e-?mail$)|(^email-?address$)',

                    tel:
                        '(^phone$)' +
                        '|(^mobile$)' +
                        '|(^mobile-?phone$)' +
                        '|(^tel$)' +
                        '|(^telephone$)' +
                        '|(^phone-?number$)',

                    organization:
                        '(^company$)' +
                        '|(^company-?name$)' +
                        '|(^organization$)' +
                        '|(^organization-?name$)',

                    'street-address':
                        '(^address$)' +
                        '|(^street-?address$)' +
                        '|(^addr$)' +
                        '|(^street$)' +
                        '|(^mailing-?addr(ess)?$)' + // Modified to not grab lines, below
                        '|(^billing-?addr(ess)?$)' + // Modified to not grab lines, below
                        '|(^mail-?addr(ess)?$)' + // Modified to not grab lines, below
                        '|(^bill-?addr(ess)?$)', // Modified to not grab lines, below

                    'address-line1':
                        '(^address-?1$)' +
                        '|(^address-?line-?1$)' +
                        '|(^addr-?1$)' +
                        '|(^street-?1$)',

                    'address-line2':
                        '(^address-?2$)' +
                        '|(^address-?line-?2$)' +
                        '|(^addr-?2$)' +
                        '|(^street-?2$)',

                    'address-line3':
                        '(^address-?3$)' +
                        '|(^address-?line-?3$)' +
                        '|(^addr-?3$)' +
                        '|(^street-?3$)',

                    'address-level2':
                        '(^city$)' +
                        '|(^town$)' +
                        '|(^address-?level-?2$)' +
                        '|(^address-?city$)' +
                        '|(^address-?town$)',

                    'address-level1':
                        '(^state$)' +
                        '|(^province$)' +
                        '|(^provence$)' +
                        '|(^address-?level-?1$)' +
                        '|(^address-?state$)' +
                        '|(^address-?province$)',

                    'postal-code':
                        '(^postal$)' +
                        '|(^zip$)' +
                        '|(^zip2$)' +
                        '|(^zip-?code$)' +
                        '|(^postal-?code$)' +
                        '|(^post-?code$)' +
                        '|(^address-?zip$)' +
                        '|(^address-?postal$)' +
                        '|(^address-?code$)' +
                        '|(^address-?postal-?code$)' +
                        '|(^address-?zip-?code$)',

                    country:
                        '(^country$)' +
                        '|(^country-?code$)' +
                        '|(^country-?name$)' +
                        '|(^address-?country$)' +
                        '|(^address-?country-?name$)' +
                        '|(^address-?country-?code$)',

                    name: '(^name$)|full-?name|your-?name',

                    'given-name':
                        '(^f-?name$)' +
                        '|(^first-?name$)' +
                        '|(^given-?name$)' +
                        '|(^first-?n$)',

                    'additional-name':
                        '(^m-?name$)' +
                        '|(^middle-?name$)' +
                        '|(^additional-?name$)' +
                        '|(^middle-?initial$)' +
                        '|(^middle-?n$)' +
                        '|(^middle-?i$)',

                    'family-name':
                        '(^l-?name$)' +
                        '|(^last-?name$)' +
                        '|(^s-?name$)' +
                        '|(^surname$)' +
                        '|(^family-?name$)' +
                        '|(^family-?n$)' +
                        '|(^last-?n$)',

                    'cc-name':
                        'cc-?name' +
                        '|card-?name' +
                        '|cardholder-?name' +
                        '|cardholder' +
                        // "|(^name$)" + // Removed to avoid overwriting "name", above.
                        '|(^nom$)',

                    'cc-number':
                        'cc-?number' +
                        '|cc-?num' +
                        '|card-?number' +
                        '|card-?num' +
                        '|(^number$)' +
                        '|(^cc$)' +
                        '|cc-?no' +
                        '|card-?no' +
                        '|(^credit-?card$)' +
                        '|numero-?carte' +
                        '|(^carte$)' +
                        '|(^carte-?credit$)' +
                        '|num-?carte' +
                        '|cb-?num',

                    'cc-exp':
                        '(^cc-?exp$)' +
                        '|(^card-?exp$)' +
                        '|(^cc-?expiration$)' +
                        '|(^card-?expiration$)' +
                        '|(^cc-?ex$)' +
                        '|(^card-?ex$)' +
                        '|(^card-?expire$)' +
                        '|(^card-?expiry$)' +
                        '|(^validite$)' +
                        '|(^expiration$)' +
                        '|(^expiry$)' +
                        '|mm-?yy' +
                        '|mm-?yyyy' +
                        '|yy-?mm' +
                        '|yyyy-?mm' +
                        '|expiration-?date' +
                        '|payment-?card-?expiration' +
                        '|(^payment-?cc-?date$)',

                    'cc-exp-month':
                        '(^exp-?month$)' +
                        '|(^cc-?exp-?month$)' +
                        '|(^cc-?month$)' +
                        '|(^card-?month$)' +
                        '|(^cc-?mo$)' +
                        '|(^card-?mo$)' +
                        '|(^exp-?mo$)' +
                        '|(^card-?exp-?mo$)' +
                        '|(^cc-?exp-?mo$)' +
                        '|(^card-?expiration-?month$)' +
                        '|(^expiration-?month$)' +
                        '|(^cc-?mm$)' +
                        '|(^cc-?m$)' +
                        '|(^card-?mm$)' +
                        '|(^card-?m$)' +
                        '|(^card-?exp-?mm$)' +
                        '|(^cc-?exp-?mm$)' +
                        '|(^exp-?mm$)' +
                        '|(^exp-?m$)' +
                        '|(^expire-?month$)' +
                        '|(^expire-?mo$)' +
                        '|(^expiry-?month$)' +
                        '|(^expiry-?mo$)' +
                        '|(^card-?expire-?month$)' +
                        '|(^card-?expire-?mo$)' +
                        '|(^card-?expiry-?month$)' +
                        '|(^card-?expiry-?mo$)' +
                        '|(^mois-?validite$)' +
                        '|(^mois-?expiration$)' +
                        '|(^m-?validite$)' +
                        '|(^m-?expiration$)' +
                        '|(^expiry-?date-?field-?month$)' +
                        '|(^expiration-?date-?month$)' +
                        '|(^expiration-?date-?mm$)' +
                        '|(^exp-?mon$)' +
                        '|(^validity-?mo$)' +
                        '|(^exp-?date-?mo$)' +
                        '|(^cb-?date-?mois$)' +
                        '|(^date-?m$)',

                    'cc-exp-year':
                        '(^exp-?year$)' +
                        '|(^cc-?exp-?year$)' +
                        '|(^cc-?year$)' +
                        '|(^card-?year$)' +
                        '|(^cc-?yr$)' +
                        '|(^card-?yr$)' +
                        '|(^exp-?yr$)' +
                        '|(^card-?exp-?yr$)' +
                        '|(^cc-?exp-?yr$)' +
                        '|(^card-?expiration-?year$)' +
                        '|(^expiration-?year$)' +
                        '|(^cc-?yy$)' +
                        '|(^cc-?y$)' +
                        '|(^card-?yy$)' +
                        '|(^card-?y$)' +
                        '|(^card-?exp-?yy$)' +
                        '|(^cc-?exp-?yy$)' +
                        '|(^exp-?yy$)' +
                        '|(^exp-?y$)' +
                        '|(^cc-?yyyy$)' +
                        '|(^card-?yyyy$)' +
                        '|(^card-?exp-?yyyy$)' +
                        '|(^cc-?exp-?yyyy$)' +
                        '|(^expire-?year$)' +
                        '|(^expire-?yr$)' +
                        '|(^expiry-?year$)' +
                        '|(^expiry-?yr$)' +
                        '|(^card-?expire-?year$)' +
                        '|(^card-?expire-?yr$)' +
                        '|(^card-?expiry-?year$)' +
                        '|(^card-?expiry-?yr$)' +
                        '|(^an-?validite$)' +
                        '|(^an-?expiration$)' +
                        '|(^annee-?validite$)' +
                        '|(^annee-?expiration$)' +
                        '|(^expiry-?date-?field-?year$)' +
                        '|(^expiration-?date-?year$)' +
                        '|(^cb-?date-?ann$)' +
                        '|(^expiration-?date-?yy$)' +
                        '|(^expiration-?date-?yyyy$)' +
                        '|(^validity-?year$)' +
                        '|(^exp-?date-?year$)' +
                        '|(^date-?y$)',

                    'cc-type':
                        '(^cc-?type$)' +
                        '|(^card-?type$)' +
                        '|(^card-?brand$)' +
                        '|(^cc-?brand$)' +
                        '|(^cb-?type$)'
                },

                //= ========================================================================
                // These rules are from Chromium source codes [1]. Most of them
                // converted to JS format have the same meaning with the original ones except
                // the first line of "address-level1".
                // [1] https://source.chromium.org/chromium/chromium/src/+/master:components/autofill/core/common/autofill_regex_constants.cc
                {
                    // ==== Email ====
                    email:
                        'e.?mail' +
                        '|courriel' + // fr
                        '|correo.*electr(o|ó)nico' + // es-ES
                        '|メールアドレス' + // ja-JP
                        '|Электронной.?Почты' + // ru
                        '|邮件|邮箱' + // zh-CN
                        '|電郵地址' + // zh-TW
                        '|ഇ-മെയില്‍|ഇലക്ട്രോണിക്.?' +
                        'മെയിൽ' + // ml
                        '|ایمیل|پست.*الکترونیک' + // fa
                        '|ईमेल|इलॅक्ट्रॉनिक.?मेल' + // hi
                        '|(\\b|_)eposta(\\b|_)' + // tr
                        '|(?:이메일|전자.?우편|[Ee]-?mail)(.?주소)?', // ko-KR

                    // ==== Telephone ====
                    tel:
                        'phone|mobile|contact.?number' +
                        '|telefonnummer' + // de-DE
                        '|telefono|teléfono' + // es
                        '|telfixe' + // fr-FR
                        '|電話' + // ja-JP
                        '|telefone|telemovel' + // pt-BR, pt-PT
                        '|телефон' + // ru
                        '|मोबाइल' + // hi for mobile
                        '|(\\b|_|\\*)telefon(\\b|_|\\*)' + // tr
                        '|电话' + // zh-CN
                        '|മൊബൈല്‍' + // ml for mobile
                        '|(?:전화|핸드폰|휴대폰|휴대전화)(?:.?번호)?', // ko-KR

                    // ==== Address Fields ====
                    organization:
                        'company|business|organization|organisation' +
                        // '|(?<!con)firma' + // de-DE // // todo: not supported in safari
                        '|empresa' + // es
                        '|societe|société' + // fr-FR
                        '|ragione.?sociale' + // it-IT
                        '|会社' + // ja-JP
                        '|название.?компании' + // ru
                        '|单位|公司' + // zh-CN
                        '|شرکت' + // fa
                        '|회사|직장', // ko-KR

                    'street-address': 'streetaddress|street-address',

                    'address-line1':
                        '^address$|address[_-]?line(one)?|address1|addr1|street' +
                        '|(?:shipping|billing)address$' +
                        '|strasse|straße|hausnummer|housenumber' + // de-DE
                        '|house.?name' + // en-GB
                        '|direccion|dirección' + // es
                        '|adresse' + // fr-FR
                        '|indirizzo' + // it-IT
                        '|^住所$|住所1' + // ja-JP
                        // '|morada|((?<!identificação do )endereço)' + // pt-BR, pt-PT // todo: not supported in safari
                        '|Адрес' + // ru
                        '|地址' + // zh-CN
                        '|(\\b|_)adres(?! (başlığı(nız)?|tarifi))(\\b|_)' + // tr
                        '|^주소.?$|주소.?1', // ko-KR

                    'address-line2':
                        'address[_-]?line(2|two)|address2|addr2|street|suite|unit(?!e)' + // Firefox adds `(?!e)` to unit to skip `United State`
                        '|adresszusatz|ergänzende.?angaben' + // de-DE
                        '|direccion2|colonia|adicional' + // es
                        '|addresssuppl|complementnom|appartement' + // fr-FR
                        '|indirizzo2' + // it-IT
                        '|住所2' + // ja-JP
                        '|complemento|addrcomplement' + // pt-BR, pt-PT
                        '|Улица' + // ru
                        '|地址2' + // zh-CN
                        '|주소.?2', // ko-KR

                    'address-line3':
                        'address[_-]?line(3|three)|address3|addr3|street|suite|unit(?!e)' + // Firefox adds `(?!e)` to unit to skip `United State`
                        '|adresszusatz|ergänzende.?angaben' + // de-DE
                        '|direccion3|colonia|adicional' + // es
                        '|addresssuppl|complementnom|appartement' + // fr-FR
                        '|indirizzo3' + // it-IT
                        '|住所3' + // ja-JP
                        '|complemento|addrcomplement' + // pt-BR, pt-PT
                        '|Улица' + // ru
                        '|地址3' + // zh-CN
                        '|주소.?3', // ko-KR

                    'address-level2':
                        'city|town' +
                        '|\\bort\\b|stadt' + // de-DE
                        '|suburb' + // en-AU
                        '|ciudad|provincia|localidad|poblacion' + // es
                        '|ville|commune' + // fr-FR
                        '|localita' + // it-IT
                        '|市区町村' + // ja-JP
                        '|cidade' + // pt-BR, pt-PT
                        '|Город' + // ru
                        '|市' + // zh-CN
                        '|分區' + // zh-TW
                        '|شهر' + // fa
                        '|शहर' + // hi for city
                        '|ग्राम|गाँव' + // hi for village
                        '|നഗരം|ഗ്രാമം' + // ml for town|village
                        '|((\\b|_|\\*)([İii̇]l[cç]e(miz|niz)?)(\\b|_|\\*))' + // tr
                        '|^시[^도·・]|시[·・]?군[·・]?구', // ko-KR

                    'address-level1':
                    // '(?<!(united|hist|history).?)state|county|region|province' + // todo: not supported in safari
                        'county|region|province' +
                        '|county|principality' + // en-UK
                        '|都道府県' + // ja-JP
                        '|estado|provincia' + // pt-BR, pt-PT
                        '|область' + // ru
                        '|省' + // zh-CN
                        '|地區' + // zh-TW
                        '|സംസ്ഥാനം' + // ml
                        '|استان' + // fa
                        '|राज्य' + // hi
                        '|((\\b|_|\\*)(eyalet|[şs]ehir|[İii̇]l(imiz)?|kent)(\\b|_|\\*))' + // tr
                        '|^시[·・]?도', // ko-KR

                    'postal-code':
                        'zip|postal|post.*code|pcode' +
                        '|pin.?code' + // en-IN
                        '|postleitzahl' + // de-DE
                        '|\\bcp\\b' + // es
                        '|\\bcdp\\b' + // fr-FR
                        '|\\bcap\\b' + // it-IT
                        '|郵便番号' + // ja-JP
                        '|codigo|codpos|\\bcep\\b' + // pt-BR, pt-PT
                        '|Почтовый.?Индекс' + // ru
                        '|पिन.?कोड' + // hi
                        '|പിന്‍കോഡ്' + // ml
                        '|邮政编码|邮编' + // zh-CN
                        '|郵遞區號' + // zh-TW
                        '|(\\b|_)posta kodu(\\b|_)' + // tr
                        '|우편.?번호', // ko-KR

                    country:
                        'country|countries' +
                        '|país|pais' + // es
                        '|(\\b|_)land(\\b|_)(?!.*(mark.*))' + // de-DE landmark is a type in india.
                        // '|(?<!(入|出))国' + // ja-JP // todo: not supported in safari
                        '|国家' + // zh-CN
                        '|국가|나라' + // ko-KR
                        '|(\\b|_)(ülke|ulce|ulke)(\\b|_)' + // tr
                        '|کشور', // fa

                    // ==== Name Fields ====
                    'cc-name':
                        'card.?(?:holder|owner)|name.*(\\b)?on(\\b)?.*card' +
                        '|(?:card|cc).?name|cc.?full.?name' +
                        '|karteninhaber' + // de-DE
                        '|nombre.*tarjeta' + // es
                        '|nom.*carte' + // fr-FR
                        '|nome.*cart' + // it-IT
                        '|名前' + // ja-JP
                        '|Имя.*карты' + // ru
                        '|信用卡开户名|开户名|持卡人姓名' + // zh-CN
                        '|持卡人姓名', // zh-TW

                    name:
                        '^name|full.?name|your.?name|customer.?name|bill.?name|ship.?name' +
                        '|name.*first.*last|firstandlastname' +
                        '|nombre.*y.*apellidos' + // es
                        '|^nom(?!bre)' + // fr-FR
                        '|お名前|氏名' + // ja-JP
                        '|^nome' + // pt-BR, pt-PT
                        '|نام.*نام.*خانوادگی' + // fa
                        '|姓名' + // zh-CN
                        '|(\\b|_|\\*)ad[ı]? soyad[ı]?(\\b|_|\\*)' + // tr
                        '|성명', // ko-KR

                    'given-name':
                        'first.*name|initials|fname|first$|given.*name' +
                        '|vorname' + // de-DE
                        '|nombre' + // es
                        '|forename|prénom|prenom' + // fr-FR
                        '|名' + // ja-JP
                        '|nome' + // pt-BR, pt-PT
                        '|Имя' + // ru
                        '|نام' + // fa
                        '|이름' + // ko-KR
                        '|പേര്' + // ml
                        '|(\\b|_|\\*)(isim|ad|ad(i|ı|iniz|ınız)?)(\\b|_|\\*)' + // tr
                        '|नाम', // hi

                    'additional-name':
                        'middle.*name|mname|middle$|middle.*initial|m\\.i\\.|mi$|\\bmi\\b',

                    'family-name':
                        'last.*name|lname|surname|last$|secondname|family.*name' +
                        '|nachname' + // de-DE
                        '|apellidos?' + // es
                        '|famille|^nom(?!bre)' + // fr-FR
                        '|cognome' + // it-IT
                        '|姓' + // ja-JP
                        '|apelidos|surename|sobrenome' + // pt-BR, pt-PT
                        '|Фамилия' + // ru
                        '|نام.*خانوادگی' + // fa
                        '|उपनाम' + // hi
                        '|മറുപേര്' + // ml
                        '|(\\b|_|\\*)(soyisim|soyad(i|ı|iniz|ınız)?)(\\b|_|\\*)' + // tr
                        '|\\b성(?:[^명]|\\b)', // ko-KR

                    // ==== Credit Card Fields ====
                    // Note: `cc-name` expression has been moved up, above `name`, in
                    // order to handle specialization through ordering.
                    'cc-number':
                        '(add)?(?:card|cc|acct).?(?:number|#|no|num|field)' +
                        // '|(?<!telefon|haus|person|fødsels)nummer' + // de-DE, sv-SE, no // todo: not supported in safari
                        '|カード番号' + // ja-JP
                        '|Номер.*карты' + // ru
                        '|信用卡号|信用卡号码' + // zh-CN
                        '|信用卡卡號' + // zh-TW
                        '|카드' + // ko-KR
                        // es/pt/fr
                        '|(numero|número|numéro)(?!.*(document|fono|phone|réservation))',

                    'cc-exp-month':
                    // 'expir|exp.*mo|exp.*date|ccmonth|cardmonth|addmonth' + // todo: Decide if we need any of this
                        'gueltig|gültig|monat' + // de-DE
                        '|fecha' + // es
                        '|date.*exp' + // fr-FR
                        '|scadenza' + // it-IT
                        '|有効期限' + // ja-JP
                        '|validade' + // pt-BR, pt-PT
                        '|Срок действия карты' + // ru
                        '|月', // zh-CN

                    'cc-exp-year':
                    // 'exp|^/|(add)?year' + // todo: Decide if we need any of this
                        'ablaufdatum|gueltig|gültig|jahr' + // de-DE
                        '|fecha' + // es
                        '|scadenza' + // it-IT
                        '|有効期限' + // ja-JP
                        '|validade' + // pt-BR, pt-PT
                        '|Срок действия карты' + // ru
                        '|年|有效期', // zh-CN

                    'cc-exp':
                        'expir|exp.*date|^expfield$' +
                        '|gueltig|gültig' + // de-DE
                        '|fecha' + // es
                        '|date.*exp' + // fr-FR
                        '|scadenza' + // it-IT
                        '|有効期限' + // ja-JP
                        '|validade' + // pt-BR, pt-PT
                        '|Срок действия карты' // ru
                }
            ]
        }
    }
}

module.exports.matchingConfiguration = matchingConfiguration
