const MemberModel = require('./member.model');
const HTTP_RESPONSES = require('../../template/contants/http-responses');

module.exports.addMember = async(params) => {
    const insert_response = await MemberModel.insertMember(params);
    return this.getMember(insert_response?.insertedId);
}

module.exports.updateMember = async(_id, params) => {
    const member = await MemberModel.getMember(_id);
    if (!member) {
        throw HTTP_RESPONSES.NOT_FOUND('member', _id);
    }
    const update_response = await MemberModel.updateMember(member._id, params);
    if (update_response.modifiedCount === 0) {
        throw HTTP_RESPONSES.INTERNAL_SERVER_ERROR();
    }
    return this.getMember(member._id);
}

module.exports.getMember = async(_id) => {
    if (!_id) return null;
    const member = await MemberModel.getMember(_id);
    return member;
}

module.exports.getMembers = async(filter) => {
    const members = await MemberModel.filter(filter);
    return members;
}