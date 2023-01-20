const Joi = require('joi');
const { ObjectId, phoneNumber } = require('../../template/tools/db-validation.tool');

module.exports.GET_MEMBER = {
    member_id: ObjectId()
}

module.exports.POST_MEMBER = {
    institute_id: ObjectId().required(),
    first_name: Joi.string().required().min(3).max(100),
    last_name: Joi.string().required().min(3).max(100),
    address: Joi.string().required().min(3).max(100),
    phone: phoneNumber().required(),
    email: Joi.string().email().required()
}

module.exports.INSERT_MEMBER = {
    ...this.POST_MEMBER,
    _id: ObjectId(),
    created_at: Joi.date().required(),
    modified_at: Joi.date().required(),
    is_active: Joi.boolean().default(true).optional()
}

module.exports.PATCH_MEMBER = {
    first_name: Joi.string().optional().min(3).max(100),
    last_name: Joi.string().optional().min(3).max(100),
    address: Joi.string().optional().min(3).max(100),
    phone: phoneNumber().optional()
}

module.exports.UPDATE_MEMBER = {
    ...this.PATCH_MEMBER,
    modified_at: Joi.date().required()
}
