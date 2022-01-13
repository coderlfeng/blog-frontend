import service from "../index";

// 获取文章信息
const getArticleInfo = (params) =>
  service({
    url: "/blog/front/get-article-info",
    method: "get",
    params,
  });

// 获取文章标签列表
const getArticleTagList = (params) =>
  service({
    url: "/blog/back/get-article-tag",
    method: "get",
    params,
  });

export { getArticleInfo, getArticleTagList };
