<template>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <title>Login</title>
  </head>


  <section>
    <div class="login-container">
      <h2>Login</h2>

      <form>
        <div class="input-box">
            <span class="icon">
              <i class="fa-solid fa-envelope"></i>
            </span>

          <input required type="text" id="email">
          <label for="email">Enter your email</label>
        </div>

        <div class="input-box">
            <span class="icon">
              <i class="fa-solid fa-lock"></i>
            </span>

          <input required type="password" id="contraseña">
          <label for="contraseña">Enter your password</label>
        </div>

        <div class="remember-forgot">
          <label>
            <input type="checkbox"> Remember me
          </label>

          <a href="#">Forgot the password</a>

        </div>

        <button class="buttonh" type="submit">Log in</button>

      </form>

      <button @click="auth.signInWithOAuth({ provider: 'github', options: { redirectTo } })">Log in with Github</button>
      <button class="btn" @click="auth.signInWithOAuth({ provider: 'google', options: { redirectTo } })">Log in with Google</button>
      <div class="remember-forgot">
        <a href="#">Create an account</a>

      </div>
    </div>

  </section>

</template>

<script setup lang="ts">
import {router} from "websocket";

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const { auth } = useSupabaseClient()

const redirectTo = `${useRuntimeConfig().public.baseUrl}  /confirm`

watchEffect(() => {
  if (user.value) {
    navigateTo('/confirm')
  }
})
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;800&display=swap');

*,
*::after,
*::before {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
}

a {
  text-decoration: none;
  color: white;
}

a::after {
  content: "";
}

a:hover::after {
  display: block;
  border: 1px solid white;
  animation: under-line .5s ease-in-out 1;
}

@keyframes under-line {
  0% {
    width: 0%;
  }

  100% {
    width: 100%;
  }
}

section {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url(https://media3.giphy.com/media/7VzgMsB6FLCilwS30v/giphy.gif?cid=ecf05e475npw2j9jkefvol8fr77baymki8c6p5hruocc44f4&ep=v1_gifs_related&rid=giphy.gif&ct=g);
  background-size: cover;
  color: #fff;
}

.login-container {
  height: 550px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  backdrop-filter: blur(5px);
  border: 1px white solid;
  border-radius: 20px;
}

h2 {
  font-size: 1.75em;
  margin: 0 0 20px;
  filter: drop-shadow(0 6px 2px black);
}

.input-box {
  position: relative;
  border-bottom: 2px solid white;
  margin: 30px 0;
  width: 310px;
}

.input-box label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1em;
  transition: .5s;
}

.input-box input:valid ~ label,
.input-box input:focus ~ label {
  top: -5px;
}

.input-box input {
  background: transparent;
  border: none;
  outline: none;
  color: white;
  width: 100%;
  height: 50px;
  font-size: 1em;
  padding: 0 40px 0 5px;
}

.input-box .icon {
  position: absolute;
  right: 8px;
  font-size: 1.4em;
  line-height: 45px;
}

.remember-forgot {
  display: grid;
  margin-bottom: 20px;
  grid-row-gap: 10px;
  justify-content: center;
  width: 310px;

}

button{
  height: 40px;
  width: 310px;
  border-radius: 20px;
  margin: 0 0 10px;
  outline: none;
  border: none;
  background: white;
  color: black;
  transition: .3s;
}

button:hover {
  background-color: rgba(255, 255, 255, .8);
}

.create-account {
  margin: 12px 0 0 0;
}

@media screen and (max-width: 360px) {
  .login-container {
    width: 100%;
    height: 100vh;
    border: none;
  }
}

/*.btn {
  background: image('assets/Images/google.png');
  height: 40px;
  width: 310px;
  border-radius: 20px;
  margin: 0 0 10px;
  outline: none;
  border: none;
  color: black;
  transition: .3s;
}
 */


</style>
