<script>
  import { debounce } from '@/assets/js/util'

  export default {
    name: 'search-input',
    props: {
      modelValue: String,
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: this.modelValue
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('update:modelValue', newQuery.trim())
      }))

      this.$watch('modelValue', (newVal) => {
        this.query = newVal
      })
    },
    methods: {
      clear() {
        this.query = ''
      }
    }
  }
</script>

<template>
  <div class="search-input">
    <i class="icon-sousuo"></i>
    <input v-model="query" :placeholder="placeholder" type="text" class="input-inner">
    <i v-show="query" @click="clear" class="icon-dismiss icon-close-circle"></i>
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  box-sizing: border-box;
  position: relative;

  .icon-sousuo {
    position: absolute;
    left: 10px;
    color: $color-dark-5;
    font-size: 20px;
    display: inline-block;
    width: 30px;
    height: 40px;
    line-height: 40px;
  }
  .input-inner {
    border: 0;
    color: $color-dark-6;
    background-image: $bg-image-l;
    border-radius: 10px;
    height: 40px;
    width: 100%;
    padding: 0 40px;
    box-shadow: 0 0 10px $color-gray-4;
    box-sizing: border-box;
    font-size: 14px;
    
    &:focus {
      outline: 2px solid $color-violet-3;
    }
  }

  .icon-dismiss {
    position: absolute;
    right: 10px;
    top: calc(50% - 10px);
    color: $color-dark-5;
    font-size: 20px;
    text-align: right;
  }
}
</style>
