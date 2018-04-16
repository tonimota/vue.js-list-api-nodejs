<template>
    <div class="container">
      <netshoes-cart :cart="cart" />
      <div class="row">
        <!-- <div class="loading" v-if="loading">
          <img class="loading-img" src="@/assets/img/loading.gif" alt="">
        </div> -->
        <span class="tooltiptext">Item adicionado :)</span>
        <div class="col-xs-12 col-sm-6 col-md-3 col-md-offset-1 col-lg-4 col-lg-offset-0 item-list" v-for="(item, index) in products_list" :key="index" :id="item.sku">
          <a href="#"
            @mouseenter="showBuy(item.sku)"
            @mouseleave="hideBuy(item.sku)"
            @click.prevent="addItemCart(item), tootTip()">
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
import cart from '@/components/Cart/cart';
import axios from 'axios';

export default {
  data() {
    return {
      products_list: '',
      add: false,
      cart: [],
      loading: true,
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
      this.itensLocalStorageCheck();
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
      localStorage.setItem('products', JSON.stringify(this.cart));
    },
    itensLocalStorageCheck() {
      this.localItens = JSON.parse(localStorage.getItem('products'));
      if (this.localItens != null) {
        this.cart = JSON.parse(localStorage.getItem('products'));
      }
    },
    hideBuy(item) {
      this.el = document.getElementById(item);
    },
    showBuy(item) {
      this.el = document.getElementById(item);
    },
    tootTip() {
      document.querySelector('.tooltiptext').classList.add('tooltip-visible');
      setTimeout(() => {
        document.querySelector('.tooltiptext').classList.remove('tooltip-visible');
      }, 1000);
    },
  },
  async mounted() {
    axios.get('http://localhost:3002/products').then((res) => {
      this.products_list = res.data.products;
    });
  },
};
</script>

<style lang="scss">
@import "../../assets/style/scss/_variables.scss";
.tooltiptext {
  opacity: 0;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 15px;
  transition: all 1s;
  /* Position the tooltip */
  position: fixed;
  z-index: 1;
  top: 50px;
  right: 9%;
}
.tooltip-visible {
  opacity: 1;
}
.item-list {
  height: 390px;
  &::before {
    content: "";
    display: block;
    margin-top: 50px;
  }
  &:hover {
    .item-price {
      &::before {
        width: 100px;
      }
    }
  }
  a {
    display: inline-block;
    img {
      width: 200px;
    }
    .buy-icon {
      width: 50px;
      height: 50px;
      position: absolute;
      top: 45%;
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
    &:hover {
      .product-image {
        opacity: 0.5;
        -webkit-transition: all 1s; /* For Safari 3.1 to 6.0 */
        transition: all 1s;
      }
      .buy-icon {
        opacity: 1;
        -webkit-transition: all 1s; /* For Safari 3.1 to 6.0 */
        transition: all 1s;
      }
    }
  }
  .title-description {
    height: 40px;
    margin-top: 15px;
  }
  .item-price {
    font-size: 12px;
    strong {
      @extend %extra-bold;
      @extend %font-large;
    }
    &::before {
      content: "";
      width: 20px;
      height: 3px;
      display: block;
      margin: 0 auto;
      background-color: #dfbc00;
      transition: all 0.5s;
    }
  }
  .card-payment {
    @extend %font-medium;
    @extend %semi-bold;
    color: #999999;
  }
}
</style>
