import { defineStore } from "pinia";

export const useRelationshipsStore = defineStore("relationshipsStore", {
  state: () => ({
    channel: null,
    friends: [],
    receivedRequests: [],
    sentRequests: [],
  }),
  actions: {
    setChannel(channel) {
      this.channel = channel;
    },
    setRelationships(relationships) {
      this.friends = relationships.friends;
      this.receivedRequests = relationships.receivedRequests;
      this.sentRequests = relationships.sentRequests;
    },
    clearRelationships() {
      this.friends = [];
      this.receivedRequests = [];
      this.sentRequests = [];
    },
  },
});
