import io from 'socket.io-client';
import Card from '../helpers/card.js';
import Zone from '../helpers/zone.js';
import Dealer from '../helpers/dealer.js';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: "Game"
        })
    }

preload() {
    this.load.image('CyanCardFront', 'src/assets/CyanCardFront.png');
    this.load.image('CyanCardBack', 'src/assets/CyanCardBack.png');
    this.load.image('MagentaCardFront', 'src/assets/MagentaCardFront.png');
    this.load.image('MagentaCardBack', 'src/assets/MagentaCardBack.png');
}

create() {
    this.cameras.main.setBackgroundColor('#ffffff');
    this.zone = new Zone(this);
    this.dropZone = this.zone.renderZone();
    this.outline = this.zone.renderOutline(this.dropZone);
    this.dealer = new Dealer(this);
    this.dealText = this.add.text(60, 275, [ 'DEAL CARDS' ]);
    this.dealText.setFontSize(18).setFontFamily('Trebuchet MS').setColor('#000000').setInteractive();

    this.socket = io('http://localhost:3000/');

    let self = this;

    this.isPlayerA = false;
    this.opponentCards = []

    this.socket = io('http://localhost:3000/');

    this.socket.on('connect', function() {
        console.log('Connected!');
    })


    this.socket.on('isPlayerA', function() {
        self.isPlayerA = true;
    })

    this.socket.on('dealCards', function() {
        self.dealer.dealCards(this);
        self.dealText.disableInteractive();

    })

    this.socket.on('cardPlayed', function(gameObject, isPlayerA) {
        if (self.isPlayerA !== isPlayerA) {
            let sprite = gameObject.textureKey;
            self.opponentCards.shift().destroy();
            self.dropZone.data.values.cards++;
            let card = new Card(self);
            card.render(((self.dropZone.x - 450) + (self.dropZone.data.values.cards * 100)), 
                        (self.dropZone.y), sprite).disableInteractive();
        }
    })

    this.dealText.on("pointerdown", function() {
        self.socket.emit('dealCards');
    })

    this.dealText.on("pointerover", function() {
        self.dealText.setColor('#ff69b4')
    })

    this.dealText.on('pointerout', function () {
        self.dealText.setColor('#00ffff');
    })

    this.input.on("drag", function(pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
    })

    this.input.on("dragstart", function(pointer, gameObject) {
        gameObject.setTint('0xff69b4');
        self.children.bringToTop(gameObject);
    })

    this.input.on("dragend", function(pointer, gameObject, dropped) {
        gameObject.setTint();
        if (!dropped) {
            gameObject.x = gameObject.input.dragStartX
            gameObject.y = gameObject.input.dragStartY
        }
    })

    this.input.on('drop', function (pointer, gameObject, dropZone) {
        dropZone.data.values.cards++;
        gameObject.x = (dropZone.x - 450) + (dropZone.data.values.cards * 100);
        gameObject.y = dropZone.y;
        gameObject.disableInteractive();
        self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
    })

}

update() {

}

}