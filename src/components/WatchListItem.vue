<template>
  <div>
    <h3 class="p-2" @click="checkClick(item)" :class="{ 'check': item.is_completed }" v-for="(item, index) in wannaWatch" :key="index">{{ item.mN }}</h3>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'WatchListItem',
  data() {
    return {
      complete: false,
    }
  },
  methods: {
    checkClick: function(item) {
      if (item.is_completed === false) {
        item.is_completed = true
      } else {
        item.is_completed = false
      }
    }
  },
  computed: {
    // ...mapState(['wannaWatch'])
    wannaWatch() {
      return this.$store.state.wannaWatch
    },

  },
}
</script>

<style>
  .check {
    text-decoration: line-through;
    color: rgb(112, 112, 112);
    background-color: grey;
  }
</style>