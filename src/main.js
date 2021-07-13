import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

import {Checkbox, CheckboxGroup, Lazyload} from 'vant';
import { Stepper } from 'vant';
import { Button } from 'vant';
import { SubmitBar } from 'vant';


createApp(App).use(store).use(router).use(ElementPlus).use(SubmitBar)
    .use(Button)
    .use(Stepper)
    .use(Checkbox)
    .use(CheckboxGroup).mount('#app')
