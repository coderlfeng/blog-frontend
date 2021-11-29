import service from "../index";

// 获取博主相册
const getBloggerAlbum = (params) =>
  service({
    url: "/blog/front/get-albums",
    method: "get",
    params,
  });

export {
    getBloggerAlbum
}
