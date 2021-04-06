function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.monsterHealth + "%" };
      }
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      } else {
        return { width: this.playerHealth + "%" };
      }
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster wins
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player wins
        this.winner = "player";
      }
    },
  },
  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages = [];
    },
    attackMonster() {
      // Calculate monster health,
      const attackValue = getRandomValue(5, 12);
      // reduce monster health
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      console.log("Attack Monster", this.monsterHealth, this.playerHealth);
      this.addLogMessage("player", "attack", attackValue);
      this.currentRound++;
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 16);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      const attackValue = getRandomValue(10, 25) + 10;
      this.monsterHealth -= attackValue;
      this.attackPlayer();
      this.currentRound++;
      this.addLogMessage("player", "attack", attackValue);
    },
    healPlayer() {
      healValue = getRandomValue(8, 20);
      if (this.playerHealth + healValue >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.addLogMessage("player", "heal", healValue);
      this.attackPlayer();
      currentRound++;
    },
    surrender() {
      this.winner = "monster";
      this.addLogMessage("player", "surrenders", 0);
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionByWho: who,
        actionTypeWhat: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
