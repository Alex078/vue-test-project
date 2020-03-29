<template>
  <main class="main">
    <header class="main__header">
      <div class="main__header-box">
        <nav class="main__nav">
          <router-link class="main__nav-item" to="/" exact>All movies</router-link>
          <router-link class="main__nav-item" to="/sessions" exact>Sessions</router-link>
        </nav>
        <div class="main__search">
          <span
            class="material-icons main__search-icon"
            @click="toggleSearchField"
          >{{ getIcon }}</span>
          <div
            v-if="showSearch"
            class="main__search-box"
          >
            <input
              v-model="searchStr"
              type="text"
              class="main__search-input"
              @keyup="getDataBySearch"
            >
            <div class="main__search-result">
              <ul
                v-if="searchResult.length && searchStr.length"
                class="main__search-result-list"
              >
                <li
                  v-for="item in searchResult"
                  :key="item._id"
                  @click="openMovie(item._id)"
                  class="main__search-result-item"
                >
                  <span class="main__search-result-title">
                    {{ item.name.toUpperCase() }}
                  </span>
                  <span class="main__search-result-genre">
                    <template v-for="i in getGenres(item.genre_id)">
                      {{ i }},
                    </template>
                  </span>
                  <span class="main__search-result-date">
                    {{ getDateOfMovie(item.dateOfRelease) }}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="main__content">
      <router-view/>
    </div>
  </main>
</template>

<script>
import { findMovieByParams } from '@/api'
import { debounce } from 'lodash'

export default {
  data: () => ({
    showSearch: false,
    searchStr: '',
    searchResult: [],
    genresArr: [ 'ACTION', 'ADVENTURES', 'COMEDY', 'DRAMA', 'HORROR', 'WESTERNS']
  }),
  computed: {
    getIcon() {
      return this.showSearch ? 'close' : 'search';
    }
  },
  methods: {
    toggleSearchField() {
      this.showSearch = !this.showSearch
    },
    getDataBySearch: debounce(function() {
      this.searchStr.length && findMovieByParams({
        name: this.searchStr
      }).then(resp => {
        if(resp.status === 200) {
          this.searchResult = resp.data;
        }
      })
    }, 500),
    getGenres(ids) {
      return ids.map((el, index) => this.genresArr[index]);
    },
    getDateOfMovie(date) {
      return `Date: ${new Date(date).toLocaleDateString()}`
    },
    openMovie(movieId) {
      this.showSearch = false;
      this.searchStr = '';

      if (movieId !== this.$route.params.movieId) {
        this.$router.push({
          name: 'MovieOne',
          params: {
            movieId
          }
        })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  padding-top: 100px;

  &__header {
    height: 60px;
    margin-bottom: 32px;
    background-color: #0B8ED5;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 10;

    &-box {
      max-width: 1300px;
      margin: 0 auto;
      padding: 0 16px;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
  }

  &__nav {
    &-item {
      padding: 8px 16px;
      text-decoration-line: none;
      color: $white-color;
      font-size: 18px;

      &:first-child {
        padding-left: 0;
      }

      &.active {
        font-weight: bold;
      }
    }
  }

  &__search {
    &-icon {
      cursor: pointer;
      color: $white-color;
      font-size: 28px;
      vertical-align: bottom;
    }

    &-box {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      padding: 8px 16px;
      z-index: 10;
      background-color: $white-color;
      box-shadow: 0 10px 15px -15px rgba($black-color,0.5);
      display: flex;
    }

    &-input {
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAMAAABhEH5lAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAPNQTFRFAAAAAAAAAAAAAAAAMzMzHDk5MzMzLS08Kzk5MzMzMDA4MzM6MzM5MjI4MTc3LzU1LTM5MjI3LzQ5LjM4MDU6LzQ5LjM4LzM3MTU5MjY2MjY5MjU5MjY5MjU3MTU4MTY4MTU4MjQ5MjQ4MjY4MjY4MTU5MTU4MDY4MTY4MTY4MTY4MjU4MTY4MjU4MTY5MjU4MTU4MTU4MTU4MjY5MjY4MTU4MjY5MjY4MjU4MjU5MTU5MjU5MTY4MTY5MTY4MjU5MTY4MTY5MjU4MTY4MjU4MjY4MjY5MTY5MjU4MjY4MjY5MTU5MTU4MjY5MjY5MTU4MjY56QTSnQAAAFB0Uk5TAAECAwUJDxESFCAjKCkqKy0uMTI1Njc8P0JHSExhaW1ucHp/gIaIiZKTl56lqKuusra6vb7AwsjN09Tc3uDj5ujp7O3w8fLz9fb3+Pn7/P7S4ML+AAAAsElEQVQYGQXBiSICARQAwFEIya2DhOS+r9yJqK0t+/7/a8xArn7V+W2flgBY/Yj+40sWk4McoPSTHhWY3enGMTD9PloCFjpZBTRiH2Bl8gTavTyAm6wA3/cANGMDklsAdqMGr28AnMUynMQiwFyvC4qj5xnAZTSBvWjPQ/E6ogo4zPoXrdb5X0QkFcDmwzAiPhtbaSRlgKlidS1PLY1BGQBQG8dgHQCwPY4vAID68O4fJVoZWC+PNaEAAAAASUVORK5CYII=") 15px center no-repeat;
      border-radius: 4px;
      border: solid 1px $gray-color;
      box-shadow: none;
      display: block;
      height: 46px;
      padding-left: 45px;
      flex-grow: 1;

      &:focus {
        outline: none;
      }
    }

    &-result {
      position: absolute;
      top: 100%;
      left: 16px;
      right: 16px;
      max-height: 400px;
      overflow-y: auto;
      background-color: $white-color;

      &-list {
        @extend %reset-list;
        padding: 8px 16px;
        border: solid 1px $gray-color;
      }

      &-item {
        padding: 16px 8px;
        cursor: pointer;

        &:hover {
          background-color: $gray-color;
          transition: all 0.2s;
        }
      }

      &-title {
        font-size: 18px;
        font-weight: bold;
        display: block;
        color: $text-color;

        &:first-letter {
          text-transform: uppercase;
        }
      }

      &-date {
        color: $text-color-secondary;
      }

      &-genre {
        display: block;
        text-transform: lowercase;
        margin: 4px 0;

        &:first-letter {
          text-transform: uppercase;
        }
      }
    }
  }

  &__content {
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 16px;
  }
}
</style>