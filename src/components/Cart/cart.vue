<template>
  <div class="row">
    <div id="mySidenav" class="sidenav">
      <a href="#" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <div class="col-md-6 col-lg-4 col-sm-12 col-md-offset-3 col-lg-offset-4">
        <div class="icon-bag">
          <img src="@/assets/img/bag.png" alt="">
          <p class="products-quantity">{{total_itens}}</p>
          <span class="title-section">SACOLA</span>
        </div>
        <ul>
          <li class="cart-list" v-for="(item, index) in cart" :key="`item-${index}`">
            <div class="row">
              <div class="col-xs-3 col-sm-2 col-md-2 col-lg-2 ajust-mobile">
                <span class="cart-list-image">
                  <img src="@/assets/img/img-icon.png" alt="">
                </span>
              </div>
              <div class="col-xs-9 col-sm-10 col-md-10 col-lg-10 ajust-mobile">
                <div class="cart-list-details">
                  <p class="details-title">
                    <span class="details-title-description">{{ item.title }}</span>
                    <span @click="deleleItem(item, index), calcTotalItens()" class="delete-item"></span>
                  </p>
                  <p class="details-description">{{ item.style }}</p>
                  <p class="details-line">
                    <span class="line-quantity">Quantidade: {{ item.quantity }}</span>
                    <span class="line-price">{{item.currencyFormat}} {{ item.price }}</span>
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="total-cart">
          <p class="cart-description">
            <span class="cart-description-title">Subtotal</span>
            <span class="cart-description-total">R$ <strong>{{total_order}}</strong><em>ou em até 10x de R$ {{total_install}}</em></span>
          </p>
          <button class="btn-buy-button" @click="sendOrder(),calcTotalItens()">Comprar</button>
          <span class="order-message">{{msg}}</span>
        </div>
      </div>
    </div>
    <div class="icon-cart">
        <div class="icon-title" @click="openNav(), itensLocalStorageCheck()">
          <span class="open-cart">
            <img src="@/assets/img/buy2.png" />
            <!-- <p class="products-quantity">{{total}}</p> -->
          </span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // cart: {
    //   type: Array,
    //   require: true,
    // },
  },
  mounted() {
  },
  data() {
    return {
      total_itens: 0,
      total_order: 0,
      total_install: 0,
      localItens: 0,
      cart: '',
      msg: '',
    };
  },
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '100%';
      document.getElementById('mySidenav').style.opacity = '1';
    },
    closeNav() {
      this.msg = '';
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('mySidenav').style.opacity = '0';
    },
    calcTotalItens() {
      this.total_itens = 0;
      this.total_order = 0;
      this.total_install = 0;
      if (this.cart.length > 0) {
        this.cart.forEach((index) => {
          this.total_itens = this.total_itens + index.quantity;
          this.total_order = this.total_order + (index.quantity * index.price);
        });
        this.total_install = (this.total_order / 10).toFixed(2).replace('.', ',');
        this.total_order = this.total_order.toFixed(2).replace('.', ',');
      }
    },
    deleleItem(item, id) {
      this.cart.forEach((index) => {
        if (index.sku === item.sku) {
          if (index.quantity === 1) {
            this.cart.splice(id, 1);
          } else {
            this.$set(index, 'quantity', index.quantity - 1);
          }
        }
      });
      localStorage.setItem('products', JSON.stringify(this.cart));
    },
    sendOrder() {
      let control = this.cart.length;
      if (control > 0) {
        while (this.cart.length > 0) {
          this.cart.splice(control);
          control -= 1;
        }
        this.msg = 'Pedido Realizado com Sucesso :)';
        localStorage.setItem('products', JSON.stringify(this.cart));
      }
    },
    itensLocalStorageCheck() {
      this.localItens = JSON.parse(localStorage.getItem('products'));
      if (this.localItens != null) {
        this.cart = this.localItens;
        this.calcTotalItens();
      } else {
        this.cart = 0;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/scss/_variables.scss";
.icon-cart {
  .icon-title {
    display: block;
    .open-cart {
      position: fixed;
      bottom: 0px;
      right: 0px;
      z-index: 1;
      display: block;
      width: 65px;
      height: 65px;
      margin: 0 auto;
      background-color: currentColor;
      border-radius: 50%;
      line-height: 65px;
      float: right;
      margin: 50px;
      cursor: pointer;
      -webkit-box-shadow: 10px 10px 30px -10px rgba(0,0,0,0.75);
      -moz-box-shadow: 10px 10px 30px -10px rgba(0,0,0,0.75);
      box-shadow: 10px 10px 30px -10px rgba(0,0,0,0.75);
      img {
        max-width: 35px;
      }
      &:hover {
        margin-bottom: 60px;
        transition: all 1s;
      }
    }
    .products-quantity {
      width: 20px;
      height: 20px;
      margin: -10px 0px 0px 35px;
      background-color: #dfbd00;
      line-height: 20px;
      border-radius: 50%;
    }
  }
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  background-color: #202025;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  color: #f1f1f1;
  a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    display: block;
    transition: 0.3s;
    color: #f1f1f1;
  }
  .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
    text-decoration: none;
  }
  ul {
    padding: 0px;
  }
  .icon-bag {
    @extend %font-large;
    @extend %bold;
    line-height: 44px;
    vertical-align: bottom;
    margin-bottom: 50px;
    img {
      padding-right: 10px;
    }
    span {
      @extend %bold;
      vertical-align: middle;
    }
    .products-quantity {
      width: 20px;
      height: 20px;
      font-size: 12px;
      background-color: #dfbd00;
      border-radius: 18px;
      margin-left: -30px;
      color: #000;
      display: inline-block;
      line-height: 20px;
      vertical-align: sub;
      text-align: center;
      vertical-align: sub;
      padding-bottom: 10px;
    }
  }
  .cart-list {
    max-width: 490px;
    @extend %center;
    text-align: left;
    list-style: none;
    padding: 20px;
    border-bottom: 2px solid #000;
    @extend %font-medium;
    transition: all 1s;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 3;
      background-color: #000;
      opacity: 0;
      transition: all 0.5s;
    }
    &:hover {
      &::before {
        opacity: 0.5;
      }
      p {
        text-decoration: line-through;
      }
      span {
        text-decoration: line-through;
      }
    }
    span {
      display: inline-block;
    }
    &:nth-child(1) {
      border-top: 2px solid #000;
    }
    .cart-list-image {
     padding-right: 10px;
    }
    .cart-list-details {
      vertical-align: top;
      color: #999999;
      @extend %light;
      .details-title {
        @extend %semi-bold;
        color: #fff;
        display: block;
        margin: 0px;
        .details-title-description {
          max-width: 90%;
          overflow: hidden;
        }
        .delete-item {
          float: right;
          &::after {
            content: "";
            background-image: url('../../assets/img/close.svg');
            background-size: 20px 20px;
            cursor: pointer;
            position: absolute;
            right: 5px;
            width: 20px;
            height: 20px;
          }
        }
      }
      .details-description {
        margin: 0px;
      }
      .details-line {
        .line-quantity {
          float: left;
        }
        .line-price {
          float: right;
          color: #dfbd00;
          @extend %bold;
          @extend %font-medium;
          margin-right: -10px;
        }
      }
    }
    &:hover {
      .cart-list-details {
        .details-title {
          .delete-item {
            &::after {
              content: "";
              background-image: url('../../assets/img/close-.svg');
              z-index: 4;
              transition: all 1s;
            }
          }
        }
      }
    }
  }
  .total-cart {
    max-width: 490px;
    margin: 0 auto;
    height: 100px;
    text-transform: uppercase;
    .cart-description {
      display: block;
      width: 100%;
      height: 100%;
      .cart-description-title {
        padding: 40px 0px 0px 10px;
        float: left;
        @extend %font-medium;
      }
      .cart-description-total {
        padding-top: 40px;
        float: right;
        @extend %font-large;
        color: #dfbd00;
        text-align: right;
        strong {
          @extend %bold;
        }
        em {
          display: block;
          font-size: 12px;
          color: #999999;
          font-style: normal;
        }
      }
    }
    .btn-buy-button {
      width: 490px;
      height: 50px;
      background-color: #000000;
      border:1px solid #000;
      text-align: center;
      display: block;
      margin: 0 auto;
      @extend %bold;
      text-transform: uppercase;
      transition: all 0.5s;
      &:hover {
        background-color: rgba(223,189,0,1);
        color: #000;
      }
    }
    .order-message {
      display: inline-block;
      color: #dfbd00;
      text-align: center;
      margin-top: 20px;
      @extend %regular;
      @extend %font-large;
    }
  }
}
@media screen and (max-width:500px) {
  .ajust-mobile {
    padding: 0px;
  }
  .sidenav {
    .cart-list {
      .cart-list-details {
        .details-line {
          .line-price {
            margin-right: 0px;
          }
        }
      }
    }
  }
}
</style>
