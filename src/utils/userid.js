class Userid {
  // 获取userid
  getUserId = () => {
    const userid = sessionStorage.getItem("userid");
    return JSON.parse(userid);
  };
  // 存userid
  setUserId = (id) => {
    sessionStorage.setItem("userid", id);
  };
  // 根据路由设置userid
  setByPath(path) {
    const user = path.split("/")[1];
    switch (user) {
      case "liuhuan":
        this.setUserId(2);
        break;
      case "dengyu":
        this.setUserId(3);
        break;
      default:
        this.setUserId(1);
        break;
    }
  }
}

// const setUserId = (id) => {
//     sessionStorage.setItem('userid', id)
// }

// const getUserId = () => {
//     const userid = sessionStorage.getItem('userid')
//     return JSON.parse(userid)
// }

// module.exports = {
//     setUserId,
//     getUserId
// }

module.exports = new Userid()
