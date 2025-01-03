export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    // Agregar a la escena
    scene.add.existing(this);
    scene.physics.add.existing(this);

    // Configurar físicas
    this.setScale(0.1);
    this.setBounce(0.2);
    this.setCollideWorldBounds(true);
    

    // Inmunidad
    this.isInvincible = false;
    this.invincibilityDuration = 2000;

    // Hitbox de ataque
    this.attackHitbox = scene.physics.add.sprite(this.x, this.y, null)
      .setSize(50, 50)
      .setVisible(false)

    this.attackHitbox.body.allowGravity = false; // Desactivar la gravedad para la hitbox

    // Crear animaciones
    this.createAnimations(scene);


  }

  createAnimations(scene) {
    // Animación de caminar
    scene.anims.create({
      key: 'walk-right',
      frames: [
        { key: 'walkR1' },
        { key: 'walkR2' },
        { key: 'walkR3' },
        { key: 'walkR4' },
        { key: 'walkR5' },
        { key: 'walkR6' },
        { key: 'walkR7' },
        { key: 'walkR8' },
        { key: 'walkR9' },
        { key: 'walkR10' },
      ],
      frameRate: 20,
      repeat: -1,
    });

    // Animación de ataque
    scene.anims.create({
      key: 'attack',
      frames: [
        { key: 'punchR1' },
        { key: 'punchR2' },
        { key: 'punchR3' },
        { key: 'punchR4' },
        { key: 'punchR5' },
        { key: 'punchR6' },
        { key: 'punchR7' },
        { key: 'punchR8' },
        { key: 'punchR9' },
        { key: 'punchR10' },
        { key: 'punchR11' },
      ],
      frameRate: 20,
      repeat: 0,
    });
       // Animación de idle
       scene.anims.create({
        key: 'idle',
        frames: [
          { key: 'idle1' },
          { key: 'idle2' },
          { key: 'idle3' },
          { key: 'idle4' },
          { key: 'idle5' },
        ],
        frameRate: 10,
        repeat: -1,
      });
  }

  update(keys) {
    const speed = 200;

    // Prioridad: Animación de ataque
    if (this.isAttacking) {
      this.updateAttackHitbox();
      return; // Detenemos aquí para no sobrescribir la animación de ataque
    }

    // Movimiento horizontal
    if (keys.A.isDown) {
      this.setVelocityX(-speed);
      if (!this.isAttacking) this.anims.play('walk-right', true); // Solo caminar si no está atacando
      this.setFlipX(true);
    } else if (keys.D.isDown) {
      this.setVelocityX(speed);
      if (!this.isAttacking) this.anims.play('walk-right', true); // Solo caminar si no está atacando
      this.setFlipX(false);
    } else {
      this.setVelocityX(0);
      if (!this.isAttacking) {
        this.anims.play('idle', true); // Reproducir animación de idle
      }
    }

    // Salto
    if (keys.SPACE.isDown && this.body.touching.down) {
      this.setVelocityY(-300);
    }

    // Ataque
    if (keys.E.isDown) {
      this.attack();
    }

    // Actualizar hitbox
    this.updateAttackHitbox();
  }

  updateAttackHitbox() {
    if (this.isAttacking) {
      this.attackHitbox.x = this.x + (this.flipX ? -30 : 30); // Ajustar posición según dirección
      this.attackHitbox.y = this.y;
    }
  }

  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.anims.play('attack', true);
  
      // Hacer visible la hitbox cuando el jugador ataca
      this.attackHitbox.setVisible(false);
  
      // Actualizar la posición de la hitbox según la dirección del jugador
      this.updateAttackHitbox();
      // Variable para asegurar que el daño se aplica una sola vez
      let hasDamaged = false;

      // Verificar colisiones con los enemigos
      this.scene.physics.add.overlap(this.attackHitbox, this.scene.enemiesGroup, (hitbox, enemy) => {
        if (!hasDamaged) {
          let direction = (this.x < enemy.x) ? 'left' : 'right';
          enemy.takeDamage(1, direction);
          hasDamaged = true;
        }
      });
  
      // Después de 500ms, ocultar la hitbox y finalizar el ataque
      this.scene.time.delayedCall(500, () => {
        this.isAttacking = false;
        this.attackHitbox.setVisible(false);  // Ocultar la hitbox después del ataque
      });
  
      // Ocultar la hitbox inmediatamente después de que termine la animación de ataque
      this.scene.time.delayedCall(500, () => {
        this.attackHitbox.setVisible(false);  // Desactivar la hitbox
      });
    }
  }

  takeDamage(lifeSystem) {
    if (this.isInvincible) return;

    this.isInvincible = true;
    lifeSystem.loseLife();

    this.scene.time.delayedCall(this.invincibilityDuration, () => {
      this.isInvincible = false;
    });

    this.scene.tweens.add({
      targets: this,
      alpha: 0.5,
      duration: 100,
      ease: 'Linear',
      yoyo: true,
      repeat: 10,
      onComplete: () => this.setAlpha(1),
    });
  }
}
