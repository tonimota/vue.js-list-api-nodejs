import Vue from 'vue';
import Router from 'vue-router';
import List from '@/components/List/list';
import Cart from '@/components/Cart/cart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Listagem',
      component: List,
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
    },
  ],
});
