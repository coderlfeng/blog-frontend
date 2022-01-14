import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

const format = (time, pattern = "YYYY-MM-DD HH:mm:ss") => {
    dayjs.extend(utc);
    return dayjs.utc(time).format(pattern);
}

const normalizeDate = (time) => {
    let date = new Date(time)

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    return [year, month, day].map(function (v) {
        return v < 10 ? '0' + v : v
    }).join('-') + ' ' + [h, m, s].map(function (v) {
        return v < 10 ? '0' + v : v
    }).join(':')
}

export {
    format,
    normalizeDate
}