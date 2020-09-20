export default class Card {
    constructor(scene) {
        this.render = (x, y, sprite) => {
            let card = scene.add.image(x, y, sprite);
            card.setScale(0.15, 0.15).setInteractive();
            scene.input.setDraggable(card);
            return card;
        }
    }
}