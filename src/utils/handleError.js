function handleError(res, error, context = 'Server error') {
    if (process.env.NODE_ENV === 'dev') {
        console.error(`[${context}]`, error);
    }
    return res.status(500).json({ error: error?.message || 'Unexpected server error' });
}

export {
    handleError
}
