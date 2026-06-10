const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode
    const message = err.message

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors
    })
}

export {errorHandler}