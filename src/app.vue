<style scoped>
</style>

<template>
  <div id="app">
    <header v-if="getSessionToken">
        <nav-menu></nav-menu>
    </header>

    <router-view />
  </div>
</template>
<script lang="ts">
import NavMenu from "./components/core/nav-menu.vue";
import {mapGetters} from "vuex";
export default {
    components: {NavMenu},
    computed: {
        ...mapGetters({
            getToasts: "getToasts",
            getSessionToken: "getSessionToken",
        }),
    },
}
</script>