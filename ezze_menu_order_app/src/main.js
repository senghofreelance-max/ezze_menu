import { createApp } from "vue";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import "@shared/styles/app.css";
import frappePlugin from "@shared/plugins/frappe";
import { setupPrimeVue } from "@shared/plugins/primevue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(frappePlugin);
setupPrimeVue(app);
app.use(router);
app.mount("#app");
