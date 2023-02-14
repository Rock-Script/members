const MemberModel = require('./member.model');
const MemberEmailNotification = require('./member.email.notification');
const HTTP_RESPONSES = require('../../template/contants/http-responses');
const Reference = require('../../template/tools/reference-tool');

const verifyParams = async (params) => {
    if (params.institute_id) {
        params.institute = await Reference.getInstitute(params.institute_id);
        if (!params.institute) throw HTTP_RESPONSES.NOT_FOUND('institute', params.institute_id);
    }

    if (params.course_ids) {
        params.course_ids = params.course_ids.split(",")
        params.courses = await Reference.getCourses(params.course_ids, params.institute_id);
        if (params.course_ids.length !== params.courses.length) throw HTTP_RESPONSES.NOT_FOUND('courses', params.course_ids);
    }

    return params;
}

module.exports.addMember = async(params) => {
    params = await verifyParams(params);
    const insert_response = await MemberModel.insertMember(params);

    // check if user created if not, create user
    
    // send invitation email
    const member = await this.getMember(insert_response?.insertedId);
    await MemberEmailNotification.sendSignupEmail(member);
    return member;
}

module.exports.updateMember = async(_id, params) => {
    const member = await MemberModel.getMember(_id);
    if (!member) {
        throw HTTP_RESPONSES.NOT_FOUND('member', _id);
    }
    params = await verifyParams(params);
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