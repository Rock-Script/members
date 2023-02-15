const APITool = require('../../template/tools/api.tool');
const ApplicationCache = require('../../template/tools/application.cache.tool');
const NOTIFICATION_TYPES = require('../../template/contants/notification-type');

module.exports.sendSignupEmail = async(member) => {
    const payload = {
        type: [NOTIFICATION_TYPES.EMAIL],
        email_template_id: ApplicationCache.email_templates['sign_up'],
        data: {
            first_name: member.first_name,
            last_name: member.last_name,
            verify_email_link: 'http://localhost:3000/signup/<token>'
        },
        reciever_member_ids: [
            member._id
        ]
    }
    APITool.post(ApplicationCache.microservices.notification_send, payload);
}