<template>
	<div class="h-screen mx-4 flex justify-center items-center">
		<div class=" w-full sm:w-[28rem] px-sm-20 p-10 bg-gray-100 rounded">
			<h1 class="text-center pb-10 text-4xl font-semibold">Sign In With</h1>
			<div class="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0 space-y-4 mb-5">
				<social-media-button @click="dummyLoginProcess" icon="fa-brands fa-square-facebook"
									 social-network-class="facebook-button" text="Facebook"></social-media-button>
				<social-media-button @click="dummyLoginProcess" icon="fa-brands fa-google"
									 social-network-class="google-button" text="Google"></social-media-button>
			</div>
			<label class="mt-2 mb-1 block font-semibold">Email</label>
			<input v-model="email" type="text" class="p-2 mb-2 rounded border-2 w-full focus:outline-none focus:ring-0">
			<label class="mt-2 mb-1 block font-semibold">Password<a
				class="underline font-semibold text-gray-400 ml-2"><small>Forgot?</small></a></label>
			<div class="relative">
				<input v-model="password" type="password"
					   class="p-2 rounded border-2 w-full focus:outline-none focus:ring-0">
				<small class="absolute left-1 top-full text-red-600" v-show="error">{{ error }}</small>
			</div>
			<button :disabled="loggingIn">

			</button>
			<custom-button @click="login" text="Sign In"></custom-button>
		</div>
	</div>
</template>

<script lang="ts">
import CustomButton from "@/components/core/buttons/custom-button.vue";
import SocialMediaButton from "@/components/core/buttons/social-media-button.vue";
import axios from "axios";

export default {
	name: "login",
	components: {SocialMediaButton, CustomButton},
	data() {
		return {
			loggingIn: false,
			email: null,
			password: null,
			error: "",
		}
	},
	methods: {
		async login() {
			this.loggingIn = true;
			//Dummy login ;)

			if (this.email == null && this.password == null) {
				this.loggingIn = false;
				this.error = "Please enter your email and password";
				return;
			}

			if (this.email == null) {
				this.loggingIn = false;
				this.error = "Please enter your email";
				return;
			}

			const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			if (!res.test(this.email)) {
				this.loggingIn = false;
				this.error = "Please enter a valid email.";
				return;
			}

			if (this.password == null) {
				this.loggingIn = false;
				this.error = "Please enter your password";
				return;
			}

			if (this.email !== "admin@mail.com" || this.password !== "admin") {
				this.loggingIn = false;
				this.error = "Your email or password is wrong!";
				return;
			}
			await this.dummyLoginProcess();
		},
		async getSessionToken() {
			return (await axios.get('https://opentdb.com/api_token.php', {
				params: {
					command: "request",
				}
			})).data;
		},
		async dummyLoginProcess() {
			let data = await this.getSessionToken();

			//@ts-ignore
			if (data.response_code !== 0) {
				//Todo fail implement toast
				console.error(data.response_message)
				return;
			}

			this.$store.commit("SET_SESSION_TOKEN", data.token);
			this.loggingIn = false;
			this.error = false;

			await this.$router.push("easy");
		}
	},
	async beforeCreate() {
		if (this.$store.state.sessionToken != null) {
			await this.$router.push("easy");
		}
	}
}
</script>