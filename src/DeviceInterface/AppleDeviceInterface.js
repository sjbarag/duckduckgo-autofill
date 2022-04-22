import InterfacePrototype from './InterfacePrototype.js'
import {createTransport} from '../transports/transport.apple'
import {formatDuckAddress, autofillEnabled} from '../autofill-utils'
import {processConfig} from '@duckduckgo/content-scope-scripts/src/apple-utils'
import {fromPlatformConfig} from '../settings/settings'
import {CSS_STYLES} from '../UI/styles/styles'

class AppleDeviceInterface extends InterfacePrototype {
    /* @type {Timeout | undefined} */
    pollingTimeout

    /** @type {Transport} */
    transport = createTransport(this.globalConfig)

    /** @override */
    initialSetupDelayMs = 300

    async isEnabled () {
        return autofillEnabled(this.globalConfig, processConfig)
    }

    constructor (inputTypes, runtime, tooltip, config, platformConfig, settings) {
        super(inputTypes, runtime, tooltip, config, platformConfig, settings)

        // if (this.globalConfig.supportsTopFrame) {
        //     // This is always added as a child frame needs to be informed of a parent frame scroll
        // }
        window.addEventListener('scroll', this)
    }

    /**
     * Poll the native listener until the user has selected a credential.
     * Message return types are:
     * - 'stop' is returned whenever the message sent doesn't match the native last opened tooltip.
     *     - This also is triggered when the close event is called and prevents any edge case continued polling.
     * - 'ok' is when the user has selected a credential and the value can be injected into the page.
     * - 'none' is when the tooltip is open in the native window however hasn't been entered.
     * @returns {Promise<void>}
     */
    async listenForSelectedCredential () {
        // Prevent two timeouts from happening
        clearTimeout(this.pollingTimeout)

        const response = await this.transport.send('getSelectedCredentials')
        switch (response.type) {
        case 'none':
            // Parent hasn't got a selected credential yet
            this.pollingTimeout = setTimeout(() => {
                this.listenForSelectedCredential()
            }, 100)
            return
        case 'ok':
            return this.activeFormSelectedDetail(response.data, response.configType)
        case 'stop':
            // Parent wants us to stop polling

            break
        }
    }

    handleEvent (event) {
        switch (event.type) {
        case 'mouseMove':
            this.processMouseMove(event)
            break
        case 'scroll': {
            this.removeTooltip()
            break
        }
        default:
            super.handleEvent(event)
        }
    }

    processMouseMove (event) {
        this.currentTooltip?.focus(event.detail.x, event.detail.y)
    }

    async setupAutofill () {
        if (this.globalConfig.isApp) {
            await this.getAutofillInitData()
        }

        const signedIn = await this._checkDeviceSignedIn()

        if (signedIn) {
            if (this.globalConfig.isApp) {
                await this.getAddresses()
            }
            this.scanner.forms.forEach(form => form.redecorateAllInputs())
        }

        const cleanup = this.scanner.init()
        this.addLogoutListener(cleanup)
    }

    getUserData () {
        return this.transport.send('emailHandlerGetUserData')
    }

    async getAddresses () {
        if (!this.globalConfig.isApp) return this.getAlias()

        const {addresses} = await this.transport.send('emailHandlerGetAddresses')
        this.storeLocalAddresses(addresses)
        return addresses
    }

    async refreshAlias () {
        await this.transport.send('emailHandlerRefreshAlias')
        // On macOS we also update the addresses stored locally
        if (this.globalConfig.isApp) this.getAddresses()
    }

    async _checkDeviceSignedIn () {
        const {isAppSignedIn} = await this.transport.send('emailHandlerCheckAppSignedInStatus')
        this.isDeviceSignedIn = () => !!isAppSignedIn
        return !!isAppSignedIn
    }

    /**
     * @param {import('../Form/Form').Form} form
     * @param {HTMLInputElement} input
     * @param {() => { x: number; y: number; height: number; width: number; }} getPosition
     * @param {{ x: number; y: number; } | null} click
     * @param {TopContextData} topContextData
     */
    attachTooltipInner (form, input, getPosition, click, topContextData) {
        const {supportsTopFrame} = this.globalConfig

        if (!supportsTopFrame) {
            return super.attachTooltipInner(form, input, getPosition, click, topContextData)
        }

        const showTooltipAtPosition = () => {
            this.showTopTooltip(click, getPosition(), topContextData)
        }
        if (!click &&
            !this.elementIsInViewport(getPosition())) {
            input.scrollIntoView(true)
            setTimeout(showTooltipAtPosition, 500)
            return
        }
        showTooltipAtPosition()
    }

