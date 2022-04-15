export const defaultIOSReplacements = {
    contentScope: {
        features: {
            'autofill': {
                exceptions: [],
                state: 'enabled'
            }
        },
        unprotectedTemporary: []
    },
    userUnprotectedDomains: [],
    userPreferences: {
        debug: true,
        platform: {name: 'ios'}
    }
}
export const defaultMacosReplacements = {
    contentScope: {
        features: {
            'autofill': {
                exceptions: [],
                state: 'enabled'
            }
        },
        unprotectedTemporary: []
    },
    userUnprotectedDomains: [],
    userPreferences: {
        debug: true,
        platform: {name: 'macos'}
    }
}

/**
 * Use this to mock webkit message handlers.
 *
 * For example, the following would mock the message 'emailHandlerGetAddresses'
 * and ensure that it returns  { addresses: { privateAddress: "x", personalAddress: "y" } }
 *
 * ```js
 * await createWebkitMocks()
 *     .withPrivateEmail("x")
 *     .withPersonalEmail("y")
 *     .applyTo(page)
 * ```
 * @public
 * @param {"macos" | "ios"} platform
 * @returns {MockBuilder}
 */
export function createWebkitMocks (platform = 'macos') {
    /**
     * Note: this will be mutated
     */
    const webkitBase = {
        pmHandlerGetAutofillInitData: {
            /** @type {PMData} */
            success: {
                identities: [],
                credentials: [],
                creditCards: []
            }
        },
        emailHandlerCheckAppSignedInStatus: {
            isAppSignedIn: true
        },
        emailHandlerGetAddresses: {
            /** @type {EmailAddresses} */
            addresses: {
                personalAddress: '',
                privateAddress: ''
            }
        },
        emailHandlerRefreshAlias: null,
        emailHandlerGetAlias: {
            /** @type {string|null} */
            alias: null
        },
        closeAutofillParent: {},
        getSelectedCredentials: {type: 'none'},

        pmHandlerGetAutofillCredentials: {
            /** @type {CredentialsObject|null} */
            success: null
        },
        getAvailableInputTypes: {
            /** @type {AvailableInputTypes|null} */
            success: {}
        },
        getAutofillData: {
            /** @type {(IdentityObject|CredentialsObject|CredentialsObject) | null} */
            success: null
        }
    }

    /** @type {MockBuilder} */
    const builder = {
        withPrivateEmail (email) {
            if (platform === 'ios') {
                webkitBase.emailHandlerGetAlias.alias = email
            } else {
                webkitBase.emailHandlerGetAddresses.addresses.privateAddress = email
            }
            return this
        },
        withPersonalEmail (email) {
            if (platform === 'ios') {
                webkitBase.emailHandlerGetAlias.alias = email
            } else {
                webkitBase.emailHandlerGetAddresses.addresses.personalAddress = email
            }
            return this
        },
        withIdentity (identity) {
            webkitBase.pmHandlerGetAutofillInitData.success.identities.push(identity)
            return this
        },
        withCredentials: function (credentials) {
            webkitBase.pmHandlerGetAutofillInitData.success.credentials.push(credentials)
            webkitBase.pmHandlerGetAutofillCredentials.success = credentials
            webkitBase.getAutofillData.success = credentials
            return this
        },
        withAvailableInputTypes: function (inputTypes) {
            webkitBase.getAvailableInputTypes.success = inputTypes
            return this
        },
        withFeatureToggles: function (_featureToggles) {
            return this
        },
        tap (fn) {
            fn(webkitBase)
            return this
        },
        async applyTo (page) {
            return withMockedWebkit(page, webkitBase)
        }
    }

    return builder
}

/**
 * This will mock webkit handlers based on the key-values you provide
 *
 * @private
 * @param {import('playwright').Page} page
 * @param {Record<string, any>} mocks
 */
async function withMockedWebkit (page, mocks) {
    await page.addInitScript((mocks) => {
        window.webkit = {
            messageHandlers: {}
        }

        for (let [msgName, response] of Object.entries(mocks)) {
            window.webkit.messageHandlers[msgName] = {
                postMessage: async () => {
                    return JSON.stringify(response)
                }
            }
        }
    }, mocks)
}
