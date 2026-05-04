import { Scene } from "@tialops/maki";

export default class MenuScene extends Scene {
  constructor() {
    super("MenuScene");
  }

  preload() {
    this.load.image("menu_bg", "assets/images/menu_bg.png");
    this.load.audio("menu_music", "assets/audio/menu_theme.mp3");
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, "menu_bg");

    // Bouton Commencer
    const btn = this.add
      .text(width / 2, height / 2 + 60, "COMMENCER TON AVENTURE", {
        fontSize: "24px",
        fill: "#fff",
        backgroundColor: "#6c4848",
        padding: 15,
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    btn.on("pointerover", () => {
      this.tweens.add({
        targets: btn,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 200,
      });
    });

    btn.on("pointerout", () => {
      this.tweens.add({
        targets: btn,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
      });
    });

    btn.on("pointerdown", () => {
      this.sound.stopAll(); // Arrête la musique du menu
      this.scene.start("Stage1");
    });
  }
}
