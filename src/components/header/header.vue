<script setup>

</script>

<template>
  <div class="header">
    <div class="header-l">
      <span class="logo icon-box"></span>
      <h1 class="title">MusicBox</h1>
    </div>
    <div class="header-r">
      <router-link class="minemine" to="/user">
        <i class="user icon-user"></i>
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 45px;
  position: relative;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px 15px;
  z-index: 10;
  transform: translateZ(10px);
  background-color: #fff;
  background-image: linear-gradient(to right, $color-gray-2, $color-violet-1, $color-red-1, $color-green-1, $color-yellow-1);
  box-shadow: 0 1px 20px $color-transparent-1;

  .title {
    font-size: 18px;
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    color: $color-violet-10;
    text-shadow: 0 1px 1px $color-violet-2;

  }

  .logo {
    font-size: 22px;
    vertical-align: middle;
    margin-right: 6px;
    color: $color-violet-10;
  }

  .minemine {
    text-decoration: none;
    color: $color-dark-7;
  }

  .user {
    font-size: 22px;
    vertical-align: middle;
  }
}
</style>