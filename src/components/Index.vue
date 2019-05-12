<template>
  <div class="index container">
    <div class="card" v-for="game in games" :key="game.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deletegame(game.id)">delete</i>
        <h2 class="indigo-text">{{ game.title }}</h2>
        <ul class="factions">
          <li v-for="(fac, index) in game.factions" :key="index">
            <span class="chip">{{ fac }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "Index",
  data() {
    return {
      games: []
    };
  },
  methods: {
    deletegame(id) {
      db.collection("games")
        .doc(id)
        .delete()
        .then(() => {
          this.games = this.games.filter(game => {
            return game.id != id;
          });
        });
    }
  },
  created() {
    db.collection("games")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let game = doc.data();
          game.id = doc.id;
          this.games.push(game);
        });
      });
  }
};
</script>

<style>
html {
  background-image: url("../assets/tilebackground.png");
}
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.index .factions {
  margin: 30px auto;
}
.index .ingredients li {
  display: inline-block;
}
.index .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
</style>
