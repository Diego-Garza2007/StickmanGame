import BootScene from './src/scenes/BootScene.js';
import PreloadScene from './src/scenes/PreloadScene.js';
import GameScene from './src/scenes/GameScene.js';
import Room2Scene from './src/scenes/Room2Scene.js'; // Nueva escena
import GameOverScene from './src/scenes/GameOverScene.js';
import Room3Scene from './src/scenes/Room3Scene.js';
import Room4Scene from './src/scenes/Room4Scene.js';
import RoomFinalScene from './src/scenes/RoomFinal.js';
import CreditScene from './src/scenes/CreditScene.js'
import MenuInicio from './src/scenes/MenuScene.js'


const config = {
  type: Phaser.AUTO,
  width: 1900,
  height: 800,
  backgroundColor: '#2d2d2d',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [BootScene, PreloadScene, MenuInicio, CreditScene, RoomFinalScene, Room4Scene, Room3Scene, Room2Scene, GameScene , GameOverScene] // Asegúrate de que 'Room2Scene' esté aquí
};

const game = new Phaser.Game(config);
