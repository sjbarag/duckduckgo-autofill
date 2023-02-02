import {DeviceApiTransport} from '../../../packages/device-api/index.js'
import {
    GetAvailableInputTypesCall,
    GetRuntimeConfigurationCall,
    SendJSPixelCall,
    SetIncontextSignupInitiallyDismissedAtCall,
    SetIncontextSignupPermanentlyDismissedAtCall,
    GetIncontextSignupDismissedAtCall
} from '../__generated__/deviceApiCalls.js'
import {isAutofillEnabledFromProcessedConfig, isIncontextSignupEnabledFromProcessedConfig} from '../../autofill-utils.js'
import {Settings} from '../../Settings.js'

export class ExtensionTransport extends DeviceApiTransport {
    /** @param {GlobalConfig} globalConfig */
    constructor (globalConfig) {
        super()
        this.config = globalConfig
    }

    async send (deviceApiCall) {
        if (deviceApiCall instanceof GetRuntimeConfigurationCall) {
            return deviceApiCall.result(await extensionSpecificRuntimeConfiguration(this))
        }

        if (deviceApiCall instanceof GetAvailableInputTypesCall) {
            return deviceApiCall.result(await extensionSpecificGetAvailableInputTypes())
        }

        if (deviceApiCall instanceof SetIncontextSignupInitiallyDismissedAtCall) {
            return deviceApiCall.result(await extensionSpecificSetIncontextSignupInitiallyDismissedAtCall(deviceApiCall.params))
        }

        if (deviceApiCall instanceof SetIncontextSignupPermanentlyDismissedAtCall) {
            return deviceApiCall.result(await extensionSpecificSetIncontextSignupPermanentlyDismissedAtCall(deviceApiCall.params))
        }

        if (deviceApiCall instanceof GetIncontextSignupDismissedAtCall) {
            return deviceApiCall.result(await extensionSpecificGetIncontextSignupDismissedAt())
        }

        // TODO: unify all calls to use deviceApiCall.method instead of all these if blocks
        if (deviceApiCall instanceof SendJSPixelCall) {
            return deviceApiCall.result(await extensionSpecificSendPixel(deviceApiCall.params))
        }

        throw new Error('not implemented yet for ' + deviceApiCall.method)
    }
}

/**
 * @param {ExtensionTransport} deviceApi
 * @returns {Promise<ReturnType<GetRuntimeConfigurationCall['result']>>}
 */
async function extensionSpecificRuntimeConfiguration (deviceApi) {
    const contentScope = await getContentScopeConfig()
    const emailProtectionEnabled = isAutofillEnabledFromProcessedConfig(contentScope)
    const incontextSignupEnabled = isIncontextSignupEnabledFromProcessedConfig(contentScope)
    const incontextSignupDismissedAt = await deviceApi.send(new GetIncontextSignupDismissedAtCall(null))

    return {
        success: {
            // @ts-ignore
            contentScope: contentScope,
            // @ts-ignore
            userPreferences: {
                features: {
                    autofill: {
                        settings: {
                            featureToggles: {
                                ...Settings.defaults.featureToggles,
                                emailProtection: emailProtectionEnabled,
                                emailProtection_incontext_signup: incontextSignupEnabled
                            }
                        }
                    },
                    incontextSignup: {
                        settings: {
                            initiallyDismissedAt: incontextSignupDismissedAt.success.initiallyDismissedAt,
                            permanentlyDismissedAt: incontextSignupDismissedAt.success.permanentlyDismissedAt
                        }
                    }
                }
            },
            // @ts-ignore
            userUnprotectedDomains: deviceApi.config?.userUnprotectedDomains
        }
    }
}

async function extensionSpecificGetAvailableInputTypes () {
    const contentScope = await getContentScopeConfig()
    const emailProtectionEnabled = isAutofillEnabledFromProcessedConfig(contentScope)

    return {
        success: {
            ...Settings.defaults.availableInputTypes,
            email: emailProtectionEnabled
        }
    }
}

async function getContentScopeConfig () {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(
            {
                registeredTempAutofillContentScript: true,
                documentUrl: window.location.href
            },
            (response) => {
                if (response && 'site' in response) {
                    resolve(response)
                }
            }
        )
    })
}

/**
 * @param {import('../__generated__/validators-ts').SendJSPixelParams} params
 */
async function extensionSpecificSendPixel (params) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(
            {
                messageType: 'sendJSPixel',
                options: params
            },
            () => {
                resolve(true)
            }
        )
    })
}

async function extensionSpecificGetIncontextSignupDismissedAt () {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(
            {
                messageType: 'getIncontextSignupDismissedAt'
            },
            (response) => {
                resolve(response)
            }
        )
    })
}

/**
 * @param {import('../__generated__/validators-ts').SetIncontextSignupInitiallyDismissedAt} params
 */
async function extensionSpecificSetIncontextSignupInitiallyDismissedAtCall (params) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(
            {
                messageType: 'setIncontextSignupInitiallyDismissedAt',
                options: params
            },
            () => {
                resolve(true)
            }
        )
    })
}

/**
 * @param {import('../__generated__/validators-ts').SetIncontextSignupPermanentlyDismissedAt} params
 */
async function extensionSpecificSetIncontextSignupPermanentlyDismissedAtCall (params) {
    return new Promise(resolve => {
        chrome.runtime.sendMessage(
            {
                messageType: 'setIncontextSignupPermanentlyDismissedAt',
                options: params
            },
            () => {
                resolve(true)
            }
        )
    })
}
