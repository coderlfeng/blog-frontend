import service from "../index";

// 获取博客/博主信息
const getBlogInfo = (params) =>
  service({
    url: "/blog/front/get-blog-info",
    method: "get",
    params,
  });

export { getBlogInfo };
