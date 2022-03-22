// 侧边栏组件对应id
const SCEnum = {
    1: "articleType", // 文章分类
    2: "articleHot", // 精选文章
    3: "links", // 友链
    4: "connect", // 联系方式
    5: "timeControl", // 时间控件
    6: "message", // 留言
    7: "introduce"
}


export default (id) => {
    return SCEnum[id]
}
