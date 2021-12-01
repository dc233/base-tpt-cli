<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'

const store = useStore(key)

const count = computed(() => store.state.count)
</script>

<template>
  <div>home</div>
  <div>{{ count }}</div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
