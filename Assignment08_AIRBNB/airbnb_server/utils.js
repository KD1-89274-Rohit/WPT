function createResult(error, data) {
    if (data)
        return createSuccessResult(data)
    else
        return createErrorResult(error)
}

function createErrorResult(error) {
    let result = {
        status: 'error',
        error: error
    }
    return result
}

function createSuccessResult(data) {
    let result = {
        status: 'success',
        data: data
    }
    return result
}

module.exports = { createResult, createErrorResult, createSuccessResult }