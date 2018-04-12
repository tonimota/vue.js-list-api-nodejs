<template>
    <div class="container">
      <div class="row" v-for="produto in produtos" :key="produto.id">
        <div class="col-xs-6 col-md-4 col-lg-4 item-list" v-for="item in produto" :key="item.id">
          <a href="javascript:void(0)">
            <img src="@/assets/img/img1.jpg" alt="Imagem 1"></a>
            <span class="title-description">{{ item.title }}</span>
            <span class="item-price"><strong>{{item.price}}</strong></span>
            <span class="card-payment">{{item.installments}}</span>
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
    };
  },
};
</script>

<style lang="scss">
.item-list {
  a {
    display: inline-block;
    img {
    }
  }
  span {
    display: block;
  }
}
</style>
