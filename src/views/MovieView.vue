<template>
  <div class="container">
    <h1 class="fw-bold">전체 영화 조회</h1>
    <div class=" d-flex row row-col-3">
      <div  class="card col-3" v-for="(movie, index) in topRatedMovies" :key="index"> 
        <movie-card :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard.vue'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'MovieView',
  components: {
    MovieCard
  },
  data() {
    return {
      movieAllData: '',
    }
  },
  computed: {
    ...mapState(['topRatedMovies'])
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
      // tM() {
      //   return this.$store.state.topRatedMovies
      // },
      
      // ...mapState({
      //   msg: state => state.topRatedMovies
      // }),
    })
  }
}
</script>

<style>

</style>