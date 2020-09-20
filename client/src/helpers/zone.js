export default class Zone {
    constructor(scene) {
        this.renderZone = () => {
            let dropzone = scene.add.zone(700, 300, 850, 150);
            dropzone.setRectangleDropZone(850, 150);
            dropzone.setData({ cards: 0 });
            return dropzone;
        }
        
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(4, 0xff69b4);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, 
                                       dropZone.y - dropZone.input.hitArea.height / 2, 
                                       dropZone.input.hitArea.width, dropZone.input.hitArea.height)
        }
    }
}