<template>
  <div class="border p-4">
    <h3 class="fw-bold">영화 등록</h3>
    <span class="m-4"></span>
    <input @keypress.enter="createWannaWatchMovie" type="text" v-model="movieName">
    <button class="btn btn-primary m-3" @click="createWannaWatchMovie" value="Add">Add</button>
  </div>
</template>

<script>

export default {
  name: 'WatchListForm',
  data() {
    return {
      movieName: '',
    }
  },
  methods: {
    createWannaWatchMovie() {    
      this.$store.dispatch('createWannaWatchMovie', this.movieName)
      this.movieName = ''
    },
  }
}
</script>

<style>

</style>