import Player from "../objects/Player.js";
import LifeSystem from "../Systems/LifeSystem.js";
import PlayerBossCollisionHandler from '../Systems/PlayerBossCollisionHandler.js'
import Boss from '../objects/Boss.js'; // Importa la clase Boss

export default class RoomFinalScene extends Phaser.Scene {
  constructor() {
    super("RoomFinalScene");
  }

  create() {
    // Agregar la imagen de fondo para la segunda habitación
    const bg = this.add.image(0, 0, "backgroundFinal").setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);
    
    // Crear el suelo
    const ground = this.physics.add.staticGroup();
    ground.create(400, 580, "ground").setScale(100, 1).refreshBody();

    // Crear al jugador
    this.player = new Player(this, 80, 400, "player"); // Mueve al jugador al inicio
    this.physics.add.collider(this.player, ground); // Colisión con el suelo

    // Crear al Boss
    this.boss = new Boss(this, 1700, 390, "BossWalk1");
    this.physics.add.collider(this.boss, ground); // Colisión con el suelo


    // Crear o restaurar el sistema de vidas
    if (!this.registry.get("lifeSystem")) {
      this.lifeSystem = new LifeSystem(this);
      this.registry.set("lifeSystem", this.lifeSystem);
    } else {
      // Recuperar la cantidad de vidas desde playerState y restaurar el lifeSystem
      const playerState = this.registry.get("playerState");
      this.lifeSystem = new LifeSystem(this);
      this.lifeSystem.setLives(playerState ? playerState.health : 3); // Restaurar las vidas, por ejemplo 3 si no se encontró playerState
    }

    // Crear corazones si aún no existen
    if (this.lifeSystem.hearts.length === 0) {
      this.lifeSystem.createHearts();
    }

    // Crear el manejador de colisiones entre el jugador y el boss
    this.collisionHandler = new PlayerBossCollisionHandler(this, this.player, this.boss, this.lifeSystem);


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

  update() {
    // Actualizar al jugador con los controles
    this.player.update(this.keys);

    // Actualizar al Boss
    if (this.boss) {
      this.boss.update();
    }


    // Verificar si el jugador llega al borde izquierdo para regresar a la habitación anterior
    if (this.player.x > 1850) {
      this.changeRoom("CreditScene"); // Regresar a la habitación original
    }
  }

  changeRoom(roomName) {
    // Detener la escena actual y empezar la nueva
    this.scene.start(roomName); // Cambiar a la escena que se pasa como parámetro
  }
}