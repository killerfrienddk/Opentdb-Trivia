import {Module} from "vuex";

interface IEasyTriviaModuleState {
	time: number | null;
	currentQuestionNumber: number | null;
	questions: any | null;
	choices: any | null;
	interval: any | null;
}

const easyTriviaModuleState: Module<IEasyTriviaModuleState, unknown> = {
	namespaced: true,
	state: () => ({
		currentQuestionNumber: 0,
		questions: null,
		choices: null,
		time: 0,
		interval: null,
	}),
	actions: {
		RESET_ALL(context, args) {
			context.commit("RESET_ALL", args);
		},
		CLEAR_INTERVAL(context, args) {
			context.commit("CLEAR_INTERVAL", args);
		},
		SET_INTERVAL(context, args) {
			context.commit("SET_INTERVAL", args);
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
			debugger
			state.currentQuestionNumber = 0;
			state.questions = null;
			state.choices = null;
			state.time = 0;
			clearInterval(state.interval);
		},
		CLEAR_INTERVAL(state, args) {
			if(state.interval == null) return; 
			clearInterval(state.interval);
		},
		SET_INTERVAL(state, args) {
			state.interval = args;
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

export default easyTriviaModuleState;