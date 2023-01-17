import Vue from 'vue'
import './assets/main.scss'
import VueRouter from 'vue-router'
import Vuex, { ModuleTree, Store } from 'vuex'
import type {CombinedVueInstance} from 'vue/types/vue';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faSquareFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import LoginComponent from './pages/login.vue'
import ResultComponent from './pages/result/results.vue'
import EasyComponent from './pages/difficulties/easy.vue'
import MediumComponent from './pages/difficulties/medium.vue'
import HardComponent from './pages/difficulties/hard.vue'
import easyTriviaModuleState from './store-modules/easyTriviaModuleState'
import mediumTriviaModuleState from './store-modules/mediumTriviaModuleState'
import hardTriviaModuleState from './store-modules/hardTriviaModuleState'
import VuexPersistence from 'vuex-persist'
import App from './App.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

config.autoAddCss = false
library.add(faSquareFacebook, faGoogle, faCircleCheck)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('font-awesome-layers', FontAwesomeLayers)

const routes = [
	{ path: '/', redirect: { name: 'login' } },
	{ path: '/login', name: 'login', component: LoginComponent },
	{ path: '/results', name: 'results', component: ResultComponent },
	{ path: '/easy', name: 'easy', component: EasyComponent },
	{ path: '/medium', name: 'medium', component: MediumComponent },
	{ path: '/hard', name: 'hard', component: HardComponent },
]

const router = new VueRouter({
	mode: 'hash',
	routes,
})

interface IState {
	sessionToken: any
	difficulty: string
}

const vuexLocal = new VuexPersistence({
	storage: window.localStorage,
	modules: ['easyTriviaModuleState', 'mediumTriviaModuleState', 'hardTriviaModuleState', 'sessionToken', 'difficulty'],
})

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

declare global {
	interface Window {
		Vue: typeof Vue
		store: Store<IState>
		route: VueRouter
		vueApp: CombinedVueInstance<Vue, object, object, object, Record<never, unknown>>
	}
}


router.beforeEach(async (to, from, next) => {
	async function doAction() {
		if (store.state.sessionToken == null) {
			if (to.name !== 'login')
				next({name: 'login'});
			else next();

			return;
		}

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

// @ts-ignore
window.Vue = Vue
window.store = store
window.route = router

const vueApp = new Vue({
	store,
	router,
	render: (h) => h(App),
}).$mount('#app')

window.vueApp = vueApp