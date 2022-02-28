interface CredentialsObject {
     id: string,
     username: string,
     password?: string,
}

interface IdentityObject {
     id: string,
     title: string,
     firstName?: string,
     middleName?: string,
     lastName?: string,
     birthdayDay?: string,
     birthdayMonth?: string,
     birthdayYear?: string,
     addressStreet?: string,
     addressStreet2?: string,
     addressCity?: string,
     addressProvince?: string,
     addressPostalCode?: string,
     addressCountryCode?: string,
     phone?: string,
     emailAddress?: string,
}

interface CreditCardObject {
     id: string,
     title: string,
     displayNumber: string,
     cardName?: string,
     cardstring?: string,
     cardSecurityCode?: string,
     expirationMonth?: string,
     expirationYear?: string,
     cardNumber?: number
}

interface InboundPMData {
     credentials: CredentialsObject[],
     creditCards: CreditCardObject[],
     identities: IdentityObject[],
     serializedInputContext: string,
}

interface TopContextData {
     inputType: SupportedType,
     credentials?: CredentialsObject[]
}

interface PMData {
     credentials: CredentialsObject[],
     creditCards: CreditCardObject[],
     identities: IdentityObject[],
     topContextData?: TopContextData,
}

type APIResponseObject<Type> = { success: Type[], error?: string };
type APIResponse<Type> = Promise<APIResponseObject<Type>>

interface EmailAddresses {
     privateAddress?: string,
     personalAddress?: string
}

type FeatureToggleNames =
  | "password.generation"
  | "email.protection"
  | "logins+"

interface FeatureToggles {
     supportsFeature(name: FeatureToggleNames): boolean;
     supportedFeatures: string[]
}

interface TooltipPosition {
     getTooltipPosition(input: HTMLInputElement): {
          height: number;
          width: number;
          x: number;
          y: number;
     }
}
