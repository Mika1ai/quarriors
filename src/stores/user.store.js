import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    id: "",
    email: "",
    nickname: "",
  }),
  actions: {
    setUser(user) {
      this.id = user.id;
      this.email = user.email;
      this.nickname = user.nickname;
    },
    clearUser() {
      this.id = "";
      this.email = "";
      this.nickname = "";
    },
  },
});
