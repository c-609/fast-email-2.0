import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import Login from "@/components/Login/Login";
import Home from "@/components/Home/Home";
import Message from "@/components/Message/Message";
import Send from "@/components/Send/Send";
import Mine from "@/components/Mine/Mine";
import ReceivedMsg from "@/common/ReceivedMsg/ReceivedMsg";
import SentMsg from "@/common/SentMsg/SentMsg";
import InviteMsg from "@/components/Home/InviteMsg/InviteMsg";
import EditMsg from "@/components/Send/EditMsg/EditMsg";
import ReceiverList from "@/components/Send/EditMsg/ReceiverList";
import SelectReceiver from "@/components/Send/EditMsg/SelectReceiver";
import ViewOrganization from "@/components/Mine/ViewOrganization/ViewOrganization";
import MyGroup from "@/components/Mine/MyGroup/MyGroup";
import ViewMyGroup from "@/components/Mine/MyGroup/ViewMyGroup/ViewMyGroup";
import ViewAllMember from "@/components/Mine/MyGroup/ViewMyGroup/ViewAllMember";
import JoinedGroup from "@/components/Mine/JoinedGroup/JoinedGroup";
import ViewJoinedGroup from "@/components/Mine/JoinedGroup/ViewJoinedGroup";
import CreateGroup from "@/components/Mine/MyGroup/CreateGroup/CreateGroup";
import ChooseMember from "@/components/Mine/MyGroup/CreateGroup/ChooseMember";
import AddChooseMember from "@/components/Mine/MyGroup/ViewMyGroup/ChooseMember";
import AddMember from "@/components/Mine/MyGroup/ViewMyGroup/AddMember";
import ReceiveMsgDetail from "../common/ReceivedMsg/ReceiveMsgDetail.vue";
import SendMsgDetail from "../common/SentMsg/SendMsgDetail.vue";
import RecycleList from "@/components/Mine/RecycleBin/RecycleList";
import Organization from "@/test/Organization";
import SysMsg from "@/components/Mine/SysMsg/SysMsg"
import { loginObj, getUserInformation } from '../api/login'
import { Notify } from 'vant';
import IDBMethods from '../api/IndexedDbMethods'
Vue.use(Notify);
Vue.use(Router);

export default new Router({
    routes: [{
            path: "/login",
            name: "Login",
            component: Login,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/",
            redirect: function(to) {
                var url = '';
                if (localStorage.getItem("useraccount") && localStorage.getItem("password")) {
                    loginObj(localStorage.getItem("useraccount"), localStorage.getItem("password")).then(res => {
                        if (res.data.code == 0) {
                            let userId = localStorage.getItem('userId')
                            getUserInformation(userId).then(res => {
                                if (res.data.code == 0) {
                                    console.log("---------")
                                    let data = res.data.data;
                                    let dbName = localStorage.getItem('userId');
                                    IDBMethods.putUserInfo(dbName, "UserInfo", data);
                                }
                            })
                            localStorage.setItem('url', "/home")
                            Notify({ type: 'success', message: '登录成功', duration: 600 });
                        } else {
                            console.log("00000000000")
                            localStorage.setItem('url', "/login")
                        }
                    }).catch(err => {
                        Notify({ type: 'danger', message: '网络连接错误', duration: 1500 });
                        localStorage.setItem('url', "/home")
                    })
                    return localStorage.getItem("url");
                } else {
                    return "/login"
                }
            }
        },
        {
            path: "/home",
            name: "Home",
            component: Home,
            meta: {
                showTabbar: true,
                index: 1
            }
        },
        {
            path: "/message",
            name: "Message",
            component: Message,
            meta: {
                showTabbar: true,
                index: 2
            }
        },
        {
            path: "/mine",
            name: "Mine",
            component: Mine,
            meta: {
                showTabbar: true,
                index: 4
            }
        },
        {
            path: "/send",
            name: "Send",
            component: Send,
            meta: {
                showTabbar: true,
                index: 3
            }
        },
        {
            path: "/received_msg",
            name: ReceivedMsg,
            component: ReceivedMsg,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/sent_msg",
            name: SentMsg,
            component: SentMsg,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/receiver_list",
            name: ReceiverList,
            component: ReceiverList,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/add_member",
            name: AddMember,
            component: AddMember,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/select_receiver",
            name: SelectReceiver,
            component: SelectReceiver,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/invite_msg",
            name: InviteMsg,
            component: InviteMsg,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/edit_msg",
            name: EditMsg,
            component: EditMsg,
            meta: {
                showTabbar: false,
                index: 7,
            }
        },
        {
            path: "/view_organization",
            name: ViewOrganization,
            component: ViewOrganization,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/my_group",
            name: MyGroup,
            component: MyGroup,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/view_my_group",
            name: ViewMyGroup,
            component: ViewMyGroup,
            meta: {
                showTabbar: false,
                index: 6
            }
        },
        {
            path: "/view_joined_group",
            name: ViewJoinedGroup,
            component: ViewJoinedGroup,
            meta: {
                showTabbar: false,
                index: 6
            }
        },
        {
            path: "/view_all_member",
            name: ViewAllMember,
            component: ViewAllMember,
            meta: {
                showTabbar: false
            }
        },
        {
            path: "/joined_group",
            name: JoinedGroup,
            component: JoinedGroup,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/create_group",
            name: CreateGroup,
            component: CreateGroup,
            meta: {
                showTabbar: false,
                index: 6
            }
        },
        {
            path: "/choose_member",
            name: ChooseMember,
            component: ChooseMember,
            meta: {
                showTabbar: false,
                index: 6
            }
        },
        {
            path: "/add_choose_member",
            name: AddChooseMember,
            component: AddChooseMember,
            meta: {
                showTabbar: false,
                index: 6
            }
        },
        {
            path: "/receive_msg_detail",
            name: ReceiveMsgDetail,
            component: ReceiveMsgDetail,
            meta: {
                showTabbar: false,
                index: 6
            }
        },
        {
            path: "/send_msg_detail",
            name: SendMsgDetail,
            component: SendMsgDetail,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/recycle_list",
            name: RecycleList,
            component: RecycleList,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/sys_msg",
            name: SysMsg,
            component: SysMsg,
            meta: {
                showTabbar: false,
                index: 5
            }
        },
        {
            path: "/test1",
            name: Organization,
            component: Organization,
            meta: {
                showTabbar: false
            }
        }
    ]
});