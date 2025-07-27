import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloadScene' });
    }

    preload() {
        this.load.setBaseURL('assets/');
        
        // プレースホルダー画像を作成
        this.createPlaceholderTextures();
    }

    create() {
        this.scene.start('GameScene');
    }

    createPlaceholderTextures() {
        // プレイヤー（ソルバルウ）
        this.load.on('loaderror', () => {
            const graphics = this.add.graphics();
            
            // プレイヤー機体
            graphics.fillStyle(0xffffff);
            graphics.fillTriangle(8, 0, 0, 16, 16, 16);
            graphics.generateTexture('player', 16, 16);
            
            // ザッパー（対空弾）
            graphics.clear();
            graphics.fillStyle(0xffff00);
            graphics.fillRect(0, 0, 2, 8);
            graphics.generateTexture('zapper', 2, 8);
            
            // ブラスター（対地弾）
            graphics.clear();
            graphics.fillStyle(0x00ff00);
            graphics.fillCircle(4, 4, 4);
            graphics.generateTexture('blaster', 8, 8);
            
            // 敵（トーロイド）
            graphics.clear();
            graphics.fillStyle(0xff0000);
            graphics.fillCircle(8, 8, 8);
            graphics.generateTexture('toroid', 16, 16);
            
            // 地上物（アンドアジェネシス）
            graphics.clear();
            graphics.fillStyle(0x808080);
            graphics.fillRect(0, 0, 32, 32);
            graphics.generateTexture('andor_genesis', 32, 32);
            
            graphics.destroy();
        });
    }
}