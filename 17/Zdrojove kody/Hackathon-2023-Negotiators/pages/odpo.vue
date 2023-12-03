<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">

  <div id="container2">
    <section>
      <div class="odpoved-container">
        <h1 class="final-score">Mohlo by tě zajímat:</h1>
        <div class="summary">
          <span class="loader"></span>
        </div>
        <NuxtLink to="http://192.168.194.51:3000/quiz"><button class="buttons">Restart</button></NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>


.loader {
  width: 80px;
  height:80px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #56f0f0 #56f0f0 transparent #56f0f0;
  box-sizing: border-box;
  animation: rotation 1.5s linear infinite;
}
.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent transparent #ad33ff #ad33ff;
  width: calc(80px - 15px);
  height: calc(80px - 15px);
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotationBack 0.7s linear infinite;
  transform-origin: center center;
}
.loader::before {
  width: calc(80px - 30px);
  height: calc(80px - 30px);
  border-color: #c4c2fa #c4c2fa transparent transparent;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
.final-score{
  font-weight: bolder;
  color: #D396FDFF;
}
.summary{
  color: white;
  font-style: italic;
  margin-top: 50px;
  margin-bottom: 50px;
}
#container2{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #0a0a0a;
  margin: 0;
  padding: 0;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  font-family: 'Oxanium', sans-serif;

}

.odpoved-container {
  border-radius:20px;
  text-shadow: 1px 1px white;
  padding: 3rem;
  text-shadow: 0 1px #00000010;
  width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  border: #ffffff;

  backdrop-filter: blur(15px);
  border: 1px white solid;
}
.buttons{
  background-color: #fac2e6;
  color: #0a0a0a;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Oxanium', sans-serif;
  margin-top: 20px;
  font-size: 1.1em;
}
.buttons:hover{
  background-color: #ff33a0;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}

</style>