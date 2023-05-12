<template>
  <div>
    <input @keypress.enter="pleaseRecommendMovie" type="text" placeholder="지역을 입력하세요" v-model="local"><button @click="pleaseRecommendMovie">클릭</button>
    <br>
    <h2>{{ weatherIntro() }}</h2>
    <div v-if="weather">
        <button class="btn btn-primary m-3">pick</button>
        <br>
        <img :src="weatherIconURL" alt="">
        <h2>{{ localView }}</h2>
        <h2>{{ ment }}</h2>
        <img :src="weatherRecommendMoviesImageURL">
        <br>
        <h3 class="mt-3 fw-bold">{{ weatherRecommendMoviesTitle }}</h3>
        <br>
    </div>
    <img v-else src="@/assets/loading.png">
    </div>
</template>

<script>

import axios from 'axios'
// import { mapState } from 'vuex'

export default {
  name: 'WeatherRandomView',
  components: {
  },
  data() {
    return {
      weather : '',
      weatherIcon: '',
      weatherIconURL : '',   
      weatherRecommendMovieGenre: [],
      weatherRecommendMovies: [],
      weatherRecommendMoviesTitle: '',
      weatherRecommendMoviesImageURL: '',
      local: '',
      locallat: 37.5667,
      locallon: 126.9783,
      localView: '서울 지역의 날씨에 따른 추천 영화입니다.',
      ment: ''

    }
  },
  methods: {
    weatherIntro() {
      if ( this.weather == 'Clear') {
        this.weatherRecommendMovieGenre = [22, 10749]
        this.ment = `맑은 날에는 이런 영화 어때요?`
      } else if ( this.weather == 'Clouds' ) {
        this.weatherRecommendMovieGenre = [80, 9648]
        this.ment = `흐린 날에는 이런 영화 어때요?`
      } else if ( this.weather == 'Rain' ) {
        this.weatherRecommendMovieGenre = [27, 53]
        this.ment = `비오는 날에는 이런 영화 어때요?`
      } else {
        this.ment = ''
      }
    },
    pleaseRecommendMovie() {
      if (this.local == '서울') {
        this.locallat = '37.5667'
        this.locallon = '126.9783'
        this.localView = this.local+' 지역의 날씨에 따른 추천영화입니다.'
      } else if (this.local == '광주') {
        this.locallat = '35'
        this.locallon = '126.6'
        this.localView = this.local+' 지역의 날씨에 따른 추천영화입니다.'
      } else if (this.local == '부산') {
        this.locallat = '35'
        this.locallon = '129'
        this.localView = this.local+' 지역의 날씨에 따른 추천영화입니다.'
      } else {
        this.locallat = '0'
        this.locallon = '0'
        this.localView = this.local+' 지역은 지원하지 않습니다'
        this.local = ''
      }
      const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'
      const params = {
        appid: process.env.VUE_APP_Weather_API,
        lat: this.locallat, // 북위
        lon: this.locallon, // 동경
      }
      axios({
          methods: 'get',
          url: weatherURL,
          params: params,
      })
      .then((response) => {
        console.log(response.data.weather[0])
        this.weather = response.data.weather[0].main
        this.weatherIcon = response.data.weather[0].icon
        this.weatherIconURL= 'https://openweathermap.org/img/wn/'+response.data.weather[0].icon+'@2x.png'
        const TMDBURL = 'https://api.themoviedb.org/3/movie/top_rated?'
        const params2 = {
          api_key: process.env.VUE_APP_Movie_API,
          language: 'ko-KR',
          page: '1',
        }
        axios({
            methods: 'get',
            url: TMDBURL,
            params: params2,
        })
        .then((response) => {
          console.log(response)
          this.movieAllData = response.data.results
          this.$store.dispatch('topRatedMovies', this.movieAllData)
          // this.weatherRecommendMovie[0].genre_ids)
          for (let i of this.$store.state.topRatedMovies) {
            //console.log(i.genre_ids)
            for (let j of i.genre_ids) {
              // console.log(j)
              if ( this.weatherRecommendMovieGenre.includes(j) ) {
                // console.log(i)
                this.weatherRecommendMovies.push(i)
              }
            }
          }
          console.log(this.weatherRecommendMovies)
          const pickIndex = Math.floor(Math.random() * this.weatherRecommendMovies.length)
          const pickMovie = this.weatherRecommendMovies[pickIndex].title
          const weatherURL = this.weatherRecommendMovies[pickIndex].poster_path
          this.weatherRecommendMoviesTitle = pickMovie 
          this.weatherRecommendMoviesImageURL = `https://image.tmdb.org/t/p/w300${weatherURL}`
        })
      })
      this.local = ''
    }
  },
  computed: {
    //  ...mapState(['topRatedMovies'])

  },
  created() {
    const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?'
    const params = {
      appid: process.env.VUE_APP_Weather_API,
      lat: '37.5667', // 북위
      lon: '126.9783', // 동경
    }
    axios({
        methods: 'get',
        url: weatherURL,
        params: params,
    })
    .then((response) => {
      console.log(response.data.weather[0])
      this.weather = response.data.weather[0].main
      this.weatherIcon = response.data.weather[0].icon
      this.weatherIconURL= 'https://openweathermap.org/img/wn/'+response.data.weather[0].icon+'@2x.png'
      const TMDBURL = 'https://api.themoviedb.org/3/movie/top_rated?'
      const params2 = {
        api_key: process.env.VUE_APP_Movie_API,
        language: 'ko-KR',
        page: '1',
      }
      axios({
          methods: 'get',
          url: TMDBURL,
          params: params2,
      })
      .then((response) => {
        console.log(response)
        this.movieAllData = response.data.results
        this.$store.dispatch('topRatedMovies', this.movieAllData)
        // this.weatherRecommendMovie[0].genre_ids)
        for (let i of this.$store.state.topRatedMovies) {
          //console.log(i.genre_ids)
          for (let j of i.genre_ids) {
            // console.log(j)
            if ( this.weatherRecommendMovieGenre.includes(j) ) {
              // console.log(i)
              this.weatherRecommendMovies.push(i)
            }
          }
        }
        console.log(this.weatherRecommendMovies)
        const pickIndex = Math.floor(Math.random() * this.weatherRecommendMovies.length)
        const pickMovie = this.weatherRecommendMovies[pickIndex].title
        const weatherURL = this.weatherRecommendMovies[pickIndex].poster_path
        this.weatherRecommendMoviesTitle = pickMovie 
        this.weatherRecommendMoviesImageURL = `https://image.tmdb.org/t/p/w300${weatherURL}`
      })
    })
  }
}


</script>

<style>

</style>