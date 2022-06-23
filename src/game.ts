import * as PIXI from "pixi.js"
import { FinnTheHuman } from "./FinnTheHuman"
import { HealthBar } from "./healthbar"
import { Worm } from "./worm"
import { Question} from "./question"
import { Possibility } from "./possibility"


export class Game {
    private finnTheHuman: FinnTheHuman
    private _pixi: PIXI.Application
    background: PIXI.Texture
    private worm: Worm
    private heart: PIXI.Sprite;
    private heart2: PIXI.Sprite
    private backgroundMusic: HTMLAudioElement
    private battleMusic: HTMLAudioElement
    qBox: PIXI.Texture
    // healthbar: HealthBar
    loader: PIXI.Loader

    finHP: PIXI.Sprite[] = []
    wormHP: PIXI.Sprite[] = []

    // Properties
    
    public get pixi(): PIXI.Application { return this._pixi }

    constructor(pixi: PIXI.Application, loader: PIXI.Loader) {
        PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
        this._pixi = pixi

        this.loader = loader

        this.init()
    }

    public init() {
        let background : PIXI.Texture = PIXI.Texture.from("city2")
        let backgroundSprite =  new PIXI.Sprite(background)
        backgroundSprite.scale.set(0.75)
        this._pixi.stage.addChild(backgroundSprite)
        
        this.backgroundMusic = this.loader.resources["backgroundMusic"].data!
        this.backgroundMusic.play()
       
        let wormFrames: PIXI.Texture [] [] = this.createWormFrames()
        this.worm = new Worm(this, wormFrames, 50, 50)
        
        let frames: PIXI.Texture [][] = this.createFinnFrames()
        let sound = this.loader.resources["swordSlash"].data!
        this.finnTheHuman = new FinnTheHuman(this, frames, 50, 50, sound)

        this._pixi.ticker.add((delta: number) => this.update(delta))
       
    }

    private update(delta: number) {
        if(this.collision(this.finnTheHuman, this.worm)){
            console.log("player touches enemy 💀")
            this.battleMusic = this.loader.resources["battleMusic"].data!
            this.battleMusic.play()
            this.backgroundMusic.pause()
            this.finnTheHuman.x = 600
            this.worm.x = 800
            let last = this.finHP.pop()
            this.pixi.stage.removeChild(last)
            let last2 = this.wormHP.pop()
            this.pixi.stage.removeChild(last2)
            let question = new Question(750,300,"Wat is een divergente beweging")
        this._pixi.stage.addChild(question)

        for(let i = 0; i<3; i++){
            this.heart = new PIXI.Sprite(this.loader.resources["heart"].texture!)
            this.heart.scale.set(0.2)
            this.heart.x = 80 * i + 100
            this.heart.y = 20
            this.finHP.push(this.heart)
            this.pixi.stage.addChild(this.heart)
        }

        for(let i = 0; i<3; i++){
            this.heart2 = new PIXI.Sprite(this.loader.resources["heart"].texture!)
            this.heart2.scale.set(0.2)
            this.heart2.x = 80 * i + 1115
            this.heart2.y = 20
            this.wormHP.push(this.heart2)
            this.pixi.stage.addChild(this.heart2)
        }

        let answers: Possibility[] = []
        let antwoord1 = new Possibility(750, 350 ,"b", false)
        let antwoord2 = new Possibility(600, 350, "a", true)
        let antwoord3 = new Possibility(900, 350, "c", false)
        this._pixi.stage.addChild(antwoord1, antwoord2, antwoord3)
        answers.push(antwoord1, antwoord2, antwoord3)
        
        antwoord1.interactive = true;
        antwoord1.buttonMode = true;
        antwoord1.on('mousedown', () => this.onButtonDown())
        antwoord1.on('mouseup', () => this.onButtonUp())
        
        antwoord2.interactive = true;
        antwoord2.buttonMode = true;    
        antwoord2.on('mousedown', () => this.onButtonDown2())
        antwoord2.on('mouseup', () => this.onButtonUp2())
        

       

        let OpponentImage = PIXI.Texture.from("FinnIdle1.png")
        let OpponentImageSprite = new PIXI.Sprite(OpponentImage)
        this._pixi.stage.addChild(OpponentImageSprite)
        OpponentImageSprite.scale.set(6)
        OpponentImageSprite.y = 70
        OpponentImageSprite.x = 35
        OpponentImageSprite.anchor.set(0.5)

        let OpponentImage2 = PIXI.Texture.from("wormDie1.png")
        let OpponentImageSprite2 = new PIXI.Sprite(OpponentImage2)
        this._pixi.stage.addChild(OpponentImageSprite2)
        OpponentImageSprite2.scale.set(7)
        OpponentImageSprite2.y = 50
        OpponentImageSprite2.x = 1410
        OpponentImageSprite2.anchor.set(0.5)
        
        let versus = PIXI.Texture.from("versus")
        let versusSprite = new PIXI.Sprite(versus)
        this._pixi.stage.addChild(versusSprite)
        versusSprite.x = 600
        versusSprite.y = 0
        versusSprite.scale.set(0.40)
       
    
    }

       
        
        this.finnTheHuman.update(delta)
    }

    onButtonDown(): void {
        this.finnTheHuman.finnHit()
        this.worm.wormDamage()
        let last2 = this.wormHP.pop()
        this.pixi.stage.removeChild(last2)
       
     }

    onButtonUp(): void {
        this.finnTheHuman.finnIdle()
        this.worm.wormIdle()
    }
    
    onButtonDown2(): void {
        this.worm.wormHit
        this.finnTheHuman.finnDamage()
        let last = this.finHP.pop()
        this.pixi.stage.removeChild(last)

       
     }

    onButtonUp2(): void {
        this.worm.wormIdle()
        this.finnTheHuman.finnIdle()

    }
   

    private createFinnFrames(): PIXI.Texture[][] {
        // create an array of textures from an image path
        let idle: PIXI.Texture[] = [];
        let run : PIXI.Texture[] = [];
        let damage: PIXI.Texture[]= [];
        let attack : PIXI.Texture[] = [];
        let death: PIXI.Texture[] = [];
        for (let i = 1; i <= 9; i++) {
            // magically works since the spritesheet was loaded with the pixi loader
            
            idle.push(PIXI.Texture.from(`FinnIdle${i}.png`));
        }

        for(let i = 1; i<=7; i++){
            run.push(PIXI.Texture.from(`FinnSpriteRun${i}.png`))
        }
        
        for(let i = 1; i<=3; i++){
            damage.push(PIXI.Texture.from(`FinnDamage${i}.png`))
        }

       
        for(let i = 1; i<=5; i++){
            attack.push(PIXI.Texture.from(`FinnAttack${i}.png`))
        }

        for(let i= 1; i<= 5; i++){
            death.push(PIXI.Texture.from(`FinnDead${i}.png`))
        }


        return [idle, run, damage, attack, death];
        
        
        
    }

    private createWormFrames (): PIXI.Texture[][]{
        let idleWorm: PIXI.Texture[] = [];
        let damageWorm: PIXI.Texture[]= [];
        let jumpWorm : PIXI.Texture[] = [];
        let deathWorm: PIXI.Texture[] = [];
        for (let i = 1; i <= 8; i++) {
            // magically works since the spritesheet was loaded with the pixi loader
            
            idleWorm.push(PIXI.Texture.from(`WormIdle${i}.png`));
        }

        for(let i = 1; i<=4; i++){
            damageWorm.push(PIXI.Texture.from(`wormDamage${i}.png`))
        }
        
        for(let i = 1; i<=8; i++){
            jumpWorm.push(PIXI.Texture.from(`wormJump${i}.png`))
        }

       
        for(let i = 1; i<=6; i++){
            deathWorm.push(PIXI.Texture.from(`wormDie${i}.png`))
        }

        


        return [idleWorm, damageWorm, jumpWorm, deathWorm];
        
        
        
    }

    collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }

}