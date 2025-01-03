// src/objects/Enemy.js
export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Agregar el sprite del enemigo a la escena
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);

    // Configurar las propiedades físicas
    this.setScale(0.1); // Ajustar el tamaño
    this.setBounce(0.2); // Rebote
    this.setVelocityX(100);  // Velocidad aleatoria inicial

    this.health = 3; // Salud del enemigo

    // Animación de caminar
    scene.anims.create({
      key: "walk-right-Enemy",
      frames: [
        { key: "EnWalkR1" },
        { key: "EnWalkR2" },
        { key: "EnWalkR3" },
        { key: "EnWalkR4" },
        { key: "EnWalkR5" },
        { key: "EnWalkR6" },
        { key: "EnWalkR7" },
        { key: "EnWalkR8" },
        { key: "EnWalkR9" },
        { key: "EnWalkR10" },
      ],
      frameRate: 20,
      repeat: -1,
    });
    this.anims.play("walk-right-Enemy", true);
  }

  update() {
    // Lógica de movimiento independiente
    if (this.body.velocity.x === 0) {
      // Si el enemigo está detenido, cambia de dirección
      let speed = 100; // Velocidad constante
      this.setVelocityX(speed); // Establece la velocidad en ambos sentidos
    }

    // Verificar si el enemigo está a punto de salirse del mapa
    if (this.x >= 1850) {
      // Límite derecho
      let speed = 150; // Velocidad constante
      this.setVelocityX(-speed); // Cambia de dirección a la izquierda
      this.anims.play("walk-right-Enemy", true);
      this.setFlipX(true); // Voltea el sprite para caminar hacia la izquierda
    } else if (this.x <= 50) {
      // Límite izquierdo
      let speed = 100; // Velocidad constante
      this.setVelocityX(speed); // Cambia de dirección a la derecha
      this.anims.play("walk-right-Enemy", true); // Reproduce la animación para caminar a la derecha
      this.setFlipX(false); // No voltea el sprite, camina hacia la derecha
    }

    // Cambiar flipX según la dirección del movimiento
    if (this.body.velocity.x > 0) {
      this.setFlipX(false); // Movimiento hacia la derecha
    } else if (this.body.velocity.x < 0) {
      this.setFlipX(true); // Movimiento hacia la izquierda
    }
  }
  takeDamage(amount, direction) {
    this.health -= amount;
    console.log(this.health);

    // Mover al enemigo en la dirección opuesta al golpe
    let pushDistance = 100;  // Distancia que el enemigo se moverá al ser golpeado
    if (direction === 'left') {
        // Si el golpe fue desde la izquierda, el enemigo se moverá a la derecha
        this.setVelocityX(pushDistance);
    } else if (direction === 'right') {
        // Si el golpe fue desde la derecha, el enemigo se moverá a la izquierda
        this.setVelocityX(-pushDistance);
    }


    if (this.health <= 0) {
        this.destroy(); // Destruir enemigo cuando su salud sea 0
    }
  }
}
