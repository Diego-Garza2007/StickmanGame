import BootScene from './src/scenes/BootScene.js';
import PreloadScene from './src/scenes/PreloadScene.js';
import GameScene from './src/scenes/GameScene.js';
import Room2Scene from './src/scenes/Room2Scene.js'; // Nueva escena
import GameOverScene from './src/scenes/GameOverScene.js';

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
  scene: [BootScene, PreloadScene, Room2Scene, GameScene , GameOverScene] // Asegúrate de que 'Room2Scene' esté aquí
};

const game = new Phaser.Game(config);
