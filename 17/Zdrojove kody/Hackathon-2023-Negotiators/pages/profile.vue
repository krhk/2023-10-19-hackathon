
<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">

  <div id="container">
    <div id="html">

      <section>
        <h1>My Profile</h1>
      </section>

      <section>

        <div class="container">


          <div class="row">
            <div class="col-12 col-sm-12 col-md-6 label">
              <p><label for="fname">Jméno:</label></p><br>
              <p><label for="fname">Příjmení:</label></p><br>
              <p><label for="fname">Email:</label></p><br>
              <p><label for="fname">Škola:</label></p><br>
              <p><label for="fname">Obor:</label></p><br>
            </div>

            <div class="col-12 col-sm-12 col-md-6">
              <input class=" select" v-model="jmeno"><br><br><br>
              <input class=" select" v-model="prijmeni"> <br><br><br>
              <input class=" select" v-model="email"><br><br><br>
              <select class=" select" v-model="skola" @change="ZmenaSkoly">
                <option v-for="skola in Schools" :value="skola">{{ skola }}</option>
              </select> <br><br><br>
              <select class=" select" v-model="obor">
                <option v-for="obor in Obory" :value="obor">{{ obor }}</option>
              </select> <br>
            </div>

          </div>
          <button @click="updateProfile">Uložit</button>
          <button @click="logout" style="margin-left: 20px">Odhlásit se</button>
        </div>

      </section>

    </div>
  </div>

</template>

<script setup>
import {ref} from "vue";

const Schools = ref([])
const Obory = ref([])

const { data: schools } = await useFetch('/api/getSchools')
//console.log(schools.value.length)
for (let i = 0; i < schools.value.length; i++) {
  Schools.value.push(schools.value[i])
}

const { data: obory } = await useFetch('/api/getSubjects')
for (let i = 0; i < obory.value.length; i++) {
  Obory.value.push(obory.value[i])
}

const SkolyAObory = ref([])
async function ZmenaSkoly() {
  const { data: SkolyAObory } = await useFetch('/api/getSchoolsAndSubjects')
  // find the selected school
  const selectedSchool = SkolyAObory.value.find(school => school.nazev_organizace === skola.value)
  console.log(selectedSchool)
  // set the subjects
  Obory.value = selectedSchool.obory

}

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  await navigateTo('/');
};

const user = useSupabaseUser();
const supabase = useSupabaseClient()

const email = ref(user.value.email)
const jmeno = ref('')
const prijmeni = ref('')
const skola = ref('')
const obor = ref('')

const { data } = await supabase
    .from('profiles')
    .select(`first_name, last_name, skola, obor`)
    .eq('id', user.value.id)
    .single()

if(data) {
  jmeno.value = data.first_name
  prijmeni.value = data.last_name
  skola.value = data.skola
  obor.value = data.obor
}

async function updateProfile() {
  try {
    const user = useSupabaseUser()

    const updates = {
      id: user.value.id,
      first_name: jmeno.value,
      last_name: prijmeni.value,
      skola: skola.value,
      obor: obor.value,
    }

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal', // Don't return the value after inserting
    })
    if (error) throw error
  } catch (error) {
    alert(error.message)
  } finally {

  }
}
</script>

<style scoped>

#html{
  justify-content: center;
  align-items: center;
  align-content: center;
  border-radius:20px;
  padding: 3rem;
  color: rgba(255, 255, 255, 0.78);
  text-shadow: 0 1px #00000010;
  width: 50%;
  margin: 20rem auto;
  display: flex;
  flex-direction: column;
  height: 55vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.31);
  border: 1px rgba(255, 255, 255, 0.78) solid;
}

#container{
  width: 100%;
  height: 100%;
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
  font-family: 'Gothic A1', sans-serif;
  font-family: 'Oxanium', sans-serif;
}

img {
  max-width: 100%;
  max-height: 100%;
}

h1 {
  font-size: 50px;
  margin-top: 30px;
  margin-bottom: 20px;
}

h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

p {
  margin-top: 2px;
  font-size: 28px;
}

.container
{
  width:100%;
  padding-right:15px;
  padding-left:15px;
  margin-right:auto;
  margin-left:auto
}
@media (min-width:576px)
{
  .container{max-width:540px}
}@media (min-width:768px)
{
  .container{max-width:720px}
}
@media (min-width:992px)
{
  .container{max-width:960px}
}
@media (min-width:1200px)
{
  .container{max-width:1140px}
}
@media (min-width:1500px)
{
  .container{max-width:1400px}
}
@media (min-width:1800px)
{
  .container{max-width:1600px}
}

.row{
  display:-ms-flexbox;
  display:flex;
  -ms-flex-wrap:wrap;
  flex-wrap:wrap;
  margin-right:-15px;
  margin-left:-15px
}

.col-12{
  -ms-flex:0 0 100%;
  flex:0 0 100%;
  max-width:100%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-sm-12{
  -ms-flex:0 0 100%;
  flex:0 0 100%;
  max-width:100%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.col-md-6{
  max-width:50%;
  position:relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.label{
  -ms-flex:0 0 25%;
  flex:0 0 25%;
  max-width:100%;
  position: relative;
  width:100%;
  padding-right:15px;
  padding-left:15px
}

.select{
  width: 100%;
  -ms-flex:0 0 75%;
  flex:0 0 75%;
  position:relative;
  padding-right:15px;
  padding-left:15px
}
@media (min-width:576px)
{
  .select{max-width:540px}
}@media (min-width:768px)
{
  .select{max-width:720px}
}
@media (min-width:992px)
{
  .select{max-width:960px}
}
@media (min-width:1200px)
{
  .select{max-width:1140px}
}
@media (min-width:1500px)
{
  .select{max-width:1400px}
}
@media (min-width:1800px)
{
  .select{max-width:1600px}
}

a{
  font-size: 20px;
  color: #c4c2fa;
  text-decoration:none;
  background-color:transparent
}
a:hover{
  font-size: 19px;
  color: #ad33ff;
  text-decoration: none
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
button:hover{
  background-color: #ad33ff;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}

button{
  background-color: #c4c2fa;
}


</style>