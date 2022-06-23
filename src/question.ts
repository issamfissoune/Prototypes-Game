import * as PIXI from 'pixi.js'



export class Question extends PIXI.Sprite {

    constructor(x: number, y: number, vraag: string) {

        // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        super(PIXI.Texture.from("textBox"))



        this.x = x
        this.y = y



        this.scale.set(2)
        this.anchor.set(0.5)



        let style = new PIXI.TextStyle({

            fontFamily: 'ArcadeFont',
            fontSize: 12,
            fontWeight: 'bold',
            fill: '#00ff99',
            align: "center"

        })



        let vraag1 = new PIXI.Text(vraag, style);

        vraag1.x = 0
        vraag1.anchor.set(0.5)



        // vraag1.y = 100

        this.addChild(vraag1)
    }

}