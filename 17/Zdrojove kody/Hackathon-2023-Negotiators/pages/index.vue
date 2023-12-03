<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">
  <div id="container">
    <section id="containerTitle">

      <div id="app">
        <div id="wrapper">
          <h1 class="glitch" data-text="STUDY CORE">STUDY CORE</h1>
          <span class="submsg">By Negotiators</span>
        </div>
      </div>
    </section>
    <section id="containerFeatures">
      <div class="cardsContainer">
        <div class="box">
          <span></span>
          <div class="content">
            <h2>Kam na školu?</h2>
            <p>Nevíte, kam byste chtěli na školu? Nechte si poradit od umělé inteligence!</p>
            <NuxtLink to="/quiz"><button class="buttons">Vyzkoušet quíz</button></NuxtLink>
          </div>
        </div>

        <div class="box">
          <span></span>
          <div class="content">
            <h2>Propojte se s ostatními studenty!</h2>
            <p>Vytvořili jsme pro Vás moderní studentský portál, kde najdete studenty středních a vysokých škol po celém KráloveHradeckém kraji.</p>
            <NuxtLink to="/unichat"><button class="buttons">Připojit se</button></NuxtLink>
          </div>
        </div>

        <div class="box">
          <span></span>
          <div class="content">
            <h2>Sledujte, co se děje na ostatních školách!</h2>
            <p>Školy mají možnost přidávat různé příspěvky, které mohou zlepšit kvalitu škol.</p>
            <NuxtLink to="/nastenka-skol"><button class="buttons">Více...</button></NuxtLink>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup>

</script>

<style scoped>
#container {
  font-family: 'Gothic A1', sans-serif;
  font-family: 'Oxanium', sans-serif;
  width: 100%;
  height: 100%;
  background-color: #010101;
}

