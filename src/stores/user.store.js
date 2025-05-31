import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    id: "",
    email: "",
    nickname: "",
    isAuthenticated: false,
    isLoading: false,
  }),
  actions: {
    setUserLoading(isLoading) {
      this.isLoading = isLoading;
    },
    setUser(user) {
      this.id = user.id;
      this.email = user.email;
      this.nickname = user.nickname;
      this.isAuthenticated = user.isAuthenticated;
      this.isLoading = false;
    },
    clearUser() {
      this.id = "";
      this.email = "";
      this.nickname = "";
      this.isAuthenticated = false;
      this.isLoading = false;
    },
  },
});
