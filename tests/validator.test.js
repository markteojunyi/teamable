const {isInvalidEmail, isEmptyPayload} = require('../validator')

test('valid email', function(){
    const testPayload = {
        name: "test name",
        email: "test.email@email.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(false)
})

test('invalid email', function(){
    const testPayload = {
        name: "test name",
        email: "test.emailemail.com",
        interests: "testing"
    }
    const result = isInvalidEmail(testPayload)
    expect(result).toBe(true)
})

test('non-empty payload', function(){
    const testPayload = {
        name: "test name",
        email: "test.email@email.com",
        interests: "testing"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})

