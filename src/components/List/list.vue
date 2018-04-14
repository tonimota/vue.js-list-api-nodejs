<template>
    <div class="container">
      <netshoes-cart :cart="cart" />

      <div class="row">
        <div class="col-xs-6 col-md-3  offset-md-1 col-lg-3  offset-lg-1 item-list" v-for="(item, index) in products_list" :key="index" :id="item.sku">
          <a href="#"
            @mouseenter="showBuy(item.sku)"
            @mouseleave="hideBuy(item.sku)"
            @click.prevent="addItemCart(item)">
            <img class="buy-icon" src="@/assets/img/buy.png" alt="Imagem 1">
            <img class="product-image" src="@/assets/img/img1.jpg" alt="Imagem 1">
          </a>
          <span class="title-description">{{ item.title }}</span>
          <span class="item-price"><strong> {{item.currencyFormat}} {{item.price}}</strong></span>
          <span class="card-payment">ou x {{calcInstallments(item.price, item.installments)}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import json from '@/assets/helper/products.json';
import cart from '@/components/Cart/cart';
import Vue from 'vue'

export default {
  data() {
    return {
      products_list: json.products,
      add: false,
      cart: [],
      teste: [
        {
          id: 0,
          sku: 8552515751438644,
          title: 'Camisa Nike Corinthians I',
          description: '14/15 s/nº',
          availableSizes: ['S', 'G', 'GG', 'GGG'],
          style: 'Branco com listras pretas',
          price: 229.9,
          installments: 9,
          currencyId: 'BRL',
          currencyFormat: 'R$',
          isFreeShipping: true,
        },

        {
          id: 1,
          sku: 18644119330491312,
          title: 'Camisa Nike Corinthians II',
          description: '14/15 s/nº',
          availableSizes: ['S', 'G', 'GG', 'GGG'],
          style: 'Preta com listras brancas',
          price: 229.9,
          installments: 9,
          currencyId: 'BRL',
          currencyFormat: 'R$',
          isFreeShipping: true,
        },

        {
          id: 2,
          sku: 11854078013954528,
          title: 'Camisa Feminina Nike Corinthians I',
          description: '14/15 s/nº',
          availableSizes: ['S', 'G'],
          style: 'Branco com listras pretas',
          price: 199.9,
          installments: 7,
          currencyId: 'BRL',
          currencyFormat: 'R$',
          isFreeShipping: true,
        },
      ],
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
      if (this.cart.length > 0) {
        this.cart.forEach((index) => {
          if (index.sku === item.sku) {
            console.log('item: ' + item.sku);
            console.log('index: ' + index.sku);
            console.log('quantity: ' + index.quantity);
            if(index.quantity === undefined) {
              index.quantity = 1
            } else {
              item.quantity =+1;
            }
            this.$set(index, 'quantity', '');
            console.log(index);
            this.add = true;
          }
        });
        if (!this.add) {
          this.cart.push(item);
        }
      } else {
        this.cart.push(item);
      }
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
