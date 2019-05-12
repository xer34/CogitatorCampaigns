<template>
  <div class="add-campaign container">
    <h2 class="center-align white-text">Add A Recent Game</h2>
    <form @submit.prevent="AddGame()">
      <div class="field title">
        <label for="title">Title</label>
        <input class="white-text" type="text" name="title" v-model="title">
      </div>
      <div v-for="(fac, index) in faction" :key="index" class="white-text">
        <label for="factions">Factions</label>
        <input class="white-text" type="text" name="factions" v-model="faction[index]">
      </div>
      <div class="field add-faction"></div>
      <label for="add-faction">Add a Faction</label>
      <input
        class="white-text"
        type="text"
        name="add-faction"
        @keydown.tab.prevent="addFac"
        v-model="another"
      >

        <!-- Dropdown Trigger -->
  <a class='dropdown-trigger btn' href='#' data-target='dropdown1'>Drop Me!</a>

  <!-- Dropdown Structure -->
  <ul id='dropdown1' class='dropdown-content'>
    <li><a href="#!">one</a></li>
    <li><a href="#!">two</a></li>
    <li class="divider" tabindex="-1"></li>
    <li><a href="#!">three</a></li>
    <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
    <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
  </ul>
  
    </form>
    <div class="field center-align">
      <p v-if="feedback" class="red-text">{{ feedback }}</p>
      <button class="btn grey">Add Game</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCampaign",
  data() {
    return {
      title: null,
      another: null,
      faction: [],
      feedback: null
    };
  },
  methods: {
    AddGame() {
      console.log(this.title, this.factions);
    },
    addFac() {
      if (this.another) {
        this.faction.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.faction);
      } else {
        this.feedback = "Please Enter a Faction";
      }
    }
  }
};
</script>

<style>
html {
  background-image: url("../assets/tilebackground.png");
}
.add-campaign {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-campaign title {
  font-size: 2em;
  margin: 20px auto;
}
add-campaign .field {
  margin: 20px auto left right;
}
</style>
