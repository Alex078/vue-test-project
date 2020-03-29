<template>
  <div class="places" v-if="places">
    <div class="places__box">
      <span
        class="material-icons places__close"
        @click="$emit('close')"
      >close</span>
      <div
        v-for="(row, index) in places"
        :key="index"
        class="places__row"
      >
        <div
          v-for="item in row"
          :key="item._id"
          @click="selectPlace(index, item.position)"
          class="places__item"
          :class="{'places__item--inactive' : !item.isFree}"
        >{{ item.position + 1 }}</div>
      </div>
      <div
          v-if="showSuccess"
          class="places__success"
      >
        <div class="places__success-title">Thank you!</div>
        <div class="places__success-descr">Your reservation code is <b>{{ reservationCode }}</b></div>
      </div>
    </div>
  </div>
</template>

<script>
import { reservPlace, getSessions } from '@/api'

export default {
  data: () => ({
    reservationCode: '',
    showSuccess: false,
    places: null,
  }),
  props: {
    sessionId: {
      type: String,
      default: '',
    },
    movieId: {
      type: String,
      default: '',
    },
  },
  created() {
    getSessions({ movie_id: this.movieId }).then(sessions => {
      this.places = sessions.data.places;
    })
  },
  computed: {

  },
  methods: {
    selectPlace(row_id, place_position) {
      const bodyForReq = {
        row_id,
        place_position,
        movieShow_id : this.sessionId,
        isFree : false
      }

      reservPlace(bodyForReq).then(res => {
          this.reservationCode = res.data;
          this.showSuccess = true;
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.places {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &__box {
    position: relative;
    background-color: $white-color;
    padding: 40px;
    border-radius: 8px;
  }

  &__row {
    display: flex;
  }

  &__item {
    width: 60px;
    height: 60px;
    background-color: $primary-color;
    color: $white-color;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #138246;
      transition: all 0.2s
    }

    &--inactive {
      pointer-events: none;
      background-color: $primary-color-secondary;
    }
  }

  &__close {
    position: absolute;
    right: -30px;
    top: -30px;
    color: $white-color;
    font-size: 30px;
    cursor: pointer;
  }

  &__success {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 16px;
    border-radius: 8px;
    text-align: center;
    background-color: $white-color;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-title {
      font-size: 36px;
      margin-bottom: 30px;
    }

    &-descr {
      font-size: 18px;
    }
  }
}
</style>