import Phaser from 'phaser';
import Player from '../entities/Player';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.scrollSpeed = 1;
    }

    create() {
        // 背景色設定
        this.cameras.main.setBackgroundColor('#001122');
        
        // プレイヤーの作成
        this.player = new Player(this, this.game.config.width / 2, this.game.config.height - 50);
        
        // キーボード入力の設定
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.xKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        
        // グループの作成
        this.playerBullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.groundTargets = this.physics.add.group();
        
        // スコア表示
        this.score = 0;
        this.scoreText = this.add.text(10, 10, 'Score: 0', {
            fontSize: '12px',
            color: '#ffffff'
        });
        
        // 仮の地形スクロール用のタイルを作成
        this.createScrollingBackground();
    }

    update(time, delta) {
        // 背景スクロール
        this.updateBackground(delta);
        
        // プレイヤーの更新
        this.player.update(this.cursors, this.spaceKey, this.xKey);
        
        // 弾丸の画面外判定
        this.playerBullets.children.entries.forEach(bullet => {
            if (bullet.y < -10) {
                bullet.destroy();
            }
        });
    }

    createScrollingBackground() {
        // 仮の背景タイル
        this.bgTiles = [];
        const tileSize = 32;
        const rows = Math.ceil(this.game.config.height / tileSize) + 2;
        const cols = Math.ceil(this.game.config.width / tileSize);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() > 0.9) {
                    const tile = this.add.rectangle(
                        col * tileSize + tileSize / 2,
                        row * tileSize + tileSize / 2,
                        tileSize - 2,
                        tileSize - 2,
                        0x003344
                    );
                    this.bgTiles.push(tile);
                }
            }
        }
    }

    updateBackground(delta) {
        this.bgTiles.forEach(tile => {
            tile.y += this.scrollSpeed;
            if (tile.y > this.game.config.height + 16) {
                tile.y = -16;
            }
        });
    }

    fireZapper(x, y) {
        const zapper = this.physics.add.sprite(x, y, 'zapper');
        zapper.setVelocityY(-300);
        this.playerBullets.add(zapper);
    }

    fireBlaster(x, y) {
        const blaster = this.physics.add.sprite(x, y, 'blaster');
        blaster.setVelocityY(-200);
        this.playerBullets.add(blaster);
    }
}