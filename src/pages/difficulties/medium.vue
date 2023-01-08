<style scoped>

</style>

<template>
	<trivia-wrapper></trivia-wrapper>
</template>

<script lang="ts">
import TriviaWrapper from "@/components/trivia/trivia-wrapper.vue";

export default {
	name: "medium",
	components: {TriviaWrapper},
	beforeRouteEnter(to, from, next) {
		next(async vm => {
			vm.$store.commit(`${vm.$store.state.difficulty.toLowerCase()}TriviaModuleState/CLEAR_INTERVAL`)
			vm.$nextTick(() => vm.$store.commit("SET_DIFFICULTY", "Medium"));
		});
	},
	data() {
		return {}
	},
}
</script>