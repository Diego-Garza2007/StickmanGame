// src/objects/Enemy.js
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
      super(scene, x, y, texture);
  
      // Agregar el sprite del enemigo a la escena
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.setCollideWorldBounds(true);
  
      // Configurar las propiedades físicas
      this.setScale(0.5);  // Ajustar el tamaño
      this.setCollideWorldBounds(true);  // Limitar al borde del mundo
      this.setBounce(1);  // Rebote
      this.setVelocityX(50);  // Velocidad inicial hacia la derecha

      this.health = 3; // Salud del enemigo
    }
  
    update() {
      // Lógica de movimiento
      if (this.body.velocity.x > 0) {
        // Movimiento hacia la derecha
        if (this.x >= 750) {  // Si llega al borde derecho, cambia de dirección
          this.setVelocityX(-50);
        }
      } else {
        // Movimiento hacia la izquierda
        if (this.x <= 50) {  // Si llega al borde izquierdo, cambia de dirección
          this.setVelocityX(50);
        }
      }
    }
    takeDamage() {
      this.health -= 1;
      if (this.health <= 0) {
        this.destroy(); // Destruir enemigo cuando su salud sea 0
      }
    }
  }