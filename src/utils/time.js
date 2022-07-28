import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const format = (time, pattern = "YYYY-MM-DD HH:mm:ss") => {
  dayjs.extend(utc);
  return dayjs.utc(time).format(pattern);
};

const normalizeDate = (time) => {
  let date = new Date(time);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  return (
    [year, month, day]
      .map(function (v) {
        return v < 10 ? "0" + v : v;
      })
      .join("-") +
    " " +
    [h, m, s]
      .map(function (v) {
        return v < 10 ? "0" + v : v;
      })
      .join(":")
  );
};

const formatTimeZone = () => {
  const hour = +new Date().getHours();
  if (hour >= 0 && hour < 11) {
    return "早上";
  }
  if (hour >= 11 && hour < 14) {
    return "中午";
  }
  if (hour >= 14 && hour < 18) {
    return "下午";
  }
  if (hour >= 18 && hour < 24) {
    return "晚上";
  }
};

const publishFormTime = (time) => {
  /**
   * 规则:
   * 1分钟内 => 刚刚
   * 1小时内 => xx分钟前
   * 24小时内 => xx小时前
   * 30天内 => xx天前
   * 30天 ~ 30*12天 => xx个月前
   * > 30*12天 => xx年前
   */
  const timestamp = +new Date() - time;
  if (timestamp < 60 * 1000) {
    return "刚刚";
  }
  if (timestamp < 60 * 60 * 1000) {
    return `${Math.floor(timestamp / 1000 / 60)}分钟前`;
  }
  if (timestamp < 1000 * 60 * 60 * 24) {
    return `${Math.floor(timestamp / 1000 / 60 / 60)}小时前`;
  }
  if (timestamp < 1000 * 60 * 60 * 24 * 30) {
    return `${Math.floor(timestamp / 1000 / 60 / 60 / 24)}天前`;
  }
  if (timestamp < 1000 * 60 * 60 * 24 * 30 * 12) {
    return `${Math.floor(timestamp / 1000 / 60 / 60 / 24 / 30)}个月前`;
  }
  return `${Math.floor(timestamp / 1000 / 60 / 60 / 24 / 30 / 12)}年前`;
};

export { format, normalizeDate, formatTimeZone, publishFormTime };
