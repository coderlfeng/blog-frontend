class Userid {
  getUser() {
    const userid = this.getUserId();
    return userid === 1 ? "lifeng" : userid === 2 ? "liuhuan" : "dengyu"
  }
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

module.exports = new Userid();
