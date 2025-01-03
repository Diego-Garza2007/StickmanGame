// MenuScene.js
class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }



    create() {
        // Fondo del menú
        this.cameras.main.setBackgroundColor('#2d2d2d'); // Fondo gris oscuro

        // Título del juego: "Stickman Chronicles"
        this.add.text(900, 100, 'Stickman Chronicles', {
            fontSize: '64px',
            fill: '#fff',
            fontStyle: 'bold'
        }).setOrigin(0.5);


        
        const playText = this.add.text(900, 300, 'Play', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
        }).setOrigin(0.5).setInteractive();

        playText.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

                // Acción al hacer clic en el botón "Play"
                playText.on('pointerdown', () => {
                    this.scene.start('GameScene'); // Cambia a la escena del juego
                });
        
    }

    update() {
        // Aquí puedes agregar animaciones o cualquier lógica adicional si lo deseas
    }
}
export default MenuScene