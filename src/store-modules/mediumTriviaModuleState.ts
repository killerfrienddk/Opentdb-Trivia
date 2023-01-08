import {Module} from "vuex";

interface IMediumTriviaModuleState {
	time: number | null;
	currentQuestionNumber: number | null;
	questions: any | null;
	choices: any | null;
}

const mediumTriviaModuleState: Module<IMediumTriviaModuleState, unknown> = {
	namespaced: true,
	state: () => ({
		currentQuestionNumber: 0,
		questions: null,
		choices: null,
		time: 0,
	}),
	actions: {
		RESET_ALL(context, args) {
			context.commit("RESET_ALL", args);
		},
		SET_CHOICE(context, args) {
			context.commit("SET_CHOICE", args);
		},
		SET_CURRENT_QUESTION_NUMBER(context, args) {
			context.commit("SET_CURRENT_QUESTION_NUMBER", args);
		},
		SET_NEW_QUESTIONS(context, args) {
			context.commit("SET_NEW_QUESTIONS", args);
		},
		SET_TIME(context, args) {
			context.commit("SET_TIME", args);
		},
	},
	mutations: {
		RESET_ALL(state, args) {
			state.currentQuestionNumber = 0;
			state.questions = null;
			state.choices = null;
			state.time = 0;
		},
		SET_CHOICE(state, args) {
			if (state.choices == null) state.choices = [];
			state.choices[args.index] = args.chosenIndex;
		},
		SET_CURRENT_QUESTION_NUMBER(state, args) {
			state.currentQuestionNumber = args;
		},
		SET_NEW_QUESTIONS(state, args) {
			state.questions = args;
		},
		SET_TIME(state, args) {
			state.time = args;
		},
	},
	getters: {
		getChoiceByIndex: (state) => (index) => {
			if (state.choices == null) state.choices = [];
			if(state.choices[index]) return null;
			return state.choices[index];
		},
		getCurrentQuestionNumber(state) {
			return state.currentQuestionNumber;
		},
		getQuestions(state) {
			return state.questions;
		},
		getTime(state) {
			return state.time;
		},
	}
};

export default mediumTriviaModuleState;