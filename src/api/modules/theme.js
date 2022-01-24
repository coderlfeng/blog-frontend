import service from "../index";

// 获取主题背景
const getTheme = (params) =>
  service({
    url: "/blog/front/get-theme",
    method: "get",
    params,
  });

export { getTheme };
