import request from 'axios'
//获取未读的通知
export function getUnreadMsg(userId, existedMessageIds) {
    return request({
        url: '/msg/not_read',
        method: 'get',
        params: { userId, existedMessageIds }
    })
}
//获取正在送达的通知
export function getSendingMsg(userId) {
    return request({
        url: '/msg/send_out_message',
        method: 'get',
        params: { userId }
    })
}
//获取通知的未读人员
export function getUnreadList(messageId) {
    return request({
        url: '/msg/not_read_user',
        method: 'get',
        params: { messageId }
    })
}
//标记已读
export function editRead(messageId, userIds) {
    var Info = new FormData();
    Info.append('messageId', messageId);
    Info.append('userIds', userIds);
    return request({
        url: '/msg/edit_state_read',
        method: 'post',
        data: Info
    })
}

//发布一条通知
export function sendMsg(senderId, content, title, userIds, deptId, roleId) {
    var Info = new FormData();
    Info.append('senderId', senderId);
    Info.append('content', content);
    Info.append('title', title);
    Info.append('userIds', userIds);
    Info.append('deptId', deptId);
    Info.append('roleId', roleId);
    return request({
        url: '/msg/process/send',
        method: 'post',
        data: Info

    })
}



//读取通知后设置消息为已读
export function editMsgState(messageId, userId) {
    return request({
        url: '/msg/edit_state_read',
        method: 'post',
        params: {
            messageId,
            userId
        }
    })

}

//发送群组邀请
export function sendNotice(senderId, groupId, type, getterIds, inviteReason) {
    var Info = new FormData();
    Info.append('senderId', senderId);
    Info.append('groupId', groupId);
    Info.append('type', type);
    Info.append('getterIds', getterIds);
    Info.append('inviteReason', inviteReason);
    return request({
        url: '/msg/notice',
        method: 'post',
        data: Info

    })
}
//获取群组邀请
export function getNotice(getterId, type, existedNoticeIds) {
    return request({
        url: '/msg/notice/getter',
        method: 'get',
        params: { getterId, type, existedNoticeIds }
    })

}

//修改群组邀请状态 拒绝或同意
export function updateInvite(id, type) {
    return request({
        url: '/msg/notice',
        method: 'put',
        params: { id, type }
    })

}