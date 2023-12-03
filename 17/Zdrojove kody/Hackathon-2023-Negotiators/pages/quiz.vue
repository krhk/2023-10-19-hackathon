<template>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">
  <div id="container">
    <section>

      <div class="quiz-container" v-if="!IsQuizAnswered">
        <div class="title">Kam na školu s AI</div>
        <div id="question" class="question"></div>
        <label class="option">
          <input type="radio" name="option" value="1" />
          <span class="option1"></span>
        </label>
        <label class="option">
          <input type="radio" name="option" value="2" />
          <span class="option2"></span>
        </label>
        <label class="option">
          <input type="radio" name="option" value="3" />
          <span class="option3"></span>
        </label>
        <label class="option">
          <input type="radio" name="option" value="4" />
          <span class="option4"></span>
        </label>
        <label class="option">
          <input type="radio" name="option" value="5" />
          <span class="option5"></span>
        </label>
        <label class="option">
          <input type="radio" name="option" value="6" />
          <span class="option6"></span>
        </label>
        <!-- Buttons -->
        <div class="controls">
          <button class="previous">Previous</button>
          <button class="next">Next</button>
        </div>
      </div>

      <div id="container2" v-else>
        <section>
          <div class="odpoved-container">
            <h1 class="final-score">Mohlo by tě zajímat:</h1>
            <div class="summary" v-if="!IsAIGenerating">
              {{AnswerFromBot}}
            </div>
            <div class="summary" v-else>
              <span class="loader"></span>
            </div>
            <NuxtLink to="http://192.168.194.51:3000/quiz"><button class="buttons">Restart</button></NuxtLink>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup>
const { chat } = useChatgpt()
const { chatCompletion } = useChatgpt()


import { onMounted, ref } from 'vue';

//get predmety from /api/getSubjects
const subjects = ref([])
const QuestionsAndAnswers = ref({});
const IsAIGenerating = ref(false)


const IsQuizAnswered = ref(false);

const message = ref('')
const AnswerFromBot = ref("Answer");
async function sendMessage() {
  IsAIGenerating.value = true
  const response = await chatCompletion(message.value, 'gpt-3.5-turbo-0301')
  AnswerFromBot.value = response
  console.log('Odpověď z chatbota: ')
  console.log(response)

  const lastWord0 = AnswerFromBot.value.split("(").pop()
  //remove any brackets from the last word
  const lastWord = lastWord0.replace(/[()]/g, '')

  console.log(lastWord)
  IsAIGenerating.value = false

  const Schools = ref([])
  const { data: schools } = await useFetch('/api/getSchoolsAndSubjects')
  Schools.value = schools
  console.log(Schools.value)

  // filter only the schools that have the last word in their subjects
  const filteredSchools = ref([])

  /*
  for (let i = 0; i < Schools.value.length; i++) {
    if (Schools[i].obory.includes(lastWord)) {
      filteredSchools.value.push(Schools[i])
    }
  }
*/
  console.log(Schools[1].obory)
  console.log(filteredSchools)
}

