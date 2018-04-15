<template>
  <div class="row">
    <div id="mySidenav" class="sidenav">
      <a href="#" class="closebtn" @click.prevent="closeNav()">&times;</a>
      <div class="col-md-6 col-lg-4 col-sm-12 col-md-offse-md-3 col-lg-offset-4">
        <div class="icon-bag">
          <img src="@/assets/img/bag.png" alt="">
          <p class="products-quantity">{{total}}</p>
          <span class="title-section">SACOLA</span>
        </div>
        <ul>
          <li class="cart-list" v-for="(item, index) in cart" :key="`item-${index}`">
            <div class="row">
              <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <span class="cart-list-image">
                  <img src="@/assets/img/img-icon.png" alt="">
                </span>
              </div>
              <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                <div class="cart-list-details">
                  <p class="details-title">{{ item.title }}
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
      </div>
    </div>
    <div class="icon-cart">
        <div class="icon-title" @click="openNav(),calcTotalItens()">
          <span>
            <img src="@/assets/img/buy2.png" />
          </span>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      require: true,
    },
  },
  mounted() {
  },
  data() {
    return {
      total: 0,
    };
  },
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '100%';
      document.getElementById('mySidenav').style.opacity = '1';
      // eslint-disable
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('mySidenav').style.opacity = '0';
    },
    calcTotalItens() {
      this.total = 0;
      this.cart.forEach((index) => {
        this.total = this.total + index.quantity;
      });
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
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/style/scss/_variables.scss";
.icon-cart {
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  .icon-title {
    display: block;
    span {
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
  }
  ul {
    padding: 0px;
  }
  .icon-bag {
    @extend %font-large;
    font-family: 'OpenSans-Bold';
    line-height: 44px;
    vertical-align: bottom;
    img {
      padding-right: 10px;
    }
    span {
      vertical-align: middle;
    }
    .products-quantity {
      width: 20px;
      height: 20px;
      font-size: 12px;
      background-color: yellow;
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
    height: 100px;
    @extend %center;
    text-align: left;
    list-style: none;
    padding: 20px;
    border-bottom: 2px solid #000;
    @extend %font-medium;
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
      font-family: 'open_sanslight';
      .details-title {
        font-family: 'open_sanssemibold';
        color: #fff;
        display: block;
        margin: 0px;
        .delete-item {
          float: right;
          &::after {
            content: "";
            background-image: url('../../assets/img/close.svg');
            background-size: 20px 20px;
            cursor: pointer;
            position: absolute;
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
          font-family: 'OpenSans-Bold';
          @extend %font-medium;
          margin-right: -20px;
        }
      }
    }
  }
}
</style>
