import service from "../index";

// 获取友链
const getConnectInfo = (params) =>
  service({
    url: "/blog/front/get-connect-info",
    method: "get",
    params,
  });

export { getConnectInfo };
