<template>
  <div
    class="movie-card"
    :class="{'movie-card--inline' : inline}"
  >
    <img
      :src="movie.pictureLink"
      alt="not-found.png"
      class="movie-card__img"
      :class="{'movie-card__img--inline' : inline}"
    >
    <div class="movie-card__content">
      <p class="movie-card__title">{{ movie.name }}</p>
      <p
        class="movie-card__descr"
        :class="{'movie-card__descr--all' : inline}"
      >{{ movie.description }}</p>
      <div class="movie-card__date">
        <span class="movie-card__date-title">Date of release:</span>
        <span class="movie-card__date-val"></span>
        {{ getDate }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: {}
    },
    inline: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    getDate() {
      return new Date(this.movie.dateOfRelease).toLocaleDateString()
    }
  }
}
</script>

<style lang="scss" scoped>
.movie-card {
  width: 100%;
  height: 490px;
  cursor: pointer;

  &--inline {
    display: flex;
  }

  &__img {
    display: block;
    height: 250px;
    width: 100%;
    object-fit: cover;
    background-color: #eeeeee;

    &--inline {
      max-width: 300px;
      margin-top: 16px;
    }
  }

  &__content {
    padding: 16px;
  }

  &__title {
    text-transform: uppercase;
    font-weight: bold;
    height: 36px;
    overflow: hidden;
  }

  &__descr {
    max-height: 95px;
    overflow: hidden;

    &--all {
      max-height: 100%;
    }
  }

  &__date {
    margin-top: 20px;

    &-title {
      font-style: italic;
    }
  }
}
</style>