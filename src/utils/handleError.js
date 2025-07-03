function handleError(res, error, context = 'Server error') {
    console.error(`[${context}]`, error);
    return res.status(500).json({ error: error?.message || 'Unexpected server error' });
}

module.exports = {
    handleError
};