onMounted(() => {
// QUESTIONS

  const questions = [
    {
      "question": "V Jakém okresu by jsi radši studoval/la?",
      "answer1": "Hradec Králové",
      "answer1Total": "1",
      "answer2": "Jičín",
      "answer2Total": "2",
      "answer3": "Náchod",
      "answer3Total": "3",
      "answer4": "Rychnov nad Kněžnou",
      "answer4Total": "4",
      "answer5": "Trutnov",
      "answer5Total": "5",
      "answer6": "Nepreferuji žádný okres",
      "answer6Total": "6"
    },
    {
      "question": "Jaké jsou vaše zájmy a koníčky?",
      "answer1": "Sport a fyzická aktivita",
      "answer1Total": "1",
      "answer2": "Umění a kreativita",
      "answer2Total": "2",
      "answer3": "Vědecký výzkum",
      "answer3Total": "3",
      "answer4": "Technologie a počítače",
      "answer4Total": "4",
      "answer5": "Společenské vztahy a komunikace",
      "answer5Total": "5",
      "answer6": "Nemám žádné zájmy nebo koníčky",
      "answer6Total": "6"
    },
    {
      "question": "Co vás baví dělat ve svém volném čase?",
      "answer1": "Čtení knih a literatury",
      "answer1Total": "1",
      "answer2": "Cestování a poznávání nových kultur",
      "answer2Total": "2",
      "answer3": "Stavění vlastních projektů nebo výrobků",
      "answer3Total": "3",
      "answer4": "Pomáhání druhým a dobrovolnictví",
      "answer4Total": "4",
      "answer5": "Hraní videoher nebo jiné vnitřní aktivity",
      "answer5Total": "5",
      "answer6": "Sportovní aktivity",
      "answer6Total": "6"
    },
    {
      "question": "Máte nějaké oblíbené předměty, které vás zajímají?",
      "answer1": "Historie a sociální vědy",
      "answer1Total": "1",
      "answer2": "Umělecká a výtvarná tvořivost",
      "answer2Total": "2",
      "answer3": "Matematika a fyzika",
      "answer3Total": "3",
      "answer4": "Informatika a programování",
      "answer4Total": "4",
      "answer5": "Cizí jazyky a komunikace",
      "answer5Total": "5",
      "answer6": "Nemám oblíbené předměty",
      "answer6Total": "6"
    },
    {
      "question": "Jaký máte vztah k matematice?",
      "answer1": "Matematika je moje vášeň",
      "answer1Total": "1",
      "answer2": "Matematika mě baví, ale nejde mi",
      "answer2Total": "2",
      "answer3": "Matematika mi moc nejde a nebaví mě",
      "answer3Total": "3",
      "answer4": "Nesnáším vědu a vše s ní společné",
      "answer4Total": "4",
      "answer5": "Zajímá mě matematika i věda",
      "answer5Total": "5",
      "answer6": "Nevím jaký mám vztah k matematice",
      "answer6Total": "6"
    },
    {
      "question": "Myslíte si, že byste chtěli pracovat s lidmi nebo spíše samostatně?",
      "answer1": " Rád/a pracuji v týmu a komunikuji s lidmi",
      "answer1Total": "1",
      "answer2": "Preferuji práci na vlastní pěst",
      "answer2Total": "2",
      "answer3": "Mám rád/a rovnováhu mezi oběma",
      "answer3Total": "3",
      "answer4": "Záleží na konkrétní situaci",
      "answer4Total": "4",
      "answer5": "Závisí na tom, co mi bude nejvíce vyhovovat",
      "answer5Total": "5",
      "answer6": "Nevím",
      "answer6Total": "6"
    },
    {
      "question": "Máte zájem o studium na plný úvazek nebo byste preferovali kombinaci studia a práce?",
      "answer1": "Chci se plně věnovat studiu",
      "answer1Total": "1",
      "answer2": "Myslím si, že bych měl/a pracovat a studovat současně",
      "answer2Total": "2",
      "answer3": "Záleží na finančních možnostech",
      "answer3Total": "3",
      "answer4": "Rád/a bych měl/a praxi během studia",
      "answer4Total": "4",
      "answer5": "Chci pracovat a studovat flexibilně",
      "answer5Total": "5",
      "answer6": "Je mi to jedno",
      "answer6Total": "6"
    },
    {
      "question": "Jaká je vaše tolerance vůči stresu a pracovnímu tlaku?",
      "answer1": "Jsem odolný/á vůči stresu a tlaku",
      "answer1Total": "1",
      "answer2": "Stres mi vadí, raději ho minimalizuji",
      "answer2Total": "2",
      "answer3": "Stres mě nijak zvlášť neovlivňuje",
      "answer3Total": "3",
      "answer4": "Záleží na situaci, občas jsem stresován/á",
      "answer4Total": "4",
      "answer5": "Mám tendenci podléhat stresu a tlaku",
      "answer5Total": "5",
      "answer6": "Nevím",
      "answer6Total": "6"
    }

  ]


  let currentQuestion = 0;
  let score = [];
  let selectedAnswersData = [];

  const totalQuestions =questions.length;



  const container = document.querySelector('.quiz-container');
  const questionEl = document.querySelector('.question');
  const option1 = document.querySelector('.option1');
  const option2 = document.querySelector('.option2');
  const option3 = document.querySelector('.option3');
  const option4 = document.querySelector('.option4');
  const option5 = document.querySelector('.option5');
  const option6 = document.querySelector('.option6');
  const nextButton = document.querySelector('.next');
  const previousButton = document.querySelector('.previous');
  const restartButton = document.querySelector('.restart');


//Function to generate question
  function generateQuestions (index) {
    //Select each question by passing it a particular index
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
    const option4Total = questions[index].answer4Total;
    const option5Total = questions[index].answer5Total;
    const option6Total = questions[index].answer6Total;
    //Populate html elements
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option4.setAttribute('data-total', `${option4Total}`);
    option5.setAttribute('data-total', `${option5Total}`);
    option6.setAttribute('data-total', `${option6Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
    option4.innerHTML = `${question.answer4}`
    option5.innerHTML = `${question.answer5}`
    option6.innerHTML = `${question.answer6}`
  }


  async function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    //Check if there is a radio input checked
    if(!selectedOption) {
      alert('Please select your answer!');
      return;
    }
    //Get value of selected radio
    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

    //Save the question and answer to QuestionsAndAnswers
    QuestionsAndAnswers.value = QuestionsAndAnswers.value + ' ' + (currentQuestion + 1) + '. ' + questions[currentQuestion].question + ' ' + selectedOption.nextElementSibling.innerHTML + ' ';

    ////Add the answer score to the score array
    score.push(answerScore);

    selectedAnswersData.push()


    const totalScore = score.reduce((total, currentNum) => total + currentNum);

    //Finally we incement the current question number ( to be used as the index for each array)
    currentQuestion++;

    //once finished clear checked
    selectedOption.checked = false;
    //If quiz is on the final question
    if(currentQuestion == totalQuestions - 1) {
      nextButton.textContent = 'Finish';

    }
    if(currentQuestion == totalQuestions) {
      IsQuizAnswered.value = true;

      const { data: subjectsFromAPI } = await useFetch('/api/getSubjects')
      subjects.value = subjectsFromAPI
      //console.log(subjectsFromAPI)

      message.value = 'Tvůj úkol je pomoci žákum vybrat obor, kteří budou studovat. Podle těchto odpovědí {'+QuestionsAndAnswers.value+'} doporuč jeden z těchto oborů: {'+subjectsFromAPI.value+'}. Napiš nějaké informace o tomto oboru, jaké předměty může studovat na tomto oboru, co by žák od tohoto oboru měl očekávat, jaké je uplatnění tohoto oboru a v jakých profesích může tento obor využít. Také detailně napiš na základě jakých odpovědí jsi vybral tento obor. Nakonec udělej volný řádek a napiš do závorky jméno vybraného oboru.'

      sendMessage()

      console.log('Poslán request na chatbot')
      console.log(message.value)

      // get the last word in the message

    }
    generateQuestions(currentQuestion);
    //If the quiz is finished then we hide the questions container and show the results
    if(IsQuizAnswered.value == true){
      AnswerFromBot.value = "funnguje";
    }

  }

//Function to load previous question
  function loadPreviousQuestion() {
    //Decrement quentions index
    currentQuestion--;
    //remove last array value;
    score.pop();
    //Generate the question
    generateQuestions(currentQuestion);
  }

//Fuction to reset and restart the quiz;
  function restartQuiz(e) {
    if(e.target.matches('button')) {
      //reset array index and score
      currentQuestion = 0;
      score = [];
      //Reload quiz to the start
      location.reload();
    }

  }


  generateQuestions(currentQuestion);
  nextButton.addEventListener('click', loadNextQuestion);
  previousButton.addEventListener('click',loadPreviousQuestion);


});
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
  color: #D396FD;
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

#container{
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

.quiz-container {
  border-radius:20px;
  text-shadow: 1px 1px white;
  padding: 3rem;
  text-shadow: 0 1px #00000010;
  width: 80%;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  border: #ffffff;
  height: 70vh;
  backdrop-filter: blur(15px);
  border: 1px white solid;


}

.title {
  margin-top: 0;
  margin-bottom: 3rem;
  color: #D396FDFF;
  font-weight:bold;
  font-weight: 400;
  font-size: 3rem;
  letter-spacing:4px;
  text-align: center;
  text-transform: uppercase;
}
.question {
  margin: 2rem 0;
  font-size: 1.5rem;
  color:#D396FDFF;
  text-transform:uppercase;
  letter-spacing:1px;
}
.option {
  padding: 1rem;
  color: #fff;

  width: 80%;
  border-radius: 5px;
  transition: all 0.3s;
}
.option:hover {
  background: rgba(255, 255, 255, 0.56);
}
.option input:checked .option {
  background: #08038c;
  color: #000;
}
.controls > * {
  margin: 1rem;
}
.buttons{
  background-color: #fac2e6;
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
  background-color: #ff33a0;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}
button{

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
button.previous:hover{
  background-color: #ad33ff;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}

button.previous {
  background-color: #c4c2fa;
}
button.next:hover{
  background-color: #04c46e;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}
button.next {
  background: #c2fae5;
}
button.restart {
  background: #0cf574;
  color: #00000050;
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: all 0.4s;
}
button.restart:hover {
  color: #00000098;
}
button:hover,
button:focus {
  transform: scale(1);
  font-weight: 500;
  box-shadow: 1px 1px 1px rgba(255, 255, 255, 0.5);
}



</style>