<template :key="$route.params.movieId">
  <div class="movie-one">
    <MovieCard v-if="movie" :movie="movie" inline></MovieCard>
  </div>
</template>

<script>
import { getMoviesInfo } from '@/api'
import MovieCard from '@/components/MovieCard'

export default {
  data: () => ({
    movie: null,
    sessions: null
  }),
  components: {
    MovieCard,
  },
  created() {
    this.getDataAboutMovie();
  },
  watch: {
    '$route.params.movieId': function () {
      this.getDataAboutMovie();
    }
  },
  methods: {
    async getDataAboutMovie() {
      this.$store.dispatch('setLoading', true);
      this.movie = await getMoviesInfo({
        movie_id: this.$route.params.movieId
      }).then(r => r.data).catch(err => alert(err)).finally(() => {
        this.$store.dispatch('setLoading', false);
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.all-movies {
  &__box {
    display: flex;
    flex-wrap: wrap;
  }

  &__item {
    flex: 0 0 calc(25% - 16px);
    margin: 0 8px 16px
  }
}
</style>
