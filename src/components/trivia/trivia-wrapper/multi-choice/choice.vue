<template>
	<button @click="click"
			class="flex justify-center border w-full bg-white flex-col items-center py-5 select-none"
			:class="getChoiceBGClass">
		<span v-if="correctIndex != null" class="absolute top-1 right-2" title="correct answer.">
			<font-awesome-icon v-if="index === correctIndex" class="text-lime-400" icon="fa-solid fa-circle-check" />
		</span>
		<span>
			AWNSER <span class="font-extrabold">{{ letterArray[index] }}</span>
		</span>
		<span class="font-semibold">
			{{ text }}
		</span>
	</button>
</template>

<script lang="ts">
export default {
	name: "choice",
	computed: {
		getChoiceBGClass() {
			if(this.correctIndex == null) {
				return this.index === this.chosenIndex ? "border-indigo-300" : "border-gray-300";
			}
			
			if(this.correctIndex === this.chosenIndex &&  this.correctIndex === this.index) {
				return "border-lime-400"
			}
			
			if(this.chosenIndex === this.index) {
				return "border-red-300"
			}
		},
	},
	props: {
		correctIndex: {default: -1,},
		index: {default: 0,},
		text: {default: null,},
		chosenIndex: {default: null,},
	},
	data() {
		return {
			letterArray: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
		}
	},
	methods: {
		click() {
			if(this.correctIndex != null) return;
			this.$emit('click');
		},
	},
}
</script>

<style scoped>

</style>