<template>
    <div class="container">
      <div class="row" v-for="produto in produtos" :key="produto.id">
        <div class="col-xs-6 col-md-4 col-lg-4 item-list" v-for="item in produto" :key="item.id">
          <a href="javascript:void(0)">
            <img src="@/assets/img/img1.jpg" alt="Imagem 1"></a>
            <span class="title-description">{{ item.title }}</span>
            <span class="item-price"><strong> {{item.currencyFormat}}</strong></span>
            <span class="card-payment" v-on="calcCard(item.price,item.installments)">ou x {{priceInstall}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import products from '@/assets/helper/products.json';

export default {
  data() {
    return {
      produtos: products,
      price: null,
      itemInstall: null,
      priceInstall: 0,
    };
  },
  methods: {
    calcCard(price, parc) {
      this.price = price;
      this.itemInstall = parc;
      this.priceInstall = this.price / this.itemInstall;
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
    }
  }
  .item-price {
    strong {
      font-family: 'open_sansextrabold';
    }
    @extend %font-large;
  }
}
</style>
