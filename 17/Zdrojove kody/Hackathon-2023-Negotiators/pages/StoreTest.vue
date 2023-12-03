<template>
  <div>
    <h1>Store Test</h1>
    <h2>{{counter.count}}</h2>
    <button @click="counter.increment()">Increment</button>

  </div>
</template>

<script setup>
/*
import { useCounterStore } from '@/stores/counter.ts'
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import App from "~/app.vue";
import {piniaInstance} from "~/global.ts";

const pinia = piniaInstance
const app = createApp(App)
app.use(pinia)

const counter = useCounterStore()


*/
</script>

<style lang="scss" scoped>

</style>