import Phaser from 'phaser'
import MenuScene from './scenes/MenuScene.js'
import Stage1 from './scenes/Stage1.js'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  pixelArt: true, // Garde les pixels nets
  physics: {
    default: 'arcade',
    arcade: { 
        gravity: { y: 0 }, 
        debug: false // Changez à true pour voir les boîtes de collision
    }
  },
  scene: [MenuScene, Stage1]
}

export default new Phaser.Game(config)