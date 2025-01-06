import Player from "../objects/Player.js";
import LifeSystem from "../Systems/LifeSystem.js";
import Npc from "../objects/Npc.js"

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
    this.lifeSystem = null; // Inicializar fuera del constructor
  }

  create() {
    // Agregar fondo
    const bg = this.add.image(0, 0, "background").setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    // Crear suelo
    const ground = this.physics.add.staticGroup();
    ground.create(400, 580, "ground").setScale(100, 1).refreshBody();
    ground.create(1000, 500, "ground").setScale(1, 1).refreshBody();
    ground.create(1250, 460, "ground").setScale(1, 1).refreshBody();
    ground.create(1450, 400, "ground").setScale(1, 1).refreshBody();
    ground.create(1800, 500, "ground").setScale(2, 10).refreshBody();

    // Crear al jugador en la nueva posición
    this.player = new Player(this, 100, 500, "player");
    this.physics.add.collider(this.player, ground); // Colisión con el suelo

    // Configurar cámara y mundo
    this.physics.world.setBounds(0, 0, 1900, 800);
    this.cameras.main.setBounds(0, 0, 1900, 800);
    this.cameras.main.startFollow(this.player);

    // Crear o restaurar el sistema de vidas
    if (!this.registry.get("lifeSystem")) {
      this.lifeSystem = new LifeSystem(this);
      this.registry.set("lifeSystem", this.lifeSystem);
    } else {
      this.lifeSystem = this.registry.get("lifeSystem");
    }

    // Crear corazones si aún no existen
    if (this.lifeSystem.hearts.length === 0) {
      this.lifeSystem.createHearts();
    }

    this.lifeSystem.resetLives();

    // Agregar controles
    this.keys = this.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      E: Phaser.Input.Keyboard.KeyCodes.E,
    });

    // Crear una instancia del NPC
    this.npc = new Npc(this, 600, 525);

  }

  update() {
    // Actualizar al jugador con los controles
    this.player.update(this.keys);
    
        // Verificar proximidad con el NPC
        this.npc.checkProximity(this.player);

            // Cambio de habitación al alcanzar el borde derecho
    if (this.player.x > 1850) {
      this.changeRoom("Room2Scene"); // Cambiar a Room2Scene
    }
  }

  changeRoom() {
    // Guardar el estado del jugador
    this.registry.set("playerState", {
      x: this.player.x,
      y: this.player.y,
      health: this.lifeSystem.getLives(),
    });
    console.log(this.player.x)


    // Cambiar a la nueva escena
    this.scene.start("Room2Scene"); // Usar el nombre registrado de la escena
  }
}
