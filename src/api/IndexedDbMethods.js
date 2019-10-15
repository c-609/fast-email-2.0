//二次封装的方法
import IndexedDB from './IndexedDb'
export default {

    //添加用户数据（覆盖旧数据）
    putUserInfo: function(dbName, storeName, data) { //数据库名  表名  数据
        let DataBase = null;
        let userInfo = data;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "userId"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.putUserInfo(DataBase, storeName, userInfo, result => {
                    console.log(result)
                })
            }
        );
    },
    //获取用户数据
    getUserInfo: function(dbName, storeName, callback) {
        let DataBase = null;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "userId"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.getAllUserData(DataBase, storeName, result => {
                    callback(result)
                })
            },
        );
    },
    //存储新到通知
    addNewMsg: function(dbName, storeName, data) {
        let DataBase = null;
        let newMsg = data;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "id"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.addData(DataBase, storeName, newMsg, result => {
                    console.log(result)
                })
            }
        );
    },
    //获取所有置顶通知
    getAllTopMsg: function(dbName, storeName, status, callback) {
        let DataBase = null;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "id"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.getAllTopData(DataBase, storeName, status, result => {
                    callback(result)
                })
            },
        );
    },
    //获取所有通知
    getAllMsg: function(dbName, storeName, status, callback) {
        let DataBase = null;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "id"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.getAllData(DataBase, storeName, status, result => {
                    callback(result)
                })
            },
        );
    },
    //获取所有通知的ID
    getAllMsgID: function(dbName, storeName, callback) {
        let DataBase = null;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "id"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.getAllMsgId(DataBase, storeName, result => {
                    callback(result)
                })
            },
        );
    },
    //修改消息状态
    topMsg: function(dbName, storeName, key, status) {
        let DataBase = null;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "id"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.updateTop(DataBase, storeName, key, status);
            },
        );
    },
    //修改消息状态
    editMessageStatus: function(dbName, storeName, key, status) {
        let DataBase = null;
        IndexedDB.openDB(dbName, 1, DataBase, {
                name: storeName,
                key: "id"
            },
            function(db) {
                let DataBase = db;
                IndexedDB.updateStatus(DataBase, storeName, key, status);
            },
        );
    }
}