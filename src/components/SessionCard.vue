<template>
  <div>
    <div class="session-card">
      <div class="session-card__info">
        <div class="session-card__date">
          <div class="session-card__date-item">{{ getDateOfShow }}</div>
          <div class="session-card__date-item">{{ getTimeOfShow }}</div>
        </div>
      </div>
      <MovieCard
          v-if="movie"
          :movie="movie"
          class="session-card__movie"
          @click.native="openMovie"
      />
      <div class="session-card__footer">
        <MyButton
          text="Book ticket"
          @click="showPlaces = true"
        />
        <div class="session-card__price">{{ getPrice }}</div>
      </div>
    </div>
    <PlaceChoosePopup
      v-if="showPlaces"
      :places="session.places"
      :sessionId="session._id"
      :movieId="movie._id"
      class="session-card__places"
      @close="showPlaces = false"
    />
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard'
import MyButton from '@/components/MyButton'
import PlaceChoosePopup from '@/components/PlaceChoosePopup'
import { getMoviesInfo } from '@/api'

export default {
  props: {
    session: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    movie: null,
    showPlaces: false
  }),
  components: {
    MovieCard,
    MyButton,
    PlaceChoosePopup,
  },
  computed: {
    getDateOfShow() {
      return `Day: ${new Date(this.session.startTime).toLocaleDateString()}`
    },
    getTimeOfShow() {
      return `Time: ${new Date(this.session.startTime).toLocaleTimeString()}`
    },
    getPrice() {
      return `Price: $${this.session.ticketPrice}`
    }
  },
  created() {
    getMoviesInfo({
      movie_id: this.session.movie_id
    }).then(res => {
      this.movie = res.data;
    })
  },
  methods: {
    openMovie() {
      this.$router.push({
        name: 'MovieOne',
        params: {
          movieId: this.movie._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.session-card {
  overflow: hidden;

  &__info {
    padding: 16px;
  }

  &__price {
    font-weight: bold;

    @include from-xs {
      @include to-sm {
        margin-bottom: 8px;
      }
    }
  }

  &__footer {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @include from-xs {
      @include to-sm {
        flex-direction: column-reverse;
        align-items: flex-start;
      }
    }
  }
}
</style>