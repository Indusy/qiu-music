<script>
export default {
  name: 'search-list',
  props: {
    searches: {
      type: Array,
      default() {
        return []
      }
    },
    showDelete: {
      type: Boolean,
      default: true
    }
  },
  emits: ['select', 'delete'],
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteItem(item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<template>
  <div class="search-list">
    <transition-group name="list" tag="ul">
      <li v-for="item in searches" :key="item" class="search-item" @click="selectItem(item)">
        <span class="text">{{ item }}</span>
        <span v-if="showDelete" class="icon" @click.stop="deleteItem(item)">
          <i class="icon-Dismiss"></i>
        </span>
      </li>
    </transition-group>
  </div>
</template>

<style lang="scss" scoped>
.search-list {
  .search-item {
    color: $color-dark-4;
    font-size: 18px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
  }
}
</style>