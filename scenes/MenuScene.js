import { Scene } from '@tialops/maki'

export default class MenuScene extends Scene {
  constructor() {
    super('MenuScene')
  }

  preload() {
    this.load.image('menu_bg', 'assets/images/menu_bg.png')
    this.load.audio('menu_music', 'assets/audio/menu_theme.mp3')
    this.load.audio('click_sound', 'assets/audio/click.mp3')
  }

  create() {
    const { width, height } = this.scale
    
    // 1. Fond avec un filtre sombre pour l'effet donjon
    const bg = this.add.image(width / 2, height / 2, 'menu_bg')
    bg.setTint(0x444444) // Assombrit l'image pour faire ressortir les boutons

    // 2. Titre style "Ancien"
    this.add.text(width / 2, height / 5, 'RAVINALA TALES', {
      fontSize: '64px', 
      fill: '#e67e22', // Orange flamboyant/terre cuite
      fontStyle: 'bold', 
      stroke: '#2c3e50', 
      strokeThickness: 8,
      shadow: { offsetX: 3, offsetY: 3, color: '#000', blur: 5, fill: true }
    }).setOrigin(0.5)

    // 3. Groupe de boutons Donjon
    this.createDungeonButton(width / 2, height / 2 - 20, 'COMMENCER L\'AVENTURE', () => {
      this.sound.stopAll()
      this.scene.start('Stage1')
    })

    this.createDungeonButton(width / 2, height / 2 + 70, 'CONTROLES', () => {
      this.showControls()
    })

    this.createDungeonButton(width / 2, height / 2 + 160, 'QUITTER L\'ARCHIPEL', () => {
      if (confirm("Voulez-vous vraiment quitter Iarivo ?")) {
          window.location.reload()
      }
    })
  }

  /**
   * Crée un bouton avec un style de cadre de donjon
   */
  createDungeonButton(x, y, label, action) {
    // Style du texte
    const btnText = this.add.text(x, y, label, {
      fontSize: '24px',
      fill: '#f1c40f', // Jaune or
      fontStyle: 'bold',
      padding: { x: 30, y: 15 }
    }).setOrigin(0.5).setDepth(2)

    // Dessin du cadre style "Pierre"
    const bgBox = this.add.graphics().setDepth(1)
    const drawBox = (color, strokeColor) => {
        bgBox.clear()
        bgBox.lineStyle(3, strokeColor, 1)
        bgBox.fillStyle(color, 0.9)
        // Dessine un rectangle biseauté
        bgBox.strokeRect(x - 160, y - 30, 320, 60)
        bgBox.fillRect(x - 160, y - 30, 320, 60)
    }

    drawBox(0x2d3436, 0xe67e22) // Couleur de base : gris sombre, bordure orange

    // Interactions
    btnText.setInteractive({ useHandCursor: true })
    
    btnText.on('pointerover', () => {
        drawBox(0x636e72, 0xf1c40f) // Plus clair au survol
        btnText.setStyle({ fill: '#fff' })
    })

    btnText.on('pointerout', () => {
        drawBox(0x2d3436, 0xe67e22)
        btnText.setStyle({ fill: '#f1c40f' })
    })

    btnText.on('pointerdown', () => {
        try { this.sound.play('click_sound') } catch(e) {}
        action()
    })
  }

  showControls() {
    const { width, height } = this.scale
    const overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.9).setDepth(100)
    
    const infoText = this.add.text(width/2, height/2, 
      "--- CONTROLES ---\n\n" +
      "ZQSD ou FLÈCHES : Explorer\n" +
      "ÉCHAP : Méditer (Menu)\n\n" +
      "Cliquez pour reprendre", 
      { fontSize: '24px', fill: '#e67e22', align: 'center', fontStyle: 'bold' }
    ).setOrigin(0.5).setDepth(101)

    overlay.setInteractive()
    overlay.on('pointerdown', () => {
      overlay.destroy()
      infoText.destroy()
    })
  }
}