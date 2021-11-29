import service from "../index";

// 获取文章信息
const getArticleInfo = (params) =>
  service({
    url: "/blog/front/get-article-info",
    method: "get",
    params,
  });

export {
    getArticleInfo
}