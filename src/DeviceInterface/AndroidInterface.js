import InterfacePrototype from './InterfacePrototype.js'
import {formatDuckAddress} from '../autofill-utils.js'
import { NativeUIController } from '../UI/controllers/NativeUIController.js'
import { InContextSignup } from '../InContextSignup.js'
import {
    CloseEmailProtectionTabCall,
    EmailProtectionGetCapabilitiesCall,
    EmailProtectionGetUserDataCall, EmailProtectionRemoveUserDataCall,
    EmailProtectionStoreUserDataCall,
    ShowInContextEmailProtectionSignupPromptCall
} from '../deviceApiCalls/__generated__/deviceApiCalls.js'
import {GetAlias} from '../deviceApiCalls/additionalDeviceApiCalls.js'

class AndroidInterface extends InterfacePrototype {
    inContextSignup = new InContextSignup(this)

    /**
     * @returns {Promise<string|undefined>}
     */
    async getAlias () {
        if (this.inContextSignup.isAvailable()) {
            const { isSignedIn } = await this.deviceApi.request(new ShowInContextEmailProtectionSignupPromptCall(null))
            // On Android we can't get the input type data again without
            // refreshing the page, so instead we can mutate it now that we
            // know the user has Email Protection available.
            if (this.settings.availableInputTypes) {
                this.settings.setAvailableInputTypes({email: isSignedIn})
            }
            this.updateForStateChange()
            this.onFinishedAutofill()
        }
        const {alias} = await this.deviceApi.request(new GetAlias({
            requiresUserPermission: !this.globalConfig.isApp,
            shouldConsumeAliasIfProvided: !this.globalConfig.isApp,
            isIncontextSignupAvailable: this.inContextSignup.isAvailable()
        }))
        return alias ? formatDuckAddress(alias) : alias
    }

    /**
     * @override
     */
    createUIController () {
        return new NativeUIController()
    }

    /**
     * @deprecated use `this.settings.availableInputTypes.email` in the future
     * @returns {boolean}
     */
    isDeviceSignedIn () {
        // on non-DDG domains, where `availableInputTypes.email` is present, use it
        if (typeof this.settings.availableInputTypes?.email === 'boolean') {
            return this.settings.availableInputTypes.email
        }

        // ...on other domains we assume true because the script wouldn't exist otherwise
        return true
    }

    async setupAutofill () {
        await this.inContextSignup.init()
    }

    /**
     * Used by the email web app
     * Settings page displays data of the logged in user data
     */
    getUserData () {
        return this.deviceApi.request(new EmailProtectionGetUserDataCall({}))
        // let userData = null
        //
        // try {
        //     userData = JSON.parse(window.EmailInterface.getUserData())
        // } catch (e) {
        //     if (this.globalConfig.isDDGTestMode) {
        //         console.error(e)
        //     }
        // }
        //
        // return Promise.resolve(userData)
    }

    /**
     * Used by the email web app
     * Device capabilities determine which functionality is available to the user
     */
    getEmailProtectionCapabilities () {
        return this.deviceApi.request(new EmailProtectionGetCapabilitiesCall({}))
        // let deviceCapabilities = null
        //
        // try {
        //     deviceCapabilities = JSON.parse(window.EmailInterface.getDeviceCapabilities())
        // } catch (e) {
        //     if (this.globalConfig.isDDGTestMode) {
        //         console.error(e)
        //     }
        // }
        //
        // return Promise.resolve(deviceCapabilities)
    }

    storeUserData ({addUserData}) {
        return this.deviceApi.request(new EmailProtectionStoreUserDataCall(addUserData))
        // return window.EmailInterface.storeCredentials(token, userName, cohort)
    }

    /**
      * Used by the email web app
      * Provides functionality to log the user out
      */
    removeUserData () {
        return this.deviceApi.request(new EmailProtectionRemoveUserDataCall({}))
        // try {
        //     return window.EmailInterface.removeCredentials()
        // } catch (e) {
        //     if (this.globalConfig.isDDGTestMode) {
        //         console.error(e)
        //     }
        // }
    }

    /**
     * Used by the email web app
     * Provides functionality to close the window after in-context sign-up or sign-in
     */
    closeEmailProtection () {
        this.deviceApi.request(new CloseEmailProtectionTabCall(null))
    }

    addLogoutListener (handler) {
        // Only deal with logging out if we're in the email web app
        if (!this.globalConfig.isDDGDomain) return

        window.addEventListener('message', (e) => {
            if (this.globalConfig.isDDGDomain && e.data.emailProtectionSignedOut) {
                handler()
            }
        })
    }

    /** Noop */
    firePixel (_pixelParam) {}
}

export {AndroidInterface}
