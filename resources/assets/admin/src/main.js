import Vue from 'vue';
import 'babel-polyfill';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import colors from 'vuetify/es5/util/colors';
import VeeValidate from 'vee-validate';

import App from './App.vue';
import './stylus/main.styl';

import routes from './router';

import mixin from './mixin';

import store from './store';


Vue.use(VeeValidate);

window.Vue = Vue;
const router = new VueRouter({
    routes, // short for `routes: routes`
    scrollBehavior() {
        return {x: 0, y: 0};
    }
});

router.beforeEach((to, from, next) => {
    var user = LA.user;

    if (user){
        store.commit('auth', true);
        next();
    }else {
        store.commit('auth', false);
        next(false);
    }
    
})

Vue.use(Vuetify, {
    theme: {
        primary: colors.grey.darken3,
        secondary: colors.blue.darken3,
        accent: colors.lightGreen.darken3,
        error: colors.red.base,
        warning: colors.yellow.darken1,
        info: colors.blue.darken1,
        success: colors.green.darken2,
    },
});

Vue.use(VueRouter);

Vue.mixin(mixin);

window.Bus = new Vue();

new Vue({
    el: '#root',
    store,
    router,
    render: h => h(App),
});
