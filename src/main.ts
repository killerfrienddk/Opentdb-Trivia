import Vue from 'vue';
import './assets/main.scss';
import type {_RouteConfigBase, Component} from "vue-router/types/router";
import VueRouter from 'vue-router';

import type {CombinedVueInstance} from 'vue/types/vue';
import Vuex, {ModuleTree, Store} from 'vuex';

declare global {
	export interface Window {
		// @ts-ignore
		Vue: typeof Vue;
		store: Store<IState>;
		route: VueRouter;
		vueApp: CombinedVueInstance<Vue, object, object, object, Record<never, unknown>>;
	}
}

// @ts-ignore
window.Vue = Vue;

Vue.use(VueRouter);
Vue.use(Vuex);

import {FontAwesomeIcon, FontAwesomeLayers} from '@fortawesome/vue-fontawesome';
import {config, library} from '@fortawesome/fontawesome-svg-core';

config.autoAddCss = false;

import {faSquareFacebook} from "@fortawesome/free-brands-svg-icons/faSquareFacebook";
import {faGoogle} from "@fortawesome/free-brands-svg-icons/faGoogle";

library.add(
	faSquareFacebook, faGoogle,
);

import {faCircleCheck} from "@fortawesome/free-solid-svg-icons/faCircleCheck";

library.add(
	faCircleCheck,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);

/* eslint-disable vue/max-len */
const LoginComponent = () => import("./pages/login.vue");
const ResultComponent = () => import("./pages/result/results.vue");
const EasyComponent = () => import("./pages/difficulties/easy.vue");
const MediumComponent = () => import("./pages/difficulties/medium.vue");
const HardComponent = () => import("./pages/difficulties/hard.vue");

/* eslint-enable vue/max-len */

interface RouteConfig extends _RouteConfigBase {
	component?: Component | unknown
}

const routes: RouteConfig[] = [
	{path: '/', redirect: {name: "login"}},
	{path: '/login', name: "login", component: LoginComponent},
	{path: '/results', name: "results", component: ResultComponent},
	{path: '/easy', name: "easy", component: EasyComponent},
	{path: '/medium', name: "medium", component: MediumComponent},
	{path: '/hard', name: "hard", component: HardComponent},
];

const router = new VueRouter({
	mode: 'history',
	routes: routes
});

interface IState {
	sessionToken: any,
	difficulty: string;
}

import easyTriviaModuleState from "./store-modules/easyTriviaModuleState";
import mediumTriviaModuleState from "./store-modules/mediumTriviaModuleState";
import hardTriviaModuleState from "./store-modules/hardTriviaModuleState";

import VuexPersistence from 'vuex-persist';

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	modules: ["easyTriviaModuleState",
		"mediumTriviaModuleState",
		"hardTriviaModuleState",
		"sessionToken",
		"difficulty"],
});


const store = new Vuex.Store<IState>({
	modules: {
		easyTriviaModuleState,
		mediumTriviaModuleState,
		hardTriviaModuleState,
	},
	state: {
		sessionToken: null,
		difficulty: "",
	},
	getters: {
		getDifficulty(state) {
			return state.difficulty;
		},
		getState(state) {
			return state;
		},
		getSessionToken(state) {
			return state.sessionToken;
		},
	},
	actions: {
		SET_DIFFICULTY(context) {
			context.commit("SET_DIFFICULTY");
		},
		RESET_STATE(context) {
			context.commit("RESET_STATE");
		},
	},
	mutations: {
		SET_DIFFICULTY(state, difficulty) {
			state.difficulty = difficulty;
		},
		SET_SESSION_TOKEN(state, sessionToken) {
			state.sessionToken = sessionToken;
		},
		RESET_STATE(state) {
			state.sessionToken = null;
		},
	},
	plugins: [vuexLocal.plugin]
});

window.store = store;

router.beforeEach(async (to, from, next) => {
	async function doAction() {
		if (store.state.sessionToken == null) {
			if (to.name !== 'login')
				next({name: 'login'});
			else next();

			return;
		}

		debugger
		if (to.path === '/logout') {
			window.store.commit("SET_SESSION_TOKEN", null);
			window.store.commit("easyTriviaModuleState/RESET_ALL");
			window.store.commit("mediumTriviaModuleState/RESET_ALL");
			window.store.commit("hardTriviaModuleState/RESET_ALL");
			await router.push({name: 'login'});
			return;
		}
		next();
	}

	await doAction();
});

window.route = router;

import AppView from "./app.vue";

const app = new Vue({
	store,
	router,
	render: (h) => h(AppView)
}).$mount('#app');

window.vueApp = app;