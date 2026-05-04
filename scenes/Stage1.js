import { Scene, manager } from '@tialops/maki'

export default class Stage1 extends Scene {
  constructor() {
    super('Stage1')
    // Points d'énergie spirituelle (Hery)
    this.hery = 100 
  }

  /**
   * Chargement des ressources spécifiques au Stage 1
   */
  preload() {
    // Appel obligatoire du preload parent de Maki
    super.preload() 

    // Chargement du joueur (Sely la tisseuse de Lamba)
    this.sely = this.maki.player('sely')

    // Chargement de la carte d'Iarivo (créée via maki tilemap)
    manager.map(this, 'iarivo_map') 
    
    // Préchargement final des assets de la carte
    manager.preload(this)
  }

  /**
   * Création des éléments de la scène
   */
  create() {
    // 1. Initialisation de la logique Maki
    super.create()
    manager.create(this)

    // 2. Configuration du personnage principal
    // On la place au milieu (400, 300) et on s'assure qu'elle est visible (Depth)
    this.sely.sprite.setPosition(400, 300)
    this.sely.sprite.setDepth(10) 

    // 3. Configuration de la Caméra
    // La caméra suit Sely avec un léger lissage (0.1)
    this.cameras.main.startFollow(this.sely.sprite, true, 0.1, 0.1)
    this.cameras.main.setZoom(1.2) // Zoom pour apprécier le pixel art malgache

    // 4. Gestion du clavier (Touche ESC pour quitter)
    this.input.keyboard.on('keydown-ESC', () => {
      console.log("Retour à l'Arbre de Vie (Menu)...")
      this.sound.stopAll() // Arrête les sons d'ambiance
      this.scene.start('MenuScene') // Retour au menu principal
    })

    // 5. Système de collisions
    // Récupère les murs et obstacles définis dans votre Tilemap
    const walls = manager.getWallGroup(this, 'iarivo_map')
    this.physics.add.collider(this.sely.sprite, walls)

    // 6. Interface Utilisateur (HUD)
    // .setScrollFactor(0) permet au texte de rester fixe sur l'écran
    this.add.text(20, 20, 'STAGE 1: ARCHIPEL D\'IARIVO', { 
      fontSize: '18px', 
      fill: '#ffffff',
      fontStyle: 'bold'
    }).setScrollFactor(0)

    this.heryText = this.add.text(20, 50, `HERY: ${this.hery}`, { 
      fontSize: '22px', 
      fill: '#ff0000', 
      fontStyle: 'bold',
      stroke: '#000',
      strokeThickness: 3
    }).setScrollFactor(0)

    this.add.text(20, 560, 'Appuyez sur ÉCHAP pour le menu', { 
      fontSize: '14px', 
      fill: '#aaaaaa' 
    }).setScrollFactor(0)
  }

  /**
   * Boucle de mise à jour (exécutée à chaque frame)
   */
  update() {
    // Gestion des déplacements via le module Maki (Flèches ou ZQSD)
    if (this.sely) {
      this.maki.move(this.sely)
    }

    // Ici vous pourrez ajouter la logique pour diminuer le Hery 
    // ou détecter si Sely entre dans la brume du Vovoka
  }
}