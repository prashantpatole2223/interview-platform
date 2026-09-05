export const signupValidate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            errors: error.issues.map(err => ({
                field: err.path[0],
                message: err.message,
            })),
        });
    }
};

export const loginValidate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: err.errors[0].message
        });
    }
}