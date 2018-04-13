<template>
    <div class="container">
      <netshoes-cart :prop="cart"></netshoes-cart>
      <div class="row" v-for="products_itens in products_list" :key="products_itens.id">
        <div class="col-xs-6 col-md-3  offset-md-1 col-lg-3  offset-lg-1 item-list"
            v-for="item in products_itens"
            :key="item.id"
            :id="item.sku"
            @click="addItemCart(item.sku, item.title, item.price)">
          <a href="javascript:void(0)" @mouseenter="showBuy(item.sku)" v-on:mouseleave="hideBuy(item.sku)">
            <img class="buy-icon" src="@/assets/img/buy.png" alt="Imagem 1">
            <img class="product-image" src="@/assets/img/img1.jpg" alt="Imagem 1">
          </a>
            <span class="title-description">{{ item.title }}</span>
            <span class="item-price"><strong> {{item.currencyFormat}} {{item.price}}</strong></span>
            <span class="card-payment" v-on="calcCard(item.price,item.installments)">ou x {{priceInstall}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import products from '@/assets/helper/products.json';
import cart from '@/components/Cart/cart';

export default {
  data() {
    return {
      products_list: products,
      price: null,
      itemInstall: null,
      priceInstall: 0,
      show: true,
      cart: [
        {
          product_id: '',
          product_title: '',
          product_price: '',
        },
      ],
    };
  },
  components: {
    'netshoes-cart': cart,
  },
  methods: {
    calcCard(price, parc) {
      this.price = price;
      this.itemInstall = parc;
      this.priceInstall = (this.price / this.itemInstall).toFixed(2).replace('.', ',');
    },
    addItemCart(id, title, price) {
      this.cart.push({
        product_id: id,
        product_title: title,
        product_price: price,
      });
      console.log(this.cart);
    },
    hideBuy(item) {
      this.el = document.getElementById(item);
    },
    showBuy(item) {
      this.el = document.getElementById(item);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/scss/_variables.scss";
.item-list {
  a {
    display: inline-block;
    img {
      width: 200px;
    }
    .buy-icon {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 40%;
      transform: translateY(-50%);
      left: 40%;
      opacity: 0;
      -webkit-transition: opacity 1s; /* For Safari 3.1 to 6.0 */
      transition: opacity 1s;
    }
    .product-image {
      -webkit-transition: opacity 1s; /* For Safari 3.1 to 6.0 */
      transition: opacity 1s;
    }
    &:hover .product-image {
      opacity: 0.5;
      -webkit-transition: all 1s; /* For Safari 3.1 to 6.0 */
      transition: all 1s;
    }
    &:hover .buy-icon {
      opacity: 1;
      -webkit-transition: all 1s; /* For Safari 3.1 to 6.0 */
      transition: all 1s;
    }
  }
  span {
    display: block;
  }
  .item-price {
    strong {
      font-family: 'open_sansextrabold';
    }
    @extend %font-large;
  }
}
</style>
