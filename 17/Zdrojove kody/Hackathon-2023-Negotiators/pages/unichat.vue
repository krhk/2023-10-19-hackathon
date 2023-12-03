<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">

  <div id="container">
    <section id="chatContainer">


      <div class="tenBorder">
        <div class="menuChat">
          <!-- List of people to chat with -->
          <ul>
            <li class="skola">školní Groub Chat</li>
            <li>group chat oborů</li>
            <li>Vašek</li>
            <li>...</li>
            <li>..</li>
            <li>.</li>
            <!-- Add more list items as needed -->
          </ul>
        </div>

      </div>

      <div class="tenBorder">
        <div class="chat">
          <div class="chatHeader">
            <h3>Group Chat</h3>
          </div>
          <div class="messageContainer">
            <!-- Message div -->
            <div class="message received">Ahoj, máš chvíli? Hledám nějakou dobrou školu s oborem IT, a nevím, kam jít.</div>
            <div class="message sent">Určitě, rád ti poradím! Co tě zajímá?</div>
            <div class="message received">Hledám něco v oblasti kybernetické bezpečnosti, takže nejen IT, ale taky ochrana dat a sítí.</div>
            <div class="message sent">Mám pro tebe tip! Co třeba Kybernetická Bezpečnost ve Dvoře Králové nad Labem? Slyšel jsem, že mají vynikající program.</div>
            <div class="message received">To zní skvěle. Máš nějaké další informace o té škole?</div>
            <div class="message sent">Ano, mají skvělé hodnocení a spoustu partnerských firem, takže studenti mají přístup k praktickým zkušenostem. A navíc mají skvělý tým učitelů v oblasti kybernetické bezpečnosti a další.</div>
            <div class="message received">To zní opravdu dobře. Díky za tip, určitě si o té škole přečtu více!</div>
            <div class="message sent">Není zač! Pokud budeš mít další otázky, klidně se ptej. Hodně štěstí při hledání vhodné školy!</div>

            <!-- Add more messages as needed -->
          </div>
          <div class="chatInput">
            <input id="inputText" type="text" placeholder="Type your message...">
            <button class="buttons">Send</button>
          </div>
        </div>

      </div>

    </section>
  </div>

</template>

<script setup>

</script>

<style scoped>
#inputText {

  padding: 0;
  margin-top: 20px;

  letter-spacing: 0.025em;
  border: none;
  background: transparent;
  text-align: center;
  outline: none;
  color: #ffffff;
  border-bottom: solid thin rgba(238, 238, 238, 0.12);
}

.skola{
  color: #916ed9;
}

#container{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  font-family: 'Oxanium', sans-serif;
}

#chatContainer{
  display: flex;
  margin-top: 85px;

  justify-content: center;
  align-items: center;
}

.tenBorder {
  flex: 1;
  border-radius:20px;
  padding: 3rem;
  text-shadow: 0 1px #00000010;
  margin: 8rem auto;
  border: #ffffff;
  backdrop-filter: blur(8px);
  border: 1px white solid;
}
.chat{
  height: 65vh;
  width: 80vh;

}
.menuChat{
  height: 65vh;
  width: 20vh;

}

.tenBorder:first-child{
  margin-right: 20px;
}
.menuChat ul {
  list-style: none;
  padding: 0;
}

.menuChat li {
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
  /* Add any additional styling you prefer for each list item */
}
.chatHeader {
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.messageContainer {
  margin: 10px 0;
  padding: 10px;
  height: 50vh;
  max-height: 50vh; /* Set a maximum height for the container */
  overflow-y: auto;
}

.message {
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  max-width: 70%;
  word-wrap: break-word;

}

.received {
  color: #73faf8;

  align-self: flex-start;
}

.sent {
  color: #d496fd;

  align-self: flex-end;
}

.chatInput {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 10px;
}

.chatInput input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
}


.buttons{
  background-color: #d496fd;
  color: #0a0a0a;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Oxanium', sans-serif;
  margin-left: 20px;
  margin-top: 20px;
  font-size: 1.1em;
}
.buttons:hover{
  background-color: #ad33ff;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}

</style>