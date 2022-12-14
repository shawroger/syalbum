import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	base: "/widgets/syalbum/",
	server: {
		proxy: {
			"/api": "http://localhost:6806",
			"/assets": "http://localhost:6806",
		},
	},
});
