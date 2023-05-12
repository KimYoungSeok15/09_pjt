<template>
  <div>
    <img :src=posterURL alt="">
    <!-- <p>{{ movie.title }}</p> -->
    <!-- <p>{{ movie.overview }}</p> -->
  </div>
</template>

<script>

export default {
  name: 'MovieCard',
  data() {
    return {
      posterURL: `https://image.tmdb.org/t/p/w300${this.movie.poster_path}`
    }
  },
  props: {
    movie: Object
  }
}

</script>

<style>

</style>