import * as PIXI from 'pixi.js'
import { Game } from './game'
import { HealthBar } from './healthbar'

export class Worm extends PIXI.AnimatedSprite {

   
    private game: Game
    private speedX: number = 0
    private frames: PIXI.Texture[][] = []
    private previousFrame: number = -1
    private healthbar: HealthBar
   

    constructor(game: Game, textures: PIXI.Texture[][], x: number, y: number,) {
        super(textures[0])
        this.game = game
        this.frames = textures
        /*
         * An AnimatedSprite inherits all the properties of a PIXI sprite
         * so you can change its position, its anchor, mask it, etc
         */

        this.x = 1200
        this.y = 600
        this.scale.set(5)
        this.animationSpeed = 0.06;
        this.loop = true
        this.anchor.set(0.5)
        this.play();

        this.game.pixi.stage.addChild(this);
        // this.onComplete = () => this.destroy()
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))

        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
        
        // this.healthbar = new HealthBar(0, 0, 100, 0x00FF00, 0xff0000)
        // this.addChild(this.healthbar)

        

    }

    public update(delta: number): void {
        super.update(delta)
        this.x += this.speedX * delta

       
    }


    

    onKeyDown(e: KeyboardEvent): any {

        switch (e.key.toUpperCase()) {
            // case "A":
            // case "ARROWLEFT":
            //     this.speedX = -3
            //     this.scale.set(-5, 5)
            //     this.healthbar.scale.set(-1, 1)
            //     this.setFrames(1)
            //     break
            // case "D":
            // case "ARROWRIGHT":
            //     this.speedX = 3
            //     this.scale.set(5)
            //     this.healthbar.scale.set(1)
            //     this.setFrames(1)
            //     break
            case "Q":
                this.scale.set(5)
                this.setFrames(2)
                
                // if(this.y > 0){
                //    this.scale.set(-1, 4)
                // } else{
                //     this.scale.set(4,4)
                // }
        }
    }

    onKeyUp(e: KeyboardEvent): any {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "Q":    
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.speedX = 0
                this.setFrames(0)
                break
        }
    }

    public wormHit(){
        this.scale.set(5)
         this.setFrames(2)
         this.loop = false
         
         
     }       

     public wormIdle(){
         this.setFrames(0)
         this.scale.set(5)
         this.loop= true
     }

     public wormDamage(){
         this.setFrames(1)
         this.scale.set(5)
         this.loop = false
     }

    private setFrames(frame: number) {
        if(this.previousFrame != frame) {
            console.log("set frames");
            this.textures = this.frames[frame]
            this.loop = true
            this.play()
            this.previousFrame = frame
        }
    }
}