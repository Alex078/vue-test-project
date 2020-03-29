<template>
  <div id="app">
    <router-view/>
    <loader/>
  </div>
</template>


<script>
import loader from '@/components/Loader.vue';

export default {
  components: {
    loader
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
