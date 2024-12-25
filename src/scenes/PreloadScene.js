export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
  
    preload() {
      // Background
      this.load.image('background', 'assets/backi.jpg');
      this.load.image('background2', 'assets/back2.jpg');


      this.load.image('player', 'assets/default.png');
      this.load.image('npc', 'assets/default.png');
      this.load.image('heart', 'assets/heart.png')
      this.load.image('enemyTexture', 'assets/heart.png')
      // Walk right
      this.load.image('walkR1', 'assets/walkRightSprites/batch_Layer_1.png')
      this.load.image('walkR2', 'assets/walkRightSprites/batch_Layer_2.png')
      this.load.image('walkR3', 'assets/walkRightSprites/batch_Layer_3.png')
      this.load.image('walkR4', 'assets/walkRightSprites/batch_Layer_4.png')
      this.load.image('walkR5', 'assets/walkRightSprites/batch_Layer_5.png')
      this.load.image('walkR6', 'assets/walkRightSprites/batch_Layer_6.png')
      this.load.image('walkR7', 'assets/walkRightSprites/batch_Layer_7.png')
      this.load.image('walkR8', 'assets/walkRightSprites/batch_Layer_8.png')
      this.load.image('walkR9', 'assets/walkRightSprites/batch_Layer_9.png')
      this.load.image('walkR10', 'assets/walkRightSprites/batch_Layer_10.png')

      // Punch
      this.load.image('punchR1', 'assets/punchSprites/batch_Layer_1_punch.png')
      this.load.image('punchR2', 'assets/punchSprites/batch_Layer_2_punch.png')
      this.load.image('punchR3', 'assets/punchSprites/batch_Layer_3_punch.png')
      this.load.image('punchR4', 'assets/punchSprites/batch_Layer_4_punch.png')
      this.load.image('punchR5', 'assets/punchSprites/batch_Layer_5_punch.png')
      this.load.image('punchR6', 'assets/punchSprites/batch_Layer_6_punch.png')
      this.load.image('punchR7', 'assets/punchSprites/batch_Layer_7_punch.png')
      this.load.image('punchR8', 'assets/punchSprites/batch_Layer_8_punch.png')
      this.load.image('punchR9', 'assets/punchSprites/batch_Layer_9_punch.png')
      this.load.image('punchR10', 'assets/punchSprites/batch_Layer_10_punch.png')
      this.load.image('punchR11', 'assets/punchSprites/batch_Layer_11_punch.png')


      

      this.load.image('ground', 'assets/images/ground.png');
    }
  
    create() {
      this.scene.start('GameScene');
    }
  }
  