const error_middlerware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({ message });
};

module.exports = error_middlerware;