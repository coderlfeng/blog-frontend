import { getTheme } from "@/api/modules/theme";

export default {
  state: {
    principalPcBg: "",
    descPcBg: "",
    principalMObileBg: "",
    descMobileBg: "",
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
      const res = await getTheme({ bloggerId });
      commit("assignTheme", res.data)
    },
  },
};
