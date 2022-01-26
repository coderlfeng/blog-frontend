import { getTheme } from "@/api/modules/theme";
import isPC from "@/utils/isPC";

export default {
  state: {
    principalPcBg: "",
    descPcBg: "",
    principalMObileBg: "",
    descMobileBg: "",
  },
  getters: {
    mainBg(state) {
      if (isPC()) {
        return state.principalPcBg
          ? state.principalPcBg
          : require("@/assets/images/bg1.jpg");
      } else {
        return state.principalMObileBg
          ? state.principalMObileBg
          : require("@/assets/images/bg1.jpg");
      }
    },
    descBg(state) {
      if (isPC()) {
        return state.descPcBg
          ? state.descPcBg
          : require("@/assets/images/m-bg2.jpg");
      } else {
        return state.descMobileBg
          ? state.descMobileBg
          : require("@/assets/images/m-bg2.jpg");
      }
    },
  },
  mutations: {
    assignTheme(state, theme) {
      state.principalPcBg = theme.principalPcBg;
      state.descPcBg = theme.descPcBg;
      state.principalMObileBg = theme.principalMObileBg;
      state.descMobileBg = theme.descMobileBg;
    },
  },
  actions: {
    async initTheme({ commit }, bloggerId) {
      return new Promise(async (resolve) => {
        const res = await getTheme({ bloggerId });
        commit("assignTheme", res.data);
        resolve();
      });
    },
  },
};
