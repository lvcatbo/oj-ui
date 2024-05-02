import { createApp } from 'vue'
import '@/assets/style/index.css'
import router from '@/router'
import store from '@/store'
import App from './App.vue'

const app = createApp(App);

app.use(store);
app.use(router);

app.mount('#app');
