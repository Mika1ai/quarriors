import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    id: "",
    email: "",
    nickname: "",
    avatarUrl: "",
    avatarPath: "",
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
      this.avatarUrl = user.avatarUrl;
      this.avatarPath = user.avatarPath;
      this.isAuthenticated = user.isAuthenticated;
      this.isLoading = false;
    },
    clearUser() {
      this.id = "";
      this.email = "";
      this.nickname = "";
      this.avatarUrl = "";
      this.avatarPath = "";
      this.isAuthenticated = false;
      this.isLoading = false;
    },
  },
});
