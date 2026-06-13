// const errorHandler = (err, req, res, next) => {
//     const statusCode = err.statusCode
//     const message = err.message

//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//         errors: err.errors
//     })
// }

// export {errorHandler}

const errorHandler = (err, req, res, next) => {
    // Force a fallback integer status code if err.statusCode is missing
    const statusCode = err.statusCode || 500;
    const message = err.message || "An unexpected server error occurred";

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
};

export { errorHandler };