import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';


Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme:{dark:false},
    icons: {
        iconfont: 'mdi', // 默认值 - 仅用于展示目的
    },
});
export default vuetify
