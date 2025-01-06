export default class PlayerBossCollisionHandler {
    constructor(scene, player, boss, lifeSystem) {
      this.scene = scene;
      this.player = player;
      this.boss = boss;
      this.lifeSystem = lifeSystem;
  
      // Configurar las colisiones entre el jugador y el boss
      this.handleCollisions();
    }
  
    handleCollisions() {
      // Colisión entre el jugador y el boss
      this.scene.physics.add.collider(this.player, this.boss, this.onPlayerBossCollision, null, this);
    }
  
    // Función de colisión entre el jugador y el boss
    onPlayerBossCollision(player, boss) {
      // Si el jugador no está invencible, aplica daño al jugador
      if (!player.isInvincible) {
        player.takeDamage(this.lifeSystem); // Aplica daño al jugador
      }
  
      // Si el jugador golpea al boss, aplica daño al boss
      if (player.isAttacking) {
        boss.takeDamage(1); // Aplica daño al boss desde la dirección del jugador
      }
    }
  }
  