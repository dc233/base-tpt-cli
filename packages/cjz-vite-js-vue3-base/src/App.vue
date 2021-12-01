<script setup>
import { ref } from 'vue'
import { getCount } from './request/apis/common'
import { addAsyncRoutes } from '@/router'
import { $awaitHttpRequest } from './utils/myAwaitFunction'

let num = ref(undefined)

// 测试router
addAsyncRoutes(['user', 'home'])

function getNum() {
  $awaitHttpRequest(getCount, {
    success(res) {
      num.value = res.data
    }
  })
}
getNum()
</script>

<template>
  <h1>{{ num }}</h1>
  <router-link to="/login">login</router-link>
  <router-link to="/home" @click="getNum">home</router-link>
  <router-link to="/user" @click="() => (num = 2)">user</router-link>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
