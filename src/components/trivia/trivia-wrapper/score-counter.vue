<template>
	<div class="flex space-x-0 sm:space-x-4 relative flex-col sm:flex-row">
		<div class="w-full flex justify-center p-4 mb-4 bg-gray-100 rounded">
			<slot name="leftTitleArea">
				<span>Questions: {{ currentQuestionNumber + 1 }} of {{ questionAmount }}</span>
			</slot>
		</div>
		<div class="w-full flex justify-center p-4 mb-4 bg-gray-100 rounded">
			<slot name="middleTitleArea"></slot>
		</div>
		<div class="w-full flex justify-center p-4 mb-4 bg-gray-100 rounded">
			<span>Timer: {{ formattedTimer }}</span>
		</div>
	</div>
</template>

<script lang="ts">
export default {
	name: "score-counter",
	props: {
		time: {
			default: null,
		},
		questionAmount: {
			default: 50,
		},
		currentQuestionNumber: {
			default: 0,
		},
		startWatch: {
			default: true,
		}
	},
	computed: {
		getStoreModuleName() {
			return `${this.$store.state.difficulty.toLowerCase()}TriviaModuleState/`;
		},
		formattedTimer() {
			let seconds = this.timePassed % 60;
			let minutes = Math.floor(this.timePassed / 60);

			return `${minutes}:${seconds.toString().padStart(2, '0')}`
		},
	},
	data() {
		return {
			timePassed: 0,
			timerInterval: null,
		}
	},
	methods: {
		stopTimer() {
			clearInterval(this.timerInterval);
		},
		startTimer() {
			this.timerInterval = setInterval(() => {
				this.$store.commit(`${this.getStoreModuleName}SET_TIME`, ++this.timePassed);
			}, 1000);
			
			this.$store.commit(`${this.getStoreModuleName}SET_INTERVAL`, this.timerInterval)
		}
	},
	mounted() {
		this.$nextTick(() => {
			this.timePassed = this.$store.getters[`${this.getStoreModuleName}getTime`];
			if (this.startWatch) this.startTimer();
			else this.stopTimer();
		});
	}
}
</script>