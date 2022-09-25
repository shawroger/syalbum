import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import {
	VideoPause,
	VideoPlay,
	Back,
	Right,
	CopyDocument,
} from "@element-plus/icons-vue";

const app = createApp(App);
app.component("VideoPause", VideoPause);
app.component("VideoPlay", VideoPlay);
app.component("Back", Back);
app.component("Right", Right);
app.component("CopyDocument", CopyDocument);
app.use(ElementPlus);
app.mount("#app");
