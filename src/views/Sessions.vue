<template>
  <div class="sessions">
    <div class="sessions__box">
      <SessionCard
        v-for="item in sessions"
        :key="item._id"
        :session="item"
        class="sessions__item"
      ></SessionCard>
    </div>
  </div>
</template>

<script>
import { getSessions } from '@/api'
import SessionCard from '@/components/SessionCard'

export default {
  data: () => ({
    sessions: [],
  }),
  components: {
    SessionCard,
  },
  created() {
    this.$store.dispatch('setLoading', true);
    getSessions().then(sessions => {
      this.sessions = sessions.data;
    }).catch(err => alert(err)).finally(() => {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.sessions {
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
      flex: 0 0 calc(33.33% - 16px);
    }
    @include from-lg {
      flex: 0 0 calc(25% - 16px);
    }
  }

  &__date {
    font-weight: bold;
  }
}
</style>
