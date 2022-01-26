import service from "../index";

// 获取友链
const getLinks = (params) =>
  service({
    url: "/blog/front/get-friend-link",
    method: "get",
    params,
  });

export { getLinks };
