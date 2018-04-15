<template>
    <div class="container">
      <netshoes-cart :cart="cart" />

      <div class="row">
        <div class="col-xs-12 col-sm-6 col-md-4  offset-md-1 col-lg-4  offset-lg-1 item-list" v-for="(item, index) in products_list" :key="index" :id="item.sku">
          <a href="#"
            @mouseenter="showBuy(item.sku)"
            @mouseleave="hideBuy(item.sku)"
            @click.prevent="addItemCart(item)">
            <img class="buy-icon" src="@/assets/img/buy.png" alt="Imagem 1">
            <img class="product-image" src="@/assets/img/img1.jpg" alt="Imagem 1">
          </a>
          <div class="title-description">{{ item.title }}</div>
          <div class="item-price">{{item.currencyFormat}} <strong>{{item.price}}</strong></div>
          <div class="card-payment">ou {{item.installments}} x {{calcInstallments(item.price, item.installments)}}</div>
        </div>
      </div>
    </div>
</template>

<script>
import json from '@/assets/helper/products.json';
import cart from '@/components/Cart/cart';

export default {
  data() {
    return {
      products_list: json.products,
      add: false,
      cart: [],
    };
  },
  components: {
    'netshoes-cart': cart,
  },
  methods: {
    calcInstallments(price, parc) {
      return (price / parc).toFixed(2).replace('.', ',');
    },
    addItemCart(item) {
      this.add = false;
      this.cart.forEach((index) => {
        if (index.sku === item.sku) {
          if (index.quantity === undefined) {
            this.$set(index, 'quantity', 2);
          } else {
            this.$set(index, 'quantity', index.quantity + 1);
          }
          this.add = true;
        }
      });
      if (!this.add) {
        this.$set(item, 'quantity', 1);
        this.cart.push(item);
      }
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
      left: 42%;
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
  .title-description {
    margin-top: 15px;
  }
  .item-price {
    font-size: 12px;
    strong {
      font-family: 'OpenSans-Bold';
      @extend %font-large;
    }
  }
  .card-payment {
    @extend %font-medium;
    font-family: 'open_sanssemibold';
    color: #999999;
  }
}
</style>
