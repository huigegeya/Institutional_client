import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // 默认值 - 仅用于展示目的
        values: {
            eye: 'mdi-remove red eye',
            email: 'mdi-email',
            home: 'mdi-home',
            blog: 'mdi-forum',
            user: 'mdi-account',
            article: 'mdi-notebook-edit',
            comment: 'mdi-comment-outline',
            category: 'mdi-format-list-bulleted',
            search: 'mdi-text-search',
            refresh: 'mdi-refresh',
            click: 'mdi-cursor-default-click',
            eye: 'mdi-eye',
            counter: 'mdi-counter',
            login: 'mdi-login',
            password: 'mdi-form-textbox-password',
            arrowRight: 'mdi-arrow-right',
            plus: 'mdi-plus',
            minus: 'mdi-minus',
            edit: 'mdi-pencil',
            delete: 'mdi-delete',
            teacher: 'mdi-account-tie',
            student: 'mdi-account-check',
            comment: 'mdi-account-multiple',
            identity: 'mdi-account-multiple-check',
            subject: 'mdi-book-open-page-variant',
            add: 'mdi-account-plus-outline',
            editt: 'mdi-account-edit',
            close: 'mdi-close',
            honor: 'mdi-seal',
            mySubject: 'mdi-account-details',
            addCount: 'mdi-account-plus'
        },
    },
});
