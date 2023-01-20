const Mongo = require('../../template/tools/mongo.tool');
const Validation = require('../../template/tools/db-validation.tool');
const MemberSchema = require('./member.schema');
const COLLECTION_NAME = "members";

module.exports.insertMember = async(payload) => {
    payload._id = Mongo.id();
    payload.is_active = true;
    payload.created_at = new Date();
    payload.modified_at = new Date();

    payload = Validation.validate(MemberSchema.INSERT_MEMBER, payload);
    const data = await Mongo.insertOne(COLLECTION_NAME, payload);
    return data;
}

module.exports.updateMember = async(user_id, payload) => {
    payload._id = Mongo.id();
    payload.modified_at = new Date();

    payload = Validation.validate(MemberSchema.UPDATE_MEMBER, payload);
    const data = await Mongo.updateOne(COLLECTION_NAME, { _id: Mongo.id(user_id)}, { $set: payload});
    return data;
}

module.exports.getMember = async(_id) => {
    const data = await Mongo.findOne(COLLECTION_NAME, { _id: Mongo.id(_id)}, { password: 0 });
    return data;
}

module.exports.filter = async(filter) => {
    const pipeline = [];
    const data = await Mongo.aggregate(COLLECTION_NAME, pipeline);
    return data;
}
