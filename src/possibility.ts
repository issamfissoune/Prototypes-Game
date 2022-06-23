import * as PIXI from 'pixi.js'



export class Possibility extends PIXI.Sprite {

    constructor(x: number, y: number, antwoord: string, correct: boolean) {

        // PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

        super(PIXI.Texture.from("answerBox"))



        this.x = x
        this.y = y
        // this.scale.set(6)



        this.scale.set(2)
        this.anchor.set(0.5)



        let style = new PIXI.TextStyle({

            fontFamily: 'ArcadeFont',
            fontSize: 12,
            fontWeight: 'bold',
            fill: '#00ff99',
            align: "center"

        })



        let answer = new PIXI.Text(antwoord, style);

        answer.x = 0
        answer.anchor.set(0.5)



        // vraag1.y = 100

        this.addChild(answer)
    }

}