import request from 'axios'
//获取未读的通知
export function getUnreadMsg(userId, existedMessageIds) {
  return request({
    url: '/msg/not_read',
    method: 'get',
    params: {
      userId,
      existedMessageIds
    }
  })
}
//获取正在送达的通知
export function getSendingMsg(userId) {
  return request({
    url: '/msg/send_out_message',
    method: 'get',
    params: {
      userId
    }
  })
}
//获取通知的未读人员
export function getUnreadList(messageId) {
  return request({
    url: '/msg/not_read_user',
    method: 'get',
    params: {
      messageId
    }
  })
}

//发布一条通知
export function sendMsg(senderId, senderName, content, title, userIds, deptId, roleId) {
  return request({
    url: '/send',
    method: 'post',
    params: {
      senderId,
      senderName,
      content,
      title,
      userIds,
      deptId,
      roleId
    }
  })
}
