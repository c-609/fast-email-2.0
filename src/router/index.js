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
import ViewOrganization from "@/components/Mine/ViewOrganization/ViewOrganization";
import MyGroup from "@/components/Mine/MyGroup/MyGroup";
import ViewMyGroup from "@/components/Mine/MyGroup/ViewMyGroup/ViewMyGroup";
import ViewAllMember from "@/components/Mine/MyGroup/ViewMyGroup/ViewAllMember";
import JoinedGroup from "@/components/Mine/JoinedGroup/JoinedGroup";
import ViewJoinedGroup from "@/components/Mine/JoinedGroup/ViewJoinedGroup";
import CreateGroup from "@/components/Mine/MyGroup/CreateGroup/CreateGroup";
import ReceiveMsgDetail from "../common/ReceivedMsg/ReceiveMsgDetail.vue";
import SendMsgDetail from "../common/SentMsg/SendMsgDetail.vue";
import RecycleList from "@/components/Mine/RecycleBin/RecycleList";
import Organization from "@/test/Organization";
import Dexie from "@/test/Dexie"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/dexie",
      name: "Dexie",
      component: Dexie,
      meta: {
        showTabbar: false
      }
    },
    {
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
        if (localStorage.getItem("login")) {
          return "/home";
        } else {
          return "/home";
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
        index:5
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
        showTabbar: false
      }
    },
    {
      path: "/view_organization",
      name: ViewOrganization,
      component: ViewOrganization,
      meta: {
        showTabbar: false,
        index:5
      }
    },
    {
      path: "/my_group",
      name: MyGroup,
      component: MyGroup,
      meta: {
        showTabbar: false,
        index:5
      }
    },
    {
      path: "/view_my_group",
      name: ViewMyGroup,
      component: ViewMyGroup,
      meta: {
        showTabbar: false,
        index:6
      }
    },
    {
      path: "/view_joined_group",
      name: ViewJoinedGroup,
      component: ViewJoinedGroup,
      meta: {
        showTabbar: false,
        index:6
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
        index:5
      }
    },
    {
      path: "/create_group",
      name: CreateGroup,
      component: CreateGroup,
      meta: {
        showTabbar: false,
        index:6
      }
    },
    ,
    {
      path: "/receive_msg_detail",
      name: ReceiveMsgDetail,
      component: ReceiveMsgDetail,
      meta: {
        showTabbar: false,
        index:6
      }
    },
    {
      path: "/send_msg_detail",
      name: SendMsgDetail,
      component: SendMsgDetail,
      meta: {
        showTabbar: false,
        index:5
      }
    },
    {
      path: "/recycle_list",
      name: RecycleList,
      component: RecycleList,
      meta: {
        showTabbar: false,
        index:5
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
