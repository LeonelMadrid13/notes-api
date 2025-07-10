function handleError(res, error, context = 'Server error', statusCode = 500) {
    if (process.env.NODE_ENV === 'dev') {
        console.error(`[${context}]`, error);
    }

    return res.status(statusCode).json({
        success: false,
        error: error?.message || 'Unexpected server error',
    });
}



export {
    handleError
}