    /**
     * @param {{ x: number; y: number; height: number; width: number; }} inputDimensions
     * @returns {boolean}
     */
    elementIsInViewport (inputDimensions) {
        if (inputDimensions.x < 0 ||
            inputDimensions.y < 0 ||
            inputDimensions.x + inputDimensions.width > document.documentElement.clientWidth ||
            inputDimensions.y + inputDimensions.height > document.documentElement.clientHeight) {
            return false
        }
        const viewport = document.documentElement
        if (inputDimensions.x + inputDimensions.width > viewport.clientWidth ||
            inputDimensions.y + inputDimensions.height > viewport.clientHeight) {
            return false
        }
        return true
    }

    /**
     * @param {{ x: number; y: number; } | null} click
     * @param {{ x: number; y: number; height: number; width: number; }} inputDimensions
     * @param {TopContextData} [data]
     */
    async showTopTooltip (click, inputDimensions, data) {
        let diffX = inputDimensions.x
        let diffY = inputDimensions.y
        if (click) {
            diffX -= click.x
            diffY -= click.y
        } else if (!this.elementIsInViewport(inputDimensions)) {
            // If the focus event is outside the viewport ignore, we've already tried to scroll to it
            return
        }

        const details = {
            wasFromClick: Boolean(click),
            inputTop: Math.floor(diffY),
            inputLeft: Math.floor(diffX),
            inputHeight: Math.floor(inputDimensions.height),
            inputWidth: Math.floor(inputDimensions.width),
            serializedInputContext: JSON.stringify(data)
        }

        await this.transport.send('showAutofillParent', details)

        // Start listening for the user initiated credential
        this.listenForSelectedCredential()
    }

    async removeTooltip () {
        if (!this.globalConfig.supportsTopFrame) return super.removeTooltip()
        this.removeCloseListeners()
        await this.transport.send('closeAutofillParent', {})
    }

    storeUserData ({addUserData: {token, userName, cohort}}) {
        return this.transport.send('emailHandlerStoreToken', {token, username: userName, cohort})
    }

    /**
     * PM endpoints
     */

    /**
     * Sends credentials to the native layer
     * @param {{username: string, password: string}} credentials
     * @deprecated
     */
    storeCredentials (credentials) {
        return this.transport.send('pmHandlerStoreCredentials', credentials)
    }

    /**
     * Gets the init data from the device
     * @returns {APIResponse<PMData>}
     */
    async getAutofillInitData () {
        const response = await this.transport.send('pmHandlerGetAutofillInitData')
        this.storeLocalData(response.success)
        return response
    }

    /**
     * Gets credentials ready for autofill
     * @param {Number} id - the credential id
     * @returns {APIResponse<CredentialsObject>}
     */
    getAutofillCredentials (id) {
        return this.transport.send('pmHandlerGetAutofillCredentials', {id})
    }

    /**
     * Opens the native UI for managing passwords
     */
    openManagePasswords () {
        return this.transport.send('pmHandlerOpenManagePasswords')
    }

    /**
     * Opens the native UI for managing identities
     */
    openManageIdentities () {
        return this.transport.send('pmHandlerOpenManageIdentities')
    }

    /**
     * Opens the native UI for managing credit cards
     */
    openManageCreditCards () {
        return this.transport.send('pmHandlerOpenManageCreditCards')
    }

    /**
     * Gets a single identity obj once the user requests it
     * @param {Number} id
     * @returns {Promise<{success: IdentityObject|undefined}>}
     */
    getAutofillIdentity (id) {
        const identity = this.getLocalIdentities().find(({id: identityId}) => `${identityId}` === `${id}`)
        return Promise.resolve({success: identity})
    }

    /**
     * Gets a single complete credit card obj once the user requests it
     * @param {Number} id
     * @returns {APIResponse<CreditCardObject>}
     */
    getAutofillCreditCard (id) {
        return this.transport.send('pmHandlerGetCreditCard', {id})
    }

    // Used to encode data to send back to the child autofill
    async selectedDetail (detailIn, configType) {
        this.activeFormSelectedDetail(detailIn, configType)
    }

    async getCurrentInputType () {
        const {inputType} = this.getTopContextData() || {}
        return inputType
    }

    async getAlias () {
        const {alias} = await this.transport.send(
            'emailHandlerGetAlias',
            {
                requiresUserPermission: !this.globalConfig.isApp,
                shouldConsumeAliasIfProvided: !this.globalConfig.isApp
            }
        )
        return formatDuckAddress(alias)
    }

    /**
     * @param {PlatformConfig} platformConfig
     * @returns {Promise<import('../settings/settings').AutofillSettings>}
     */
    async getAutofillSettings (platformConfig) {
        return fromPlatformConfig(platformConfig)
    }

    tooltipStyles () {
        return `<style>${CSS_STYLES}</style>`
    }
}

export { AppleDeviceInterface }
