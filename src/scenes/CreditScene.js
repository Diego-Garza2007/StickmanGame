// Crear una escena de créditos
class CreditScene extends Phaser.Scene {
    constructor() {
        super("CreditScene");
    }

    create() {
        // Fondo de créditos
        this.cameras.main.setBackgroundColor('#000'); // Fondo negro

        // Agregar el título de créditos
        let creditsText = this.add.text(400, 100, 'Créditos', {
            fontSize: '48px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Agregar los nombres de los miembros del equipo
        let creditLines = [
            'Desarrollador: Diego Garza',
            'Diseñador: Diego Garza',
            'Pruebas: Diego Garza',
            'Gracias por jugar!',
            'Nos veremos en la siguiente ?'
        ];

        // Mostrar las líneas de créditos
        let lineHeight = 60;
        creditLines.forEach((line, index) => {
            this.add.text(400, 200 + index * lineHeight, line, {
                fontSize: '32px',
                fill: '#fff'
            }).setOrigin(0.5);
        });

        // Desplazar los créditos hacia arriba lentamente
        this.tweens.add({
            targets: this.cameras.main,
            y: '-200', // Mueve la cámara hacia arriba
            duration: 5000,
            ease: 'Linear',
            repeat: -1, // Repite el movimiento
            yoyo: false
        });

        // Iniciar música (si es necesario)
        // this.sound.play('musicaCreditos');

        // Permitir que los jugadores presionen cualquier tecla para volver al menú
        this.input.keyboard.on('keydown', () => {
            this.scene.start('MenuScene'); // Regresar al menú principal, por ejemplo
        });
    }

    update() {
        // Si quieres agregar algún efecto adicional (por ejemplo, música, animaciones)
    }
}
export default CreditScene