export default class Npc {
    constructor(scene, x, y) {
        // Guardar la referencia a la escena
        this.scene = scene;

        // Crear el sprite del NPC
        this.sprite = scene.add.sprite(x, y, "NpcIdle1").setScale(0.1);
        scene.physics.world.enable(this.sprite);
        this.sprite.body.allowGravity = false;

        // Crear el texto de instrucciones y asociarlo al NPC
        this.instructionsText = scene.add
            .text(x - 100, y - 175, "", {
                font: "20px Arial",
                fill: "#fff",
                backgroundColor: "#000",
                padding: { x: 10, y: 10 },
                wordWrap: { width: 400, useAdvancedWrap: true },
            })
            .setAlpha(0); // Invisible al inicio

        // Crear la animación si aún no existe
        if (!scene.anims.exists("npcIdleAnimation")) {
            scene.anims.create({
                key: "npcIdleAnimation", // Nombre de la animación
                frames: [
                    { key: "NpcIdle1" },
                    { key: "NpcIdle2" },
                    { key: "NpcIdle3" },
                    { key: "NpcIdle4" },
                    { key: "NpcIdle5" },
                    { key: "NpcIdle6" },
                    { key: "NpcIdle7" },
                    { key: "NpcIdle8" },
                    { key: "NpcIdle9" },
                    { key: "NpcIdle10" },
                    { key: "NpcIdle11" },
                    { key: "NpcIdle12" },
                    { key: "NpcIdle13" },
                    { key: "NpcIdle14" },
                    { key: "NpcIdle15" },
                    { key: "NpcIdle16" },
                    { key: "NpcIdle17" },
                    { key: "NpcIdle18" },
                    { key: "NpcIdle19" },
                    { key: "NpcIdle20" },
                    { key: "NpcIdle21" },
                    { key: "NpcIdle22" },
                    { key: "NpcIdle23" },
                    { key: "NpcIdle24" },
                ],
                frameRate: 12, // Velocidad de la animación
                repeat: -1, // Repetir indefinidamente
            });
        }

        // Reproducir la animación
        this.sprite.play("npcIdleAnimation");
    }

    // Mostrar instrucciones
    showInstructions(text) {
        this.instructionsText.setText(text).setAlpha(1); // Hacer visible el texto
    }

    // Ocultar instrucciones
    hideInstructions() {
        this.instructionsText.setAlpha(0); // Hacer invisible el texto
    }
        // Verificar proximidad
        checkProximity(player) {
            const distance = Phaser.Math.Distance.Between(
                this.sprite.x,
                this.sprite.y,
                player.x,
                player.y
            );
    
            // Mostrar u ocultar instrucciones dependiendo de la distancia
            if (distance < 100) {
                this.showInstructions(
                    "Controles del Juego:\n- A: Mover a la izquierda\n- D: Mover a la derecha\n- SPACE: Saltar"
                );
            } else {
                this.hideInstructions();
            }
        }
}
