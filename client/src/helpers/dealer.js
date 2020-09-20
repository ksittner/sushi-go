import Card from './card.js';

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let opponentSprite;
            if (scene.isPlayerA) {
                playerSprite = 'CyanCardFront';
                opponentSprite = 'MagentaCardBack';
            }
            else {
                playerSprite = 'MagentaCardFront';
                opponentSprite = 'CyanCardBack';
            }
            for (let i = 0; i < 8; i++) {
                let playerCard = new Card(scene);
                playerCard.render(250 + (i * 100), 450, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(250 + (i * 100), 70, opponentSprite).disableInteractive());
            }
        }
    }
}
