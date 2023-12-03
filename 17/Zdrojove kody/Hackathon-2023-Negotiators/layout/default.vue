<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">
  <header class="custom-header">
    <div class="logo">
      <img src="~/assets/images/logo.png" alt="StudyCore" style="max-width: 100px; max-height: 100px">
    </div>
    <nav class="cl-effect-5">
      <NuxtLink to = "/"><span data-hover="Home">Home</span></NuxtLink>
      <NuxtLink to ="/unichat"><span data-hover="UniChat">UniChat</span></NuxtLink>
      <NuxtLink to ="/quiz"><span data-hover="Quiz">Quiz</span></NuxtLink>
      <NuxtLink to ="/onas"><span data-hover="ONás">O Nás</span></NuxtLink>
      <NuxtLink to ="/profile" v-if="logedIn"><span data-hover="Můjprofil">Můj profil</span></NuxtLink>
    </nav>
  </header>
  <slot style="z-index: 1"/>
</template>

<style scoped>
.custom-header {
  font-family: 'Gothic A1', sans-serif;
  font-family: 'Oxanium', sans-serif;
  backdrop-filter: blur(8px);
  z-index: 2;
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-bottom: 0.5px solid;
}

.logo img {
  max-width: 100px; /* Adjust the logo size as needed */
}

.nav-links ul {
  list-style: none;
  display: flex;
  gap: 20px;
}
nav a {
  position: relative;
  display: inline-block;
  margin: 15px 25px;
  outline: none;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 400;
  text-shadow: 0 0 1px rgba(255,255,255,0.3);
  font-size: 1.35em;
}

nav a:hover,
nav a:focus {
  outline: none;
}

.cl-effect-5 a {
  overflow: hidden;
  padding: 0 4px;
  height: 1em;
}

.cl-effect-5 a span {
  position: relative;
  display: inline-block;
  -webkit-transition: -webkit-transform 0.3s;
  -moz-transition: -moz-transform 0.3s;
  transition: transform 0.3s;
}

.cl-effect-5 a span::before {
  position: absolute;
  top: 100%;
  content: attr(data-hover);
  font-weight: 700;
  -webkit-transform: translate3d(0,0,0);
  -moz-transform: translate3d(0,0,0);
  transform: translate3d(0,0,0);
}

.cl-effect-5 a:hover span,
.cl-effect-5 a:focus span {
  -webkit-transform: translateY(-100%);
  -moz-transform: translateY(-100%);
  transform: translateY(-100%);

}
.cl-effect-5 a:focus span{

  color: #ad33ff;
}
</style>

<script setup >
import StoreTest from "~/pages/StoreTest.vue";

const user = useSupabaseUser()
import { ref, computed } from "vue";

const logedIn = ref(user.value ? true : false);
</script>