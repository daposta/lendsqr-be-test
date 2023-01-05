

const Joi = require('joi')


const validateNewAccount = (req, res, next) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        pin: Joi.string().min(4).required(),
        confirmPin: Joi.string().valid(Joi.ref('pin')).required(),
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        errors = error.details.map(x => x.message) //.join(', ')
        return res.status(400).json({success: false, data: errors});
    } else {
        req.body = value;
        next();
    }
}


const validateLogin = (req, res, next) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        pin: Joi.string().min(4).required()
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        errors = error.details.map(x => x.message) //.join(', ')
        return res.status(400).json({success: false, data: errors});
    } else {
        req.body = value;
        next();
    }
}

const validateDeposit = (req, res, next) => {

    const schema = Joi.object({
        amount: Joi.number().required(),
      
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        errors = error.details.map(x => x.message) //.join(', ')
        return res.status(400).json({success: false, data: errors});
    } else {
        req.body = value;
        next();
    }
}

const validateTransfer = (req, res, next) => {

    const schema = Joi.object({
        destinationAccountUsername: Joi.string().required(),
        amount: Joi.number().required(),
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        errors = error.details.map(x => x.message) //.join(', ')
        return res.status(400).json({success: false, data: errors});
    } else {
        req.body = value;
        next();
    }
}

const validateWithdrawal = (req, res, next) => {

    const schema = Joi.object({
        amount: Joi.number().required(),
    });

    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);

    if (error) {
        errors = error.details.map(x => x.message) //.join(', ')
        return res.status(400).json({success: false, data: errors});
    } else {
        req.body = value;
        next();
    }
}








module.exports = {
    validateNewAccount, validateLogin, validateDeposit, validateWithdrawal, validateTransfer
}