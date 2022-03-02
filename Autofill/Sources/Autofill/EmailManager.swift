import BrowserServicesKit
import Foundation

extension EmailManager: AutofillEmailDelegate {

    public func autofillUserScriptDidRequestSignedInStatus(_: AutofillUserScript) -> Bool {
         return isSignedIn
    }

    public func autofillUserScriptDidRequestUsernameAndAlias(_: AutofillUserScript, completionHandler: @escaping UsernameAndAliasCompletion) {
        getAliasIfNeeded { [weak self] alias, error in
            guard let alias = alias, error == nil, let self = self else {
                completionHandler(nil, nil, error)
                return
            }

            completionHandler(self.username, alias, nil)
        }
    }
    
    public func autofillUserScript(_: AutofillUserScript,
                                   didRequestAliasAndRequiresUserPermission requiresUserPermission: Bool,
                                   shouldConsumeAliasIfProvided: Bool,
                                   completionHandler: @escaping AliasCompletion) {
            
        getAliasIfNeeded { [weak self] newAlias, error in
            guard let newAlias = newAlias, error == nil, let self = self else {
                completionHandler(nil, error)
                return
            }
            
            if requiresUserPermission {
                guard let delegate = self.aliasPermissionDelegate else {
                    assertionFailure("EmailUserScript requires permission to provide Alias")
                    completionHandler(nil, .permissionDelegateNil)
                    return
                }
                
                delegate.emailManager(self, didRequestPermissionToProvideAliasWithCompletion: { [weak self] permissionType in
                    switch permissionType {
                    case .user:
                        if let username = self?.username {
                            completionHandler(username, nil)
                        } else {
                            completionHandler(nil, .userRefused)
                        }
                    case .generated:
                        completionHandler(newAlias, nil)
                        if shouldConsumeAliasIfProvided {
                            self?.consumeAliasAndReplace()
                        }
                    case .none:
                        completionHandler(nil, .userRefused)
                    }
                })
            } else {
                completionHandler(newAlias, nil)
                if shouldConsumeAliasIfProvided {
                    self.consumeAliasAndReplace()
                }
            }
        }
    }
    
    public func autofillUserScriptDidRequestRefreshAlias(_: AutofillUserScript) {
        self.consumeAliasAndReplace()
    }
    
    public func autofillUserScript(_ : AutofillUserScript, didRequestStoreToken token: String, username: String, cohort: String?) {
        storeToken(token, username: username, cohort: cohort)
        NotificationCenter.default.post(name: .emailDidSignIn, object: self)
    }
}
