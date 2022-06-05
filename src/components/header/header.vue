<script setup>

</script>

<template>
  <div class="header">
    <div class="header-l">
      <span class="logo icon-box"></span>
    <h1 class="title">MusicBox</h1>
    </div>
    <div class="header-r">
      <span class="user icon-user"></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 45px;
  border-bottom: 0.5px solid $color-gray-4;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  box-sizing: border-box;
  padding: 10px 15px;

  .title {
    font-size: 18rem;
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    color: $color-violet-10;
  }

  .logo {
    font-size: 22rem;
    vertical-align: middle;
    margin-right: 6px;
    color: $color-violet-10;
  }

  .user {
    font-size: 22rem;
    vertical-align: middle;
  }
}
</style>