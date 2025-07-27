import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setCollideWorldBounds(true);
        this.speed = 120;
        this.canFireZapper = true;
        this.canFireBlaster = true;
        this.zapperCooldown = 150;
        this.blasterCooldown = 300;
        
        // プレースホルダー用の三角形を作成
        this.createPlayerGraphics();
    }

    createPlayerGraphics() {
        const graphics = this.scene.add.graphics();
        graphics.fillStyle(0xffffff);
        graphics.fillTriangle(8, 0, 0, 16, 16, 16);
        graphics.generateTexture('player', 16, 16);
        graphics.destroy();
        this.setTexture('player');
    }

    update(cursors, zapperKey, blasterKey) {
        // 移動処理
        if (cursors.left.isDown) {
            this.setVelocityX(-this.speed);
        } else if (cursors.right.isDown) {
            this.setVelocityX(this.speed);
        } else {
            this.setVelocityX(0);
        }

        if (cursors.up.isDown) {
            this.setVelocityY(-this.speed);
        } else if (cursors.down.isDown) {
            this.setVelocityY(this.speed);
        } else {
            this.setVelocityY(0);
        }

        // ザッパー（対空弾）発射
        if (zapperKey.isDown && this.canFireZapper) {
            this.scene.fireZapper(this.x, this.y - 10);
            this.canFireZapper = false;
            this.scene.time.addEvent({
                delay: this.zapperCooldown,
                callback: () => { this.canFireZapper = true; }
            });
        }

        // ブラスター（対地弾）発射
        if (blasterKey.isDown && this.canFireBlaster) {
            this.scene.fireBlaster(this.x, this.y - 10);
            this.canFireBlaster = false;
            this.scene.time.addEvent({
                delay: this.blasterCooldown,
                callback: () => { this.canFireBlaster = true; }
            });
        }
    }
}