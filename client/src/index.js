import Phaser from "phaser";
import Game from "./scenes/game.js"

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 1240,
  height: 550,
  scene: [
    Game
  ]
};

const game = new Phaser.Game(config);
