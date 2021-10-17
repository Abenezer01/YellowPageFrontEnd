import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'

// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'



// Axios Mock Adapter
import '@/@fake-db/db'

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
// Composition API
Vue.use(VueCompositionAPI)
Vue.mixin({
  methods: {
    formatPrice(value) {
      let val = (Number.parseFloat(value / 1)).toFixed(2).replace(",", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token

    },
    statusMessage: function (res) {
      if (res.status) {
        this.$bvToast.toast(res.message, {
          title: `Sucess`,
          variant: "success",
          solid: true,
          appendToast: false,
        });
      } else {
        this.$bvToast.toast(res.message, {
          title: `Warning`,
          variant: "warning",
          solid: true,
          appendToast: false,
        });
      }

    },
    getDate(val) {
      var date = new Date(val);
      return date.toDateString();
    },
  },
})

// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
