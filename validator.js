// method 1 on how to create and export a function (seems easier and more intuitive than method 2)

function isInvalidEmail(userObject) {
     return !userObject.email.includes("@")
}

// module.exports = isInvalidEmail

// method 2 on how to create and export a function, but this is harder to understand and is not as intuitive 

// exports.isInvalidEmail = (userObject) => {
//     return !userObject.email.includes("@")
// }

function isEmptyPayload(userObject) {
    return Object.keys(userObject).length === 0
}

// module.exports = isEmptyPayload

// or... can combine several exports together

module.exports = {
    isInvalidEmail,
    isEmptyPayload
}
