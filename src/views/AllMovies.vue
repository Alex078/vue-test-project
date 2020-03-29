<template>
  <div class="all-movies">
    <div v-if="movies.length" class="all-movies__box">
      <div
        v-for="item in movies"
        class="all-movies__item"
        :key="item._id"
        @click="openMovie(item._id)"
      >
        <MovieCard :movie="item"></MovieCard>
      </div>
    </div>
  </div>
</template>

<script>
import { getMoviesInfo } from '@/api'
import MovieCard from '@/components/MovieCard'

export default {
  data: () => ({
    movies: [],
  }),
  components: {
    MovieCard,
  },
  created() {
    this.$store.dispatch('setLoading', true);
    getMoviesInfo().then(res => {
      this.movies = res.data;
    }).catch(err => {
      alert(err);
    }).finally(() => {
      this.$store.dispatch('setLoading', false);
    })
  },
  methods: {
    openMovie(movieId) {
      this.$router.push({
        name: 'MovieOne',
        params: {
          movieId
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.all-movies {
  &__box {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -8px;
  }

  &__item {
    flex: 0 0 calc(100% - 16px);
    margin: 0 8px 16px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid;

    @include from-xs {
      flex: 0 0 calc(50% - 16px);
    }

    @include from-md {
      flex: 0 0 calc(25% - 16px);
    }
  }
}
</style>
