const MemberService = require('./member.service');

module.exports.postMember = async (req, res, next) => {
    const data = await MemberService.addMember(req.body);
    return {
        status: 201,
        data,
        message: 'Successfully created member'
    }
}

module.exports.getMember = async (req, res, next) => {
    const data = await MemberService.getMember(req.params.member_id);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved member'
    }
}

module.exports.getMembers = async (req, res, next) => {
    const data = await MemberService.getMembers(req.query);
    return {
        status: 200,
        data,
        message: 'Successfully retrieved members'
    }
}


module.exports.patchMember = async (req, res, next) => {
    const data = await MemberService.updateMember(req.params.member_id, req.body);
    return {
        status: 200,
        data,
        message: 'Successfully created member'
    }
}