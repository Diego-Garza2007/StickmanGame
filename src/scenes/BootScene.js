export default class BootScene extends Phaser.Scene {
    constructor() {
      super('BootScene');
    }
  
    preload() {
      console.log('BootScene loaded');
    }
  
    create() {
      this.scene.start('PreloadScene');
    }
  }
  