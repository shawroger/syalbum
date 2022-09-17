import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { Router } from "./router";
import App from "./App.vue";

const app = createApp(App);

app.use(ElementPlus);
app.use(Router);
app.mount("#app");
