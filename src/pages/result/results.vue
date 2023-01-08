<template>
	<div v-if="questions" class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-2 sm:pt-6 max-w-7xl">
		<div class="w-full flex justify-center p-4 mb-4 bg-gray-100 rounded">
			<span>Results</span>
		</div>
		<score-counter :start-watch="false">
			<template #leftTitleArea>
				<span>{{ getCorrectAmount }} of {{ getQuestionAmount }} is correct</span>
			</template>
			<template #middleTitleArea>
				<span>Difficulty: {{ getDifficulty }}</span>
			</template>
		</score-counter>
		<template v-for="(question, index) in questions">
			<multi-choice :check-answers="true" :index="index" :question="question"/>
		</template>

		<div class="flex flex-col sm:flex-row sm:space-x-4 mb-6">
			<custom-button custom-class="mb-4" @click="tryOtherMode('easy')" text="Try Easy"/>
			<custom-button custom-class="mb-4" @click="tryOtherMode('medium')" text="Try Medium"/>
			<custom-button custom-class="mb-4" @click="tryOtherMode('hard')" text="Try Hard"/>
		</div>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import MultiChoice from "@/components/trivia/trivia-wrapper/multi-choice.vue";
import ScoreCounter from "@/components/trivia/trivia-wrapper/score-counter.vue";
import seedrandom from "seedrandom";
import CustomButton from "@/components/core/buttons/custom-button.vue";

export default {
	name: "results-page",
	components: {CustomButton, ScoreCounter, MultiChoice},
	data() {
		return {
			questions: null,
		}
	},
	computed: {
		...mapGetters({
			getDifficulty: "getDifficulty",
		}),
		getStoreModuleName() {
			return `${this.$store.state.difficulty.toLowerCase()}TriviaModuleState/`;
		},
		getQuestionAmount() {
			return this.questions.length;
		},
		getCorrectAmount() {
			let correctAmount = 0;
			let getChoiceByIndex = this.$store.getters[`${this.getStoreModuleName}getChoiceByIndex`];
			for (let i = 0; i < this.questions.length; i++) {
				let array = this.shuffleArray([this.questions[i].correct_answer, ...this.questions[i].incorrect_answers], this.questions[i].uid);
				if (this.questions[i].correct_answer === array[getChoiceByIndex(i)]) correctAmount++;
			}

			return correctAmount;
		},
	},
	methods: {
		tryOtherMode(level) {
			this.$store.commit(`${level}TriviaModuleState/RESET_ALL`);
			this.$router.push(level);
		},
		shuffleArray(array, uid) {
			// Using the token to shuffle the answers and adding a uid as salt just to give it a bit more.
			const random = seedrandom(this.$store.state.sessionToken + "-" + uid);

			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}

			return array;
		},
	},
	mounted() {
		this.questions = this.$store.getters[`${this.getStoreModuleName}getQuestions`];
	}
}
</script>

<style scoped>

</style>