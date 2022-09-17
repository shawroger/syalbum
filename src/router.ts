import { createRouter, createWebHashHistory } from "vue-router";
import homeVue from "./components/home.vue";
export const Router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			component: homeVue,
			path: "/",
		},
	],
});
