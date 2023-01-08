<template>
	<div>
		<div v-if="question" class="p-4 mb-4 bg-gray-100 rounded">
			<span class="mb-2 inline-block font-bold">{{ decodeHtml(question.question) }}</span>
			<div class="lg:flex lg:space-x-4">
				<template v-for="(choice, index) in choices">
					<!--					-->
					<choice @click="setChoice(index)" :index="index" :correctIndex="getCorrectAnswerIndex"
							:chosenIndex="chosenIndex"
							:text="decodeHtml(choice)"/>
				</template>
			</div>
		</div>
		<slot name="controls" :slot-scope="{chosenIndex}"></slot>
	</div>
</template>

<script lang="ts">
import seedrandom from "seedrandom"
import CustomButton from "@/components/core/buttons/custom-button.vue";
import Choice from "@/components/trivia/trivia-wrapper/multi-choice/choice.vue";
import {mapGetters} from "vuex";

export default {
	name: "multi-choice",
	components: {Choice, CustomButton},
	computed: {
		...mapGetters({
			getDifficulty: "getDifficulty",
		}),
		getCorrectAnswerIndex() {
			if (!this.checkAnswers) return null;

			for (let i = 0; i < this.choices.length; i++) {
				if (this.choices[i] == this.question.correct_answer) {
					return i;
				}
			}
		}
	},
	watch: {
		question: {
			immediate: true,
			handler: function (val, oldVal) {
				if (val == null) return;
				let array = [val.correct_answer, ...val.incorrect_answers];
				this.choices = this.shuffleArray(array, this.question.uid);
				let getChoiceByIndex = this.$store.getters[`${this.getDifficulty.toLowerCase()}TriviaModuleState/getChoiceByIndex`];
				if (this.index == null) {
					this.chosenIndex = getChoiceByIndex(this.$store.getters[`${this.getDifficulty.toLowerCase()}TriviaModuleState/getCurrentQuestionNumber`]);
				} else this.chosenIndex = getChoiceByIndex(this.index);
			}
		},
	},
	props: {
		checkAnswers: {
			default: false,
		},
		index: {
			default: null,
		},
		question: {
			default: null,
		},
	},
	data() {
		return {
			choices: null,
			chosenIndex: null,
		}
	},
	methods: {
		setChoice(index) {
			for (let i = 0; i < this.choices.length; i++) {
				if (index === i) {
					this.chosenIndex = index;
					this.$store.dispatch(`${this.getDifficulty.toLowerCase()}TriviaModuleState/SET_CHOICE`, {
						index: this.$store.getters[`${this.getDifficulty.toLowerCase()}TriviaModuleState/getCurrentQuestionNumber`],
						chosenIndex: index,
					});
					break;
				}
			}
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
		decodeHtml(html) {
			let textarea = document.createElement("textarea");
			textarea.innerHTML = html;
			let value = textarea.value;
			textarea.remove();
			return value;
		},
	},
}
</script>

<style scoped>

</style>