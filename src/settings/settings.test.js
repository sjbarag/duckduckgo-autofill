const validators = require('../schema/validators.cjs')

const validator = validators['#/definitions/GetAutofillDataResponse']
const r = validator({
    type: 'GetAutofillDataResponse',
    success: {
        username: 'shane',
        password: 'pw'
    }
})

console.log(r)
// console.log(validator.errors)
