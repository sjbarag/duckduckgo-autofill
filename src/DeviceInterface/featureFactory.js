import {formSubmissions} from "./form-submissions-feature";

/**
 * @param {GlobalConfig} _globalConfig
 * @param {import("../deviceApiCalls/__generated__/validators-ts").AutofillFeatureToggles} featureToggles
 */
export function createFeatureAwareFactory(_globalConfig, featureToggles) {
    return {
        /**
         * @param {import("../Scanner").Scanner} scanner
         */
        createFormSubmissionsFeature: (scanner) => {
            if (featureToggles.credentials_saving) {
                return formSubmissions(scanner)
            }
            return null;
        },
    }
}
