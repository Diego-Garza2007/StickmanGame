

export default class CollisionHandler {
    constructor(scene, player, enemiesGroup, lifeSystem) {
      this.scene = scene;
      this.player = player;
      this.enemiesGroup = enemiesGroup;
      this.lifeSystem = lifeSystem;
  
      // Agregar las colisiones entre el jugador y los enemigos
      this.handleCollisions();
    }
  
    handleCollisions() {
      // Colisión entre el jugador y los enemigos
      this.scene.physics.add.collider(this.player, this.enemiesGroup, this.onPlayerEnemyCollision, null, this);
  
      // Otras colisiones que puedas necesitar...
    }
  
    // Función de colisión entre el jugador y los enemigos
    onPlayerEnemyCollision(player, enemy) {
      // Si el jugador está tocando al enemigo y no está invencible, aplica daño al jugador
      if (!player.isInvincible) {
        player.takeDamage(this.lifeSystem);  // Aplica daño al jugador
      }
    }
  }
  