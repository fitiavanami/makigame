import { Scene, manager } from '@tialops/maki'

export default class Stage1 extends Scene {
  constructor() {
    super('Stage1')
    this.hery = 100 
  }

  preload() {
    super.preload()
    this.sely = this.maki.player('sely')
    
    // 1. On charge l'image en SPRITESHEET (découpe en carrés de 32x32)
    this.load.spritesheet('enemy_spirit', 'assets/images/vovoka_spirit.png', { 
        frameWidth: 32, 
        frameHeight: 32 
    })
    
    manager.map(this, 'iarivo_map') 
    manager.preload(this)
  }

  create() {
    super.create()
    manager.create(this)

    // 2. CRÉATION DES ANIMATIONS POUR L'ENNEMI
    // On crée une animation de marche simple (frames 0 à 3 par exemple)
    this.anims.create({
        key: 'enemy_walk',
        frames: this.anims.generateFrameNumbers('enemy_spirit', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1 // Boucle infinie
    })

    this.sely.sprite.setPosition(400, 300).setDepth(100)
    this.cameras.main.startFollow(this.sely.sprite, true, 0.1, 0.1)

    this.enemies = this.physics.add.group()
    this.spawnEnemy(200, 200)
    this.spawnEnemy(600, 100)
    this.spawnEnemy(100, 500)

    const walls = manager.getWallGroup(this, 'iarivo_map')
    this.physics.add.collider(this.enemies, walls)
    this.physics.add.collider(this.sely.sprite, walls)
    this.physics.add.overlap(this.sely.sprite, this.enemies, this.handlePlayerDamage, null, this)

    this.heryText = this.add.text(20, 20, `HERY: ${this.hery}`, { 
        fontSize: '22px', fill: '#ff0000', fontStyle: 'bold', stroke: '#000', strokeThickness: 3 
    }).setScrollFactor(0).setDepth(200)

    this.input.keyboard.on('keydown-ESC', () => {
      this.sound.stopAll()
      this.scene.start('MenuScene')
    })
  }

  spawnEnemy(x, y) {
    const enemy = this.enemies.create(x, y, 'enemy_spirit')
    enemy.setTint(0x808080)
    enemy.setDepth(90)
    enemy.setCollideWorldBounds(true)
    enemy.speed = 60 
    
    // On lance l'animation par défaut
    enemy.play('enemy_walk')
  }

  handlePlayerDamage(player, enemy) {
    this.hery -= 0.2 
    this.heryText.setText(`HERY: ${Math.floor(this.hery)}`)
    player.setTint(0xff0000)
    this.time.delayedCall(100, () => player.clearTint())

    if (this.hery <= 0) {
        this.scene.start('MenuScene')
    }
  }

  update() {
    this.maki.move(this.sely)

    this.enemies.getChildren().forEach(enemy => {
        const distance = Phaser.Math.Distance.Between(
            this.sely.sprite.x, this.sely.sprite.y,
            enemy.x, enemy.y
        )

        if (distance < 250) {
            this.physics.moveToObject(enemy, this.sely.sprite, enemy.speed)
            enemy.setTint(0xff6666)
            
            // GESTION DU REGARD (Flip)
            // Si Sely est à gauche de l'ennemi, on le tourne vers la gauche
            if (this.sely.sprite.x < enemy.x) {
                enemy.setFlipX(true)
            } else {
                enemy.setFlipX(false)
            }

            // S'assurer que l'animation joue quand il bouge
            if (!enemy.anims.isPlaying) enemy.play('enemy_walk')
            
        } else {
            enemy.setVelocity(0, 0)
            enemy.setTint(0x808080)
            enemy.stop() // S'arrête quand il ne poursuit plus
        }
    })
  }
}