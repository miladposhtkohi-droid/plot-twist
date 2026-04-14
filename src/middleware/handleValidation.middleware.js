import { validationResult } from "express-validator";

export const handleValidation = (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
     const error = new Error("Request body is empty");
        error.status = 400;
        return next(error);
    }


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formatedErrors = {}
        errors.array().forEach(error => {
            const field = error.path;
            formatedErrors[field] = error.msg;
        });
        return res.status(400).json({ errors: formatedErrors });    
    }
    next();
}