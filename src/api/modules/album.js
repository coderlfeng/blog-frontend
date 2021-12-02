import service from "../index";

// 获取博主相册
const getBloggerAlbum = (data) =>
  service({
    url: "/blog/front/get-albums",
    method: "post",
    data: JSON.stringify(data),
  });

// 获取博主相册相片
const getAlbumImgs = (data) =>
  service({
    url: "/blog/front/get-album-imgs",
    method: "post",
    data: JSON.stringify(data),
  });

// 校验相册密码
const validateAlbumPwd = (data) =>
  service({
    url: "/blog/front/validate-album",
    method: "post",
    data: JSON.stringify(data),
  });

export {
    getBloggerAlbum,
    getAlbumImgs,
    validateAlbumPwd
}
