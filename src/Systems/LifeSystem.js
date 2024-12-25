export default class LifeSystem {
    constructor(scene) {
      this.scene = scene;
      this.lives = 3; // Número inicial de vidas
      this.hearts = []; // Array para almacenar los sprites de corazones
    }
  
    // Crear corazones en pantalla
    createHearts() {
      const spacing = 70; // Espaciado entre los corazones (ajusta este valor)
      for (let i = 0; i < 3; i++) {
        const heart = this.scene.add
          .image(50 + i * spacing, 50, 'heart')
          .setScale(0.3)
          .setOrigin(0.5);
        this.hearts.push(heart);
      }
    }
  
    // Actualizar la visualización de los corazones
    updateHearts() {
      for (let i = 0; i < this.hearts.length; i++) {
        if (i < this.lives) {
          this.hearts[i].setVisible(true); // Mostrar el corazón
        } else {
          this.hearts[i].setVisible(false); // Ocultar el corazón
        }
      }
    }
  
    // Reducir una vida
    loseLife() {
      if (this.lives > 0) {
        this.lives--;
        this.updateHearts();
      }
  
      // Si las vidas llegan a 0, termina el juego
      if (this.lives <= 0) {
        this.scene.tweens.killAll(); // Detener todos los tweens (animaciones)
        this.scene.physics.world.colliders.destroy(); // Detener colisiones
        this.scene.scene.stop('GameScene'); // Detener la escena actual
        this.scene.scene.start('GameOverScene'); // Cambiar a la escena de Game Over
      }
    }
  
    // Restablecer vidas (si se reinicia el juego)
    resetLives() {
      this.lives = 3;
      this.updateHearts();
    }
  }
  