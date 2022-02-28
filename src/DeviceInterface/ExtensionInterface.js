const InterfacePrototype = require('./InterfacePrototype.js')
const {
    SIGN_IN_MSG,
    notifyWebApp, isDDGDomain,
    sendAndWaitForAnswer, setValue,
    formatDuckAddress,
    autofillEnabled, getDaxBoundingBox
} = require('../autofill-utils')
const {scanForInputs} = require('../scanForInputs.js')

/**
 * @implements {FeatureToggles}
 * @implements {TooltipPosition}
 */
class ExtensionInterface extends InterfacePrototype {
    /** @type {FeatureToggleNames[]} */
    supportedFeatures = ['email.protection'];

    async isEnabled () {
        if (!autofillEnabled()) return false
        return new Promise(resolve => {
            // Check if the site is marked to skip autofill
            chrome.runtime.sendMessage(
                {
                    registeredTempAutofillContentScript: true,
                    documentUrl: window.location.href
                },
                (response) => {
                    if (!response?.site?.brokenFeatures?.includes('autofill')) {
                        resolve(true)
                    }
                    resolve(false)
                }
            )
        })
    }

    isDeviceSignedIn () {
        return this.hasLocalAddresses
    }

    setupAutofill ({shouldLog} = {shouldLog: false}) {
        this.getAddresses().then(_addresses => {
            if (this.hasLocalAddresses) {
                notifyWebApp({ deviceSignedIn: {value: true, shouldLog} })
                const cleanup = scanForInputs(this).init()
                this.addLogoutListener(cleanup)
            } else {
                this.trySigningIn()
            }
        })
    }

    getAddresses () {
        return new Promise(resolve => chrome.runtime.sendMessage(
            {getAddresses: true},
            (data) => {
                this.storeLocalAddresses(data)
                return resolve(data)
            }
        ))
    }

    refreshAlias () {
        return chrome.runtime.sendMessage(
            {refreshAlias: true},
            (addresses) => this.storeLocalAddresses(addresses)
        )
    }

    async trySigningIn () {
        if (isDDGDomain()) {
            const data = await sendAndWaitForAnswer(SIGN_IN_MSG, 'addUserData')
            this.storeUserData(data)
        }
    }

    storeUserData (data) {
        return chrome.runtime.sendMessage(data)
    }

    addDeviceListeners () {
        // Add contextual menu listeners
        let activeEl = null
        document.addEventListener('contextmenu', e => {
            activeEl = e.target
        })

        chrome.runtime.onMessage.addListener((message, sender) => {
            if (sender.id !== chrome.runtime.id) return

            switch (message.type) {
            case 'ddgUserReady':
                this.setupAutofill({shouldLog: true})
                break
            case 'contextualAutofill':
                setValue(activeEl, formatDuckAddress(message.alias))
                activeEl.classList.add('ddg-autofilled')
                this.refreshAlias()

                // If the user changes the alias, remove the decoration
                activeEl.addEventListener(
                    'input',
                    (e) => e.target.classList.remove('ddg-autofilled'),
                    {once: true}
                )
                break
            default:
                break
            }
        })
    }

    addLogoutListener (handler) {
        // Cleanup on logout events
        chrome.runtime.onMessage.addListener((message, sender) => {
            if (sender.id === chrome.runtime.id && message.type === 'logout') {
                handler()
            }
        })
    }

    getTooltipPosition (input) {
        return getDaxBoundingBox(input)
    }

    supportsFeature (_name) {
        return false
    }
}

module.exports = ExtensionInterface
