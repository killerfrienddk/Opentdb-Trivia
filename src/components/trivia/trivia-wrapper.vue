<template>
	<div v-if="questions" class="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 pt-2 sm:pt-6 max-w-7xl">
		<div class="w-full flex justify-center p-4 mb-4 bg-gray-100 rounded">
			<span>{{ getDifficulty }}</span>
		</div>
		<score-counter :question-amount="questionAmount" :current-question-number="currentQuestionNumber">
			<template #middleTitleArea>
				<template
					v-if="currentQuestionNumber <= questionAmount - 1 && currentQuestionNumber <= questionAmount - 1">
					<template v-if="questions[currentQuestionNumber]">
						{{ questions[currentQuestionNumber].category }}
					</template>
				</template>
				<template v-else>
					Done
				</template>
			</template>
		</score-counter>
		<multi-choice :question="questions[currentQuestionNumber]">
			<template slot="controls" slot-scope="{ slotScope }">
				<div class="flex flex-col sm:flex-row sm:space-x-4 mb-6">
					<custom-button custom-class="mb-4" :disabled="currentQuestionNumber === 0" @click="previousQuestion" text="Back"/>
					<custom-button custom-class="mb-4" v-if="currentQuestionNumber <= questionAmount - 2"
								     :disabled="slotScope.chosenIndex == null" @click="nextQuestion" text="Confirm"/>
					<custom-button custom-class="mb-4" v-else @click="seeResults" text="See Results"
								   :disabled="slotScope.chosenIndex == null"/>
				</div>
			</template>
		</multi-choice>
	</div>
</template>

<script lang="ts">
import MultiChoice from "@/components/trivia/trivia-wrapper/multi-choice.vue";
import CustomButton from "@/components/core/buttons/custom-button.vue";

import axios from "axios";
import ScoreCounter from "@/components/trivia/trivia-wrapper/score-counter.vue";
import {mapGetters} from "vuex";
import {v4 as uuidv4} from 'uuid';


export default {
	name: "trivia-wrapper",
	components: {ScoreCounter, CustomButton, MultiChoice},
	computed: {
		...mapGetters({
			getDifficulty: "getDifficulty",
		}),
		getStoreModuleName() {
			return `${this.$store.state.difficulty.toLowerCase()}TriviaModuleState/`;
		}
	},
	props: {
		difficulty: {
			default: 'Easy',
		},
	},
	data() {
		return {
			currentQuestionNumber: 0,
			questions: [],
			time: null,
			questionAmount: 10,
		}
	},
	methods: {
		seeResults() {
			this.$router.push("results")
		},
		previousQuestion() {
			this.$store.dispatch(`${this.getStoreModuleName}SET_CURRENT_QUESTION_NUMBER`, --this.currentQuestionNumber);
		},
		nextQuestion() {
			this.$store.dispatch(`${this.getStoreModuleName}SET_CURRENT_QUESTION_NUMBER`, ++this.currentQuestionNumber);
		},
		async getQuestions(amount) {
			let questions = (await axios.get('https://opentdb.com/api.php', {
				params: {
					amount: amount,
					type: 'multiple',
					difficulty: this.$store.state.difficulty.toLowerCase(),
					token: this.$store.state.sessionToken,
				}
			})).data;

			// TODO: error handling for resetting it.
			await this.addUids(questions.results);
		},
		async addUids(array) {
			for (let i = 0; i < array.length; i++) {
				array[i].uid = uuidv4();
			}

			this.questions = array;
			await this.$store.dispatch(`${this.getStoreModuleName}SET_NEW_QUESTIONS`, array);
		},
	},
	async mounted() {
		this.$nextTick(async() => {
			let questions = this.$store.getters[`${this.getStoreModuleName}getQuestions`];
			if (questions != null) {
				this.questions = questions;
				this.currentQuestionNumber = this.$store.getters[`${this.getStoreModuleName}getCurrentQuestionNumber`] || 0;
				this.time = this.$store.getters[`${this.getStoreModuleName}getTime`];
				return;
			}

			await this.getQuestions(this.questionAmount);
		});
	}
}
</script>