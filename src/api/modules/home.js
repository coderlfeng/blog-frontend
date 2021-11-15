import service from "../index";

// 获取博客/博主信息
const getBlogInfo = (params) =>
  service({
    url: "/blog/front/get-blog-info",
    method: "get",
    params,
  });

// 获取首页文章列表
const getArticles = (data) =>
  service({
    url: "/blog/front/get-article",
    method: "post",
    data: JSON.stringify(data),
  });

export { getBlogInfo, getArticles };
