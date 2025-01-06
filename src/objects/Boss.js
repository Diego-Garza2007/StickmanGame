export default class Boss extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // Agregar el sprite del enemigo a la escena
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        // Configurar las propiedades físicas
        this.setScale(0.3); // Ajustar el tamaño
        this.setBounce(0.2); // Rebote
        this.setVelocityX(0); // Velocidad aleatoria inicial

        this.health = 1; // Vida del Boss
        this.damage = 2; // Daño que el Boss inflige al Player
        this.isTakingDamage = false;

        // Crear la animación de caminar
        scene.anims.create({
            key: "walk-left-Boss",
            frames: [
                { key: "BossWalk1" },
                { key: "BossWalk2" },
                { key: "BossWalk3" },
                { key: "BossWalk4" },
                { key: "BossWalk5" },
                { key: "BossWalk6" },
            ],
            frameRate: 5,
            repeat: -1,
        });

        this.anims.play("walk-left-Boss"); // Reproducir la animación

        this.debugGraphics = scene.add.graphics().setAlpha(0.75); // Opacidad del gráfico de depuración
    }

    // Función para aplicar daño al Boss
    takeDamage(amount, direction) {
        if (this.isTakingDamage) return;

        this.isTakingDamage = true;
        this.health -= amount;
        console.log(this.health)

        // Animación de daño
        this.scene.tweens.add({
            targets: this,
            alpha: 0.5,
            duration: 100,
            ease: "Linear",
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                this.setAlpha(1);
                this.isTakingDamage = false;
            },
        });

        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.destroy();
    }

    update() {
        // Limpiar los gráficos previos
        this.debugGraphics.clear();

        // Llamar al nuevo método para dibujar un círculo alrededor de la hitbox
        this.drawHitboxCircle();
    }

    // Nuevo método para dibujar un círculo alrededor de la hitbox
    drawHitboxCircle() {
        // Establecer el estilo del gráfico (círculo verde)
        this.debugGraphics.lineStyle(2, 0x00ff00); // Color verde
        this.debugGraphics.strokeCircle(this.x, this.y, this.width / 3.8); // Dibujar círculo alrededor del Boss

        // Opcional: Agregar relleno verde con opacidad para una mejor visibilidad
        this.debugGraphics.fillStyle(0x00ff00, 0.3); // Relleno verde con opacidad
        this.debugGraphics.fillCircle(this.x, this.y, this.width / 3.8); // Rellenar el círculo
    }
}