#containerTitle{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#containerFeatures {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.buttons{
  background-color: #c4c2fa;
  color: #0a0a0a;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Gothic A1', sans-serif;
  font-family: 'Oxanium', sans-serif;
  margin-top: 20px;
  font-size: 1.1em;
}
.buttons:hover{
  background-color: #ad33ff;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}


.cardsContainer{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 40px 0;
}
.cardsContainer .box{
  position: relative;
  width: 320px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px;
  transition: 0.5s;
}
.cardsContainer .box::before{
  position: absolute;
  content: "";
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
}

.cardsContainer .box::after{
  position: absolute;
  content: "";
  top: 0;
  left: 50px;
  width: 50%;
  height: 100%;
  background: #fff;
  border-radius: 8px;
  transform: skewX(15deg);
  transition: 0.5s;
  filter: blur(30px);
  transition: 0.5s;

}

.cardsContainer .box:hover::before,
.cardsContainer .box:hover::after{
  transform: skewX(0deg);
  left: 20px;;
  width: calc(100% - 90px);
}

.cardsContainer .box:nth-child(1)::before,
.cardsContainer .box:nth-child(1)::after{
  background: linear-gradient(315deg, #45ffff, #f00c8d);
}
.cardsContainer .box:nth-child(2)::before,
.cardsContainer .box:nth-child(2)::after{
  background: linear-gradient(315deg, #fc9d21, #29f25b);
}
.cardsContainer .box:nth-child(3)::before,
.cardsContainer .box:nth-child(3)::after{
  background: linear-gradient(315deg, #eb0559, #6405eb);
}

.cardsContainer .box span{
  display: block;
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  pointer-events: none;

}
.cardsContainer .box span::before{
  content:"";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  border: 8px;;
  background: rgba(255,255,255,0.1);
  opacity: 0;
  transition: 0.5s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);

}
.cardsContainer .box:hover span::before{

  top: -50px;
  left: 50px;
  width: 100px;
  height:100px;
  opacity:1;
  border-radius: 8px;

}

.cardsContainer .box span::after{
  content:"";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height:100%;
  border: 8px;;
  background: rgba(255,255,255,0.1);
  opacity: 0;
  transition: 0.5s;
  animation: animate 2s ease-in-out infinite;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  animation-delay: -1s;
  border-radius: 8px;
}
.cardsContainer .box:hover span::after{

  bottom: -50px;
  right: 50px;
  width: 100px;
  height:100px;
  opacity:1;


}


@keyframes animate{
  0%, 100%{
    transform:translateY(10px);
  }
  50%{
    transform:translateY(-10px);
  }
}
.cardsContainer .box .content{
  position: relative;
  left:0;
  padding: 20px 40px;
  background: rgba(196, 194, 250, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  z-index: 1;
  transition: 0.5s;
  color: #fff;
}
.cardsContainer .box:hover .content{
  left: -25px;
}
.cardsContainer .box .content h2{
  margin-bottom: 10px;
  line-height: 1.4em;
}
.cardsContainer .box .content NuxtLink{
  display: inline-block;

}

h1 {
  padding: 0;
  margin: 0;
  font-family: "Anurati", sans-serif;
}

#app {
  background: #0a0a0a;
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  z-index: 1;
}

#wrapper {
  text-align: center;
}

.submsg {
  color: #64dcdc;
  letter-spacing: 1em;
  font-family: "quicksand", sans-serif;
}

.submsg, .glitch{
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Our mixin positions a copy of our text
directly on our existing text, while
also setting content to the appropriate
text set in the data-text attribute. */
.glitch {
  position: relative;
  color: white;
  font-size: 4em;
  letter-spacing: 0.5em;
  /* Animation provies a slight random skew. Check bottom of doc
  for more information on how to random skew. */
  animation: glitch-skew 1s infinite linear alternate-reverse;
}
.glitch::before {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: 2px;
  text-shadow: -2px 0 #ff00c1;
  /* Creates an initial clip for our glitch. This works in
  a typical top,right,bottom,left fashion and creates a mask
  to only show a certain part of the glitch at a time. */
  clip: rect(44px, 450px, 56px, 0);
  /* Runs our glitch-anim defined below to run in a 5s loop, infinitely,
  with an alternating animation to keep things fresh. */
  animation: glitch-anim 5s infinite linear alternate-reverse;
}
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  left: -2px;
  text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
  animation: glitch-anim2 1s infinite linear alternate-reverse;
}


/* Creates an animation with 20 steaps. For each step, it calculates
a percentage for the specific step. It then generates a random clip
box to be used for the random glitch effect. Also adds a very subtle
skew to change the 'thickness' of the glitch.*/
@keyframes glitch-anim {
  0% {
    clip: rect(14px, 9999px, 50px, 0);
    transform: skew(0.71deg);
  }
  5% {
    clip: rect(34px, 9999px, 73px, 0);
    transform: skew(0.21deg);
  }
  10% {
    clip: rect(34px, 9999px, 82px, 0);
    transform: skew(0.9deg);
  }
  15% {
    clip: rect(3px, 9999px, 74px, 0);
    transform: skew(0.41deg);
  }
  20% {
    clip: rect(100px, 9999px, 54px, 0);
    transform: skew(0.52deg);
  }
  25% {
    clip: rect(74px, 9999px, 67px, 0);
    transform: skew(0.52deg);
  }
  30% {
    clip: rect(92px, 9999px, 75px, 0);
    transform: skew(0.58deg);
  }
  35% {
    clip: rect(5px, 9999px, 67px, 0);
    transform: skew(0.72deg);
  }
  40% {
    clip: rect(85px, 9999px, 14px, 0);
    transform: skew(0.73deg);
  }
  45% {
    clip: rect(60px, 9999px, 18px, 0);
    transform: skew(0.11deg);
  }
  50% {
    clip: rect(5px, 9999px, 28px, 0);
    transform: skew(0.93deg);
  }
  55% {
    clip: rect(74px, 9999px, 95px, 0);
    transform: skew(0.82deg);
  }
  60% {
    clip: rect(55px, 9999px, 6px, 0);
    transform: skew(0.52deg);
  }
  65% {
    clip: rect(92px, 9999px, 51px, 0);
    transform: skew(0.83deg);
  }
  70% {
    clip: rect(6px, 9999px, 10px, 0);
    transform: skew(0.76deg);
  }
  75% {
    clip: rect(76px, 9999px, 95px, 0);
    transform: skew(0.39deg);
  }
  80% {
    clip: rect(14px, 9999px, 41px, 0);
    transform: skew(0.43deg);
  }
  85% {
    clip: rect(43px, 9999px, 56px, 0);
    transform: skew(0.65deg);
  }
  90% {
    clip: rect(50px, 9999px, 12px, 0);
    transform: skew(0.22deg);
  }
  95% {
    clip: rect(86px, 9999px, 45px, 0);
    transform: skew(0.98deg);
  }
  100% {
    clip: rect(72px, 9999px, 100px, 0);
    transform: skew(0.03deg);
  }
}
@keyframes glitch-anim2 {
  0% {
    clip: rect(61px, 9999px, 51px, 0);
    transform: skew(0.01deg);
  }
  5% {
    clip: rect(65px, 9999px, 93px, 0);
    transform: skew(0.09deg);
  }
  10% {
    clip: rect(7px, 9999px, 90px, 0);
    transform: skew(0.88deg);
  }
  15% {
    clip: rect(49px, 9999px, 68px, 0);
    transform: skew(0.82deg);
  }
  20% {
    clip: rect(56px, 9999px, 9px, 0);
    transform: skew(0.46deg);
  }
  25% {
    clip: rect(10px, 9999px, 93px, 0);
    transform: skew(0.15deg);
  }
  30% {
    clip: rect(57px, 9999px, 36px, 0);
    transform: skew(0.84deg);
  }
  35% {
    clip: rect(83px, 9999px, 27px, 0);
    transform: skew(0.3deg);
  }
  40% {
    clip: rect(77px, 9999px, 35px, 0);
    transform: skew(0.81deg);
  }
  45% {
    clip: rect(50px, 9999px, 81px, 0);
    transform: skew(0.72deg);
  }
  50% {
    clip: rect(97px, 9999px, 4px, 0);
    transform: skew(0.86deg);
  }
  55% {
    clip: rect(34px, 9999px, 18px, 0);
    transform: skew(0.9deg);
  }
  60% {
    clip: rect(40px, 9999px, 60px, 0);
    transform: skew(0.41deg);
  }
  65% {
    clip: rect(25px, 9999px, 19px, 0);
    transform: skew(0.31deg);
  }
  70% {
    clip: rect(68px, 9999px, 61px, 0);
    transform: skew(0.74deg);
  }
  75% {
    clip: rect(33px, 9999px, 5px, 0);
    transform: skew(0.2deg);
  }
  80% {
    clip: rect(70px, 9999px, 45px, 0);
    transform: skew(0.6deg);
  }
  85% {
    clip: rect(50px, 9999px, 13px, 0);
    transform: skew(0.69deg);
  }
  90% {
    clip: rect(24px, 9999px, 55px, 0);
    transform: skew(0.6deg);
  }
  95% {
    clip: rect(25px, 9999px, 83px, 0);
    transform: skew(0.26deg);
  }
  100% {
    clip: rect(44px, 9999px, 67px, 0);
    transform: skew(0.91deg);
  }
}
@keyframes glitch-skew {
  0% {
    transform: skew(-1deg);
  }
  10% {
    transform: skew(-2deg);
  }
  20% {
    transform: skew(1deg);
  }
  30% {
    transform: skew(3deg);
  }
  40% {
    transform: skew(-2deg);
  }
  50% {
    transform: skew(-1deg);
  }
  60% {
    transform: skew(0deg);
  }
  70% {
    transform: skew(-3deg);
  }
  80% {
    transform: skew(2deg);
  }
  90% {
    transform: skew(3deg);
  }
  100% {
    transform: skew(2deg);
  }

}


</style>


