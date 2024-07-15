const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        let status = 420;
        let message = error.errors[0].message;
        res.status(400).json({ message: message });
        const error_msg = { status, message };
        next(error_msg);
    }
}

module.exports = validate;