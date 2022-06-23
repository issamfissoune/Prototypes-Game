import * as PIXI from 'pixi.js'
import backgroundImage2 from './images/City2.png'
import backgroundImage from './images/City1.png'
import croppedbutton2 from './images/croppedbutton2.png'
import croppedbuttonDown2 from './images/croppedbuttonDown2.png'
import textBox from './images/textBox.png'
import swordSlash from 'url:./sounds/swordSlash.mp3'
import backgroundMusic from "url:./sounds/Lake.mp3"
import battleMusic from "url:./sounds/battlemusic.mp3"
import dirt from './images/dirt.png'
import versus from './images/vs3.png'
import heart from "./images/heartHealth.png"
import cBackground from "./images/CharacterBackgrund.png"
import background from "./images/startScreenBG.png"
import answerBox from "./images/answerBox.png"
import { Lobby } from './lobby'

type AssetFile = { name: string, url: string }

export class Assets extends PIXI.Loader {

    // private game: Game
    private assets: AssetFile[] = []

    constructor(lobby: Lobby) {
        super()
        // this.game = game
        console.log("hi")
        this.assets = [
           
            {name : "swordSlash", url : swordSlash },
            {name: "backgroundMusic", url: backgroundMusic},
            {name: "battleMusic", url: battleMusic},
            {name : "croppedbutton2", url: croppedbutton2 },
            {name : "croppedbuttonDown2", url: croppedbuttonDown2 },
            {name: "backgroundImage", url: backgroundImage},
            {name: "All_Moves", url: "FinnCompleteSheet.json"},
            {name: "city2", url: backgroundImage2},
            {name: "worm", url: "wormSpritesheet.json"},
            {name: "textBox", url:textBox},
            {name: "dirt", url: dirt},
            {name: "versus", url: versus},
            {name: "heart", url: heart},
            {name: "cBackground", url: cBackground},
            {name: "startScreenBG", url: background},
            {name:"answerBox", url: answerBox},
            
        ] 

        this.assets.forEach(asset => {
            this.add(asset.name, asset.url)
        })

        this.onError.add((arg) => { console.error(arg) })
        this.onProgress.add((loader) => this.showProgress(loader))
        this.load(() => lobby.doneLoading())
    }

    private showProgress(loader) {
        console.log(`Loading ${loader.progress}%`)
    }
}