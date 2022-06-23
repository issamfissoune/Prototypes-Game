import * as PIXI from 'pixi.js'
import { Game } from './game'
import { HealthBar } from './healthbar'

export class FinnTheHuman extends PIXI.AnimatedSprite {

    private game: Game
    private speedX: number = 0
    // private speedY: number = 0
    private frames: PIXI.Texture[][] = []
    private previousFrame: number = -1
    private healthbar: HealthBar
    private swordSlash:HTMLAudioElement

    constructor(game: Game, textures: PIXI.Texture[][], x: number, y: number, sound:HTMLAudioElement) {
        super(textures[0])

        this.swordSlash = sound
        this.game = game
        this.frames = textures
        /*
         * An AnimatedSprite inherits all the properties of a PIXI sprite
         * so you can change its position, its anchor, mask it, etc
         */

        this.x = x
        this.y = 600
        this.scale.set(5)
        this.animationSpeed = 0.05;
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
            case "A":
            case "ARROWLEFT":
                this.speedX = -3
                this.scale.set(-5, 5)
                // this.healthbar.scale.set(-1, 1)
                this.setFrames(1)
                break
            case "D":
            case "ARROWRIGHT":
                this.speedX = 3
                this.scale.set(5)
                // this.healthbar.scale.set(1)
                this.setFrames(1)
                break
            case "Q":
                //this.swordSlash.play()
                if (this.swordSlash.paused) {
                    this.swordSlash.play();
                }else{
                    this.swordSlash.currentTime = 0
                }
                this.scale.set(5)
                this.setFrames(3)
                
        
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

    private setFrames(frame: number) {
        if(this.previousFrame != frame) {
            console.log("set frames");
            this.textures = this.frames[frame]
            this.loop = true
            this.play()
            this.previousFrame = frame
        }
    }

    onButtonDown() {
       
        this.setFrames(3)
        console.log("working")
        }

    onButtonUp() {
           
        this.setFrames(0)    
            
        }  
        
    public finnHit(){
        this.scale.set(5)
         this.setFrames(3)
         this.loop = false
         
         
     }       

     public finnIdle(){
         this.setFrames(0)
         this.scale.set(5)
         this.loop= true
     }

     public finnDamage(){
         this.setFrames(2)
         this.scale.set(5)
         this.loop = false
     }
}
