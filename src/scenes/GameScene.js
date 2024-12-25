import Player from '../objects/Player.js';
import LifeSystem from '../Systems/LifeSystem.js';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
  }

  create() {
    // Agregar fondo
    const bg = this.add.image(0, 0, 'background').setOrigin(0, 0);
    bg.setDisplaySize(this.scale.width, this.scale.height);

    // Crear suelo
    const ground = this.physics.add.staticGroup();
    ground.create(400, 580, 'ground').setScale(100, 1).refreshBody();

    // Crear al jugador en la nueva posición
    this.player = new Player(this, 100, 500, 'player');
    this.physics.add.collider(this.player, ground); // Colisión con el suelo

    // Configurar cámara y mundo
    this.physics.world.setBounds(0, 0, 1900, 800);
    this.cameras.main.setBounds(0, 0, 1900, 800);
    this.cameras.main.startFollow(this.player);

    // Sistema de vidas
    if (!this.lifeSystem) {
      this.lifeSystem = new LifeSystem(this);
      this.lifeSystem.createHearts(); // Crear los corazones de vida
    }

    // Agregar controles
    this.keys = this.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      E: Phaser.Input.Keyboard.KeyCodes.E,
    });


    // Crear el NPC en una posición adecuada dentro del canvas
    this.npc = this.add.sprite(600, 525, 'npc'); // Posición ajustada
    this.npc.setScale(0.1); // Escalar al NPC para hacerlo más pequeño
    this.physics.world.enable(this.npc); // Hacer que el NPC tenga interacción física
    this.npc.body.allowGravity = false; // Desactivar la gravedad para el NPC

    
        // Agregar un cuadro de texto para las instrucciones
    this.instructionsText = this.add.text(500, 350, '', {
          font: '20px Arial',
          fill: '#fff',
          backgroundColor: '#000',
          padding: { x: 10, y: 10 },
          wordWrap: { width: 400, useAdvancedWrap: true }
        }).setAlpha(0); // Inicialmente invisible


  }

  update() {
    // Actualizar al jugador con los controles
    this.player.update(this.keys);

    // Verificar si el jugador está cerca del NPC
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.npc.x, this.npc.y) < 100) {
      this.showInstructions(true); // Mostrar instrucciones si está cerca del NPC
    } else {
      this.showInstructions(false); // Ocultar instrucciones si está lejos
    }



    // Verificar si el jugador llega al borde derecho y cambiar de habitación
    if (this.player.x > 1870) { // 790 es el borde derecho (800px - ancho del jugador)
      this.changeRoom();
      console.log('gelo')
    }
  }

  showInstructions(visible) {
    if (visible) {
      this.instructionsText.setText('Controles del Juego:\n- A: Mover a la izquierda\n- D: Mover a la derecha\n- SPACE: Saltar');
      this.instructionsText.setAlpha(1); // Hacer visible el cuadro de texto
    } else {
      this.instructionsText.setAlpha(0); // Ocultar el cuadro de texto
    }
  }

  changeRoom() {
    // Detener la escena actual y empezar la nueva
    this.scene.start('Room2Scene'); // Cambia a la escena de la siguiente habitación
  }
}
