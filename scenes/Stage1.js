import { Scene, manager } from '@tialops/maki'

export default class Stage1 extends Scene {
  constructor() {
    super('Stage1')
    this.hery = 100
  }

  preload() {
    super.preload()
    this.sely = this.maki.player('sely')
    manager.map(this, 'iarivo_map') 
    manager.preload(this)
  }

  create() {
    super.create()
    manager.create(this)

    // 1. Position et profondeur de Sely
    this.sely.sprite.setPosition(400, 300)
    this.sely.sprite.setDepth(10) 
    this.cameras.main.startFollow(this.sely.sprite, true, 0.1, 0.1)

    // 2. RÉPARATION DE LA TOUCHE ECHAP
    // On nettoie les anciens événements pour éviter les conflits
    this.input.keyboard.removeAllListeners()

    // On crée le nouvel écouteur
    this.input.keyboard.on('keydown-ESC', () => {
      console.log("Retour au menu demandé...");
      
      // On stoppe tout proprement avant de changer
      this.sound.stopAll()
      
      // On lance la scène du Menu
      this.scene.start('MenuScene')
    })

    // 3. Collisions
    const walls = manager.getWallGroup(this, 'iarivo_map')
    this.physics.add.collider(this.sely.sprite, walls)

    // 4. HUD (Interface)
    this.add.text(20, 20, 'STAGE 1: IARIVO', { 
        fontSize: '18px', fill: '#fff', fontStyle: 'bold' 
    }).setScrollFactor(0)

    this.heryText = this.add.text(20, 45, `HERY: ${this.hery}`, { 
        fontSize: '22px', fill: '#ff0000', fontStyle: 'bold' 
    }).setScrollFactor(0)

    this.add.text(20, 570, 'Appuyez sur ECHAP pour quitter', { 
        fontSize: '12px', fill: '#aaa' 
    }).setScrollFactor(0)
  }

  update() {
    if (this.sely) {
      this.maki.move(this.sely)
    }
  }
}