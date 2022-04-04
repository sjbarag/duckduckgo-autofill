const InterfacePrototype = require('./InterfacePrototype')
const {createGlobalConfig} = require('../config')
describe('InterfacePrototype', () => {
    it('storeLocalData should handle duplicate emails', () => {
        const int = new InterfacePrototype(createGlobalConfig())
        int.storeLocalAddresses({
            privateAddress: 'gergoiuh539845',
            personalAddress: 'shane'
        })
        int.storeLocalData({
            identities: [{
                id: '01',
                emailAddress: 'shane@duck.com',
                title: 'Main'
            }],
            credentials: [],
            creditCards: [],
            serializedInputContext: ''
        })
        // this should result in 2 identities - 2 from email and the other one matches, so is merged
        expect(int.getLocalIdentities().length).toBe(2)
    })
    it('storeLocalData should handle none-duplicates', () => {
        const int = new InterfacePrototype(createGlobalConfig())
        int.storeLocalAddresses({
            privateAddress: 'gergoiuh539845',
            personalAddress: 'shane'
        })
        int.storeLocalData({
            identities: [{
                id: '01',
                emailAddress: 'shane@example.com',
                title: 'Main'
            }],
            credentials: [],
            creditCards: [],
            serializedInputContext: ''
        })
        // this should result in 3 identities - 2 from email and the other 1
        expect(int.getLocalIdentities().length).toBe(3)
    })
})
