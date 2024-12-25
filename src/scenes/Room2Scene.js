import Player from "../objects/Player.js";
import Enemy from "../objects/Enemy.js"; // Importar la clase Enemy
import LifeSystem from "../Systems/LifeSystem.js";
import GameScene from "./GameScene.js";

export default class Room2Scene extends Phaser.Scene {
  constructor() {
    super("Room2Scene");
  }

  create() {
    // Agregar la imagen de fondo para la segunda habitación
    const bg = this.add.image(0, 0, "background2").setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);
    
    // Crear el suelo
    const ground = this.physics.add.staticGroup();
    ground.create(400, 580, "ground").setScale(100, 1).refreshBody();

    // Crear al jugador
    this.player = new Player(this, 50, 300, "player"); // Mueve al jugador al inicio
    this.physics.add.collider(this.player, ground); // Colisión con el suelo

    // Crear grupo de enemigos
    this.enemiesGroup = this.physics.add.group();
    this.physics.add.collider(this.enemiesGroup, ground);

    // Crear enemigos
    this.createEnemy(400, 300);
    this.createEnemy(600, 500);

    // Colisiones entre el jugador y los enemigos
    this.physics.add.collider(this.player, this.enemiesGroup, this.handlePlayerEnemyCollision, null, this);

    // Colisión entre la hitbox del jugador y los enemigos
    this.physics.add.overlap(
      this.player.attackHitbox,
      this.enemiesGroup,
      (hitbox, enemy) => {
        enemy.takeDamage(); // Reducir salud del enemigo
      },
      null,
      this
    );

    // Sistema de vidas
    if (!this.lifeSystem) {
      this.lifeSystem = new LifeSystem(this);
      this.lifeSystem.createHearts();
    }

    // Configurar controles personalizados
    this.keys = this.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      E: Phaser.Input.Keyboard.KeyCodes.E,
    });

    this.physics.world.setBounds(0, 0, 1900, 800); // Define los límites del mundo actual
    this.cameras.main.setBounds(0, 0, 1900, 800); // Ajusta la cámara
    this.cameras.main.startFollow(this.player); // La cámara sigue al jugador
  }

  createEnemy(x, y) {
    // Crear enemigo y agregarlo al grupo
    const enemy = new Enemy(this, x, y, "enemyTexture");
    this.enemiesGroup.add(enemy);
  }

  update() {
    // Actualizar al jugador con los controles
    this.player.update(this.keys);

    // Actualizar todos los enemigos en el grupo
    this.enemiesGroup.children.iterate((enemy) => {
      if (enemy) {
        enemy.update();
      }
    });

    // Verificar si el jugador llega al borde izquierdo para regresar a la habitación anterior
    if (this.player.x < 30) {
      this.changeRoom("GameScene"); // Regresar a la habitación original
    }
  }

  changeRoom(roomName) {
    // Detener la escena actual y empezar la nueva
    this.scene.start(GameScene); // Cambiar a la escena que se pasa como parámetro
  }

  handlePlayerEnemyCollision(player, enemy) {
    console.log("¡El jugador ha chocado con el enemigo!");
    // Aquí puedes agregar la lógica para lo que pasa cuando el jugador choca con el enemigo
    // Ejemplo: restar vida, reiniciar el nivel, etc.
    if (!this.player.isInvincible) {
      this.player.takeDamage(this.lifeSystem); // Aplicar daño al jugador
    }
  }
}
