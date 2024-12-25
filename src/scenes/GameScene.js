import Player from "../objects/Player.js";
import LifeSystem from "../Systems/LifeSystem.js";
import Room2Scene from "./Room2Scene.js";

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

    // Crear NPC
    this.npc = this.add.sprite(600, 525, "npc").setScale(0.1);
    this.physics.world.enable(this.npc);
    this.npc.body.allowGravity = false;

    // Instrucciones
    this.instructionsText = this.add
      .text(500, 350, "", {
        font: "20px Arial",
        fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 10, y: 10 },
        wordWrap: { width: 400, useAdvancedWrap: true },
      })
      .setAlpha(0); // Invisible al inicio
  }

  update() {
    // Controles del jugador
    this.player.update(this.keys);

    // Mostrar instrucciones si está cerca del NPC
    if (
      Phaser.Math.Distance.Between(
        this.player.x,
        this.player.y,
        this.npc.x,
        this.npc.y
      ) < 100
    ) {
      this.showInstructions(true);
    } else {
      this.showInstructions(false);
    }

    // Cambio de habitación al alcanzar el borde derecho
    if (this.player.x > 1000) {
      this.changeRoom("Room2Scene"); // Cambiar a Room2Scene
    }
  }

  showInstructions(visible) {
    if (visible) {
      this.instructionsText.setText(
        "Controles del Juego:\n- A: Mover a la izquierda\n- D: Mover a la derecha\n- SPACE: Saltar"
      );
      this.instructionsText.setAlpha(1);
    } else {
      this.instructionsText.setAlpha(0);
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
