<template>
  <div>
    <h1>랜덤 영화 조회</h1>
    <button class="btn btn-primary m-3">pick</button>
    <br>
    <img :src="randomMoviesPoster">
    <h3 class="fw-bold mt-3">{{ randomMoviesTitle }}</h3>

  </div>
</template>

<script>

import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'RandomView',
  components: {
  },
  data() {
    return {
      inDex: 0,
      randomMoviesPoster :null,
      randomMoviesTitle :null,
    }
  },
  methods: {
  },
  computed: {
    ...mapState(['topRatedMovies']),

  },
  created() {
    const TMDBURL = 'https://api.themoviedb.org/3/movie/top_rated?'
    const params = {
      api_key: process.env.VUE_APP_Movie_API,
      language: 'ko-KR',
      page: '1',
    }
    axios({
        methods: 'get',
        url: TMDBURL,
        params: params,
    })
    .then((response) => {
      console.log(response)
      this.movieAllData = response.data.results
      this.$store.dispatch('topRatedMovies', this.movieAllData)
      const pickIndex = Math.floor(Math.random() * this.$store.state.topRatedMovies.length)
      console.log(pickIndex)
      this.inDex = pickIndex
      this.randomMoviesTitle = this.$store.state.topRatedMovies[this.inDex].title
      this.randomMoviesPoster = `https://image.tmdb.org/t/p/w300${this.$store.state.topRatedMovies[this.inDex].poster_path}`

    })
  }
}

</script>

<style>

</style>