const MemberController = require('./member.controller');
const MemberSchema = require('./member.schema');
const ROUTE_METHODS = require('../../template/contants/route-methods.const');

const path = 'members';
const routes = [
    {
        path: `/${path}`,
        method: ROUTE_METHODS.POST,
        validation: {
            body: MemberSchema.POST_MEMBER
        },
        handler: MemberController.postMember
    },
    {
        path: `/${path}/:member_id`,
        method: ROUTE_METHODS.PATCH,
        validation: {
            body: MemberSchema.RESET_USER_PASSWORD
        },
        handler: MemberController.patchMember
    },
    {
        path: `/${path}/:member_id`,
        method: ROUTE_METHODS.GET,
        validation: {
            params: MemberSchema.GET_MEMBER
        },
        handler: MemberController.getMember
    }
]

module.exports = routes;