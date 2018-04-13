<template>
  <div class="row">
    <div id="mySidenav" class="sidenav">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()">&times;</a>
      <ul>
        <li v-for="item in list" :key="item.id">
          {{item.product_id}}
          {{item.product_title}}
          {{item.product_price}}
        </li>
      </ul>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <span style="font-size:30px;cursor:pointer" v-on:click="openNav()">&#9776; open</span>
  </div>
</template>

<script>
export default {
  props: ['prop'],
  data() {
    return {
      list: this.prop,
    };
  },
  methods: {
    openNav() {
      document.getElementById('mySidenav').style.width = '100%';
      console.log(this.prop);
    },
    closeNav() {
      document.getElementById('mySidenav').style.width = '0';
    },
  },
};
</script>

<style>
.sidenav {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #111;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
}
.sidenav a {
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}
.sidenav a:hover {
    color: #f1f1f1;
}
.sidenav .closebtn {
    position: absolute;
    top: 0;
    right: 25px;
    font-size: 36px;
    margin-left: 50px;
}
</style>
