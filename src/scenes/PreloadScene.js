export default class PreloadScene extends Phaser.Scene {
    constructor() {
      super('PreloadScene');
    }
  
    preload() {
      // Background
      this.load.image('background', 'assets/backi.jpg');
      this.load.image('background2', 'assets/back2.jpg');
      this.load.image('background3', 'assets/backi3.jpg');
      this.load.image('background4', 'assets/backi4.jpg');
      this.load.image('backgroundFinal', 'assets/backiFinal.jpg');


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

      //Idle Default
      this.load.image('idle1', 'assets/idleSprites/batch_Layer_1_idleDefault.png')
      this.load.image('idle2', 'assets/idleSprites/batch_Layer_2_idleDefault.png')
      this.load.image('idle3', 'assets/idleSprites/batch_Layer_3_idleDefault.png')
      this.load.image('idle4', 'assets/idleSprites/batch_Layer_4_idleDefault.png')
      this.load.image('idle5', 'assets/idleSprites/batch_Layer_5_idleDefault.png')

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

      // Enemy Walk
      this.load.image('EnWalkR1', 'assets/EnemyWalk/batch_Layer_1_EnemyWalk.png')
      this.load.image('EnWalkR2', 'assets/EnemyWalk/batch_Layer_2_EnemyWalk.png')
      this.load.image('EnWalkR3', 'assets/EnemyWalk/batch_Layer_3_EnemyWalk.png')
      this.load.image('EnWalkR4', 'assets/EnemyWalk/batch_Layer_4_EnemyWalk.png')
      this.load.image('EnWalkR5', 'assets/EnemyWalk/batch_Layer_5_EnemyWalk.png')
      this.load.image('EnWalkR6', 'assets/EnemyWalk/batch_Layer_6_EnemyWalk.png')
      this.load.image('EnWalkR7', 'assets/EnemyWalk/batch_Layer_7_EnemyWalk.png')
      this.load.image('EnWalkR8', 'assets/EnemyWalk/batch_Layer_8_EnemyWalk.png')
      this.load.image('EnWalkR9', 'assets/EnemyWalk/batch_Layer_9_EnemyWalk.png')
      this.load.image('EnWalkR10', 'assets/EnemyWalk/batch_Layer_10_EnemyWalk.png')

      //Npc idle
      this.load.image('NpcIdle1', 'assets/Npc/Layer_1_Npc.png')
      this.load.image('NpcIdle2', 'assets/Npc/Layer_2_Npc.png')
      this.load.image('NpcIdle3', 'assets/Npc/Layer_3_Npc.png')
      this.load.image('NpcIdle4', 'assets/Npc/Layer_4_Npc.png')
      this.load.image('NpcIdle5', 'assets/Npc/Layer_5_Npc.png')
      this.load.image('NpcIdle6', 'assets/Npc/Layer_6_Npc.png')
      this.load.image('NpcIdle7', 'assets/Npc/Layer_7_Npc.png')
      this.load.image('NpcIdle8', 'assets/Npc/Layer_8_Npc.png')
      this.load.image('NpcIdle9', 'assets/Npc/Layer_9_Npc.png')
      this.load.image('NpcIdle10', 'assets/Npc/Layer_10_Npc.png')
      this.load.image('NpcIdle11', 'assets/Npc/Layer_11_Npc.png')
      this.load.image('NpcIdle12', 'assets/Npc/Layer_12_Npc.png')
      this.load.image('NpcIdle13', 'assets/Npc/Layer_13_Npc.png')
      this.load.image('NpcIdle14', 'assets/Npc/Layer_14_Npc.png')
      this.load.image('NpcIdle15', 'assets/Npc/Layer_15_Npc.png')
      this.load.image('NpcIdle16', 'assets/Npc/Layer_16_Npc.png')
      this.load.image('NpcIdle17', 'assets/Npc/Layer_17_Npc.png')
      this.load.image('NpcIdle18', 'assets/Npc/Layer_18_Npc.png')
      this.load.image('NpcIdle19', 'assets/Npc/Layer_19_Npc.png')
      this.load.image('NpcIdle20', 'assets/Npc/Layer_20_Npc.png')
      this.load.image('NpcIdle21', 'assets/Npc/Layer_21_Npc.png')
      this.load.image('NpcIdle22', 'assets/Npc/Layer_22_Npc.png')
      this.load.image('NpcIdle23', 'assets/Npc/Layer_23_Npc.png')
      this.load.image('NpcIdle24', 'assets/Npc/Layer_24_Npc.png')

      // Boss Walk
      this.load.image('BossWalk1', 'assets/BossWalk/BossWalk1.png')
      this.load.image('BossWalk2', 'assets/BossWalk/BossWalk2.png')
      this.load.image('BossWalk3', 'assets/BossWalk/BossWalk3.png')
      this.load.image('BossWalk4', 'assets/BossWalk/BossWalk4.png')
      this.load.image('BossWalk5', 'assets/BossWalk/BossWalk5.png')
      this.load.image('BossWalk6', 'assets/BossWalk/BossWalk6.png')
      

      this.load.image('ground', 'assets/images/ground.png');
    }
  
    create() {

      this.scene.start('MenuScene');

    }
  }
  
