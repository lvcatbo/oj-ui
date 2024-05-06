import { createApp } from 'vue'
import '@/assets/style/index.css'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import  setupDirective from './directives'

const app = createApp(App);

const setup = () => {
  app.use(store);
  app.use(router);
  setupDirective(app);
}

setup();

app.mount('#app');
