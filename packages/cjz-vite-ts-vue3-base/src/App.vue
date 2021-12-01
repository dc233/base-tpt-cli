<script setup lang="ts">
import { useStore } from 'vuex'
import { key } from './store'
const store = useStore(key)
import { getCount } from './request/apis/common'
import { $awaitHttpRequest } from './utils/myAwaitFunction'
import { addAsyncRoutes } from '@/router'
import { ref } from 'vue'

// 测试vuex
function handleClickIncrement() {
  store.commit('increment')
}

// 测试router
addAsyncRoutes(['user', 'home'])

let num = ref(undefined)

function getNum() {
  $awaitHttpRequest({
    pro: getCount,
    success(res: any) {
      num.value = res.data
    },
  })
}
getNum()
</script>

<template>
  <h1>{{ num }}</h1>

  <button @click="handleClickIncrement">累加</button>
  <router-link to="/login"> login </router-link>
  <router-link to="/home"> home </router-link>
  <router-link to="/user"> user </router-link>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .flexColumnCenter();
}
</style>
