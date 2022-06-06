<script setup>

</script>

<template>
  <div class="footer">
    <nav class="nav">
      <router-link to="/recommend" class="nav-item">
        <span class="icon-home icon"></span>
      </router-link>
      <router-link to="/singer" class="nav-item">
        <span class="icon-tinggeshiqu icon"></span>
      </router-link>
      <router-link to="/top-list" class="nav-item">
        <span class="icon-shunxubofang icon"></span>
      </router-link>
            <router-link to="/search" class="nav-item">
        <span class="icon-sousuo icon"></span>

      </router-link>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  .footer {
    position: fixed;
    border-top: 0.5px solid $color-gray-4;
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: $color-gray-1;
    backdrop-filter: blur(2px);
    z-index: 10;
  }

  .nav {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
  }

  .nav-item {
    color: $color-gray-7;
    text-decoration: none;
  }

  .router-link-active {
    color: $color-violet-10;
    text-decoration: none;
  }

  .icon {
    font-size: 28px;
  }
</style>