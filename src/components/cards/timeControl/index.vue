<template>
  <layout>
    <div class="time-control">
      <div class="time-date">
        <div
          class="time-solar"
          v-html="date.solarDate"
          :style="{ whiteSpace: isPC ? 'normal' : 'pre-wrap' }"
        ></div>
        <div
          class="time-lunar"
          v-html="date.lunarDate"
          :style="{ whiteSpace: isPC ? 'normal' : 'pre-wrap' }"
        ></div>
      </div>
      <div class="time-weather">
        <clock size="100px" border="1px solid rgba(0,0,0,.5)" />
        <div class="time-tips">
          <div class="time-zone">{{ formatTimeZone }}好</div>
          <div class="weather">
            {{ weatherInfo.type }} {{ weatherInfo.high }} /
            {{ weatherInfo.low }} {{ weatherInfo.fx }} {{ weatherInfo.fl }}
          </div>
          <div class="tips">{{ weatherInfo.notice }}</div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Clock from "vue-clock2";
import layout from "../layout/index.vue";
import calendar from "@/utils/calendar";
import { normalizeDate, formatTimeZone } from "@/utils/time";
import { getCity, getCit } from "@/api/modules/position";

import isPC from "@/utils/isPC";
if (isPC()) {
  import("./index-PC.less");
} else {
  import("./index-mobile.less");
}
export default {
  components: {
    layout,
    Clock,
  },
  data() {
    return {
      date: {
        solarDate: "",
        lunarDate: "",
      },
      isPC: isPC(),
      formatTimeZone: formatTimeZone(),
      // 今日天气
      weatherInfo: {},
    };
  },
  async created() {
    this.getDate();
    this.getPosition();
  },
  methods: {
    // 获取农历
    getDate() {
      let YY = new Date().getFullYear();
      let MM = new Date().getMonth() + 1;
      let DD = new Date().getDate();
      const { IDayCn, IMonthCn, cDay, cMonth, cYear, gzYear, ncWeek } =
        calendar.solar2lunar(YY, MM, DD);
      this.date.solarDate = `${cYear}年${cMonth}月${cDay}日\n${ncWeek}`;
      this.date.lunarDate = `${gzYear}年\n${IMonthCn} ${IDayCn}`;

      if (this.getDateTimer) clearInterval(this.getDateTimer);
      this.getDateTimer = setInterval(() => {
        this.date.solarDate = `${cYear}年${cMonth}月${cDay}日\n${ncWeek}`;
        if (normalizeDate(new Date()).substr(11, 8) == "00:00:00") {
          this.date.lunarDate = `${gzYear}年\n${IMonthCn} ${IDayCn}`;
        }
      }, 1000);
    },

    // 获取当前位置
    getPosition() {
      if (!navigator.geolocation) {
        alert("你的浏览器暂不支持地理位置");
        return;
      }
      navigator.geolocation.getCurrentPosition(this.handlePosition, (err) =>
        console.log(err)
      );
    },

    // 地理位置获取后查询天气
    async handlePosition(position) {
      const { latitude, longitude } = position.coords;
      const res = await getCity();
      const {
        data: {
          data: { forecast, quality, shidu, wendu, yesterday },
        },
      } = res;
      this.weatherInfo = forecast ? (forecast[0] ? forecast[0] : {}) : {};
      this.weatherInfo.low = this.weatherInfo.low.split(" ")[1];
      this.weatherInfo.high = this.weatherInfo.high.split(" ")[1];
    },
  },
};
</script>
