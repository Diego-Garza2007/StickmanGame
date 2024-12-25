export default class GameOverScene extends Phaser.Scene {
    constructor() {
      super('GameOverScene');
    }
  
    create() {
      // Agregar texto de "Game Over"
      this.add.text(this.scale.width / 2, this.scale.height / 2 - 50, 'Game Over', {
        fontSize: '48px',
        color: '#ff0000',
        fontFamily: 'Arial',
      }).setOrigin(0.5);
  
      // Agregar instrucciones para reiniciar
      this.add.text(this.scale.width / 2, this.scale.height / 2 + 50, 'Presiona [R] para reiniciar', {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Arial',
      }).setOrigin(0.5);
  
      // Detectar la tecla para reiniciar
      this.input.keyboard.once('keydown-R', () => {
        this.scene.start('GameScene'); // Reinicia la escena principal
      });
    }
  }
  