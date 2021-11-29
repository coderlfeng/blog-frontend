import dayjs from "dayjs"
import utc from 'dayjs/plugin/utc'

const format = (time, pattern = "YYYY-MM-DD HH:mm:ss") => {
    dayjs.extend(utc);
    return dayjs.utc(time).format(pattern);
}

export {
    format
}