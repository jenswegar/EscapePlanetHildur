import World from "./World";
import Room from "./Room";
import CommandParser from "./CommandParser";
import StartCommand from "../commands/StartCommand";
import Player from "./Player";
import HelpCommand from "../commands/HelpCommand";

export default class Engine {

    document: Document;
    display: Element;
    cli: Element;
    cliForm: Element;

    gameModel: World;
    commandParser: CommandParser;

    currentRoom: Room;

    player:Player;

    constructor(document: Document, gameModel:World, commandParser: CommandParser){  
        this.document = document;
        this.gameModel = gameModel;
        this.commandParser = commandParser;
    }

    initGame(){

        this.display = this.document.getElementById('display');
        this.cli = this.document.getElementById('cli');
        this.cliForm = this.document.getElementById('cliForm');
        this.cliForm.onsubmit = this.onCommandSubmit.bind(this);


        this.player = new Player();

        this.clearDisplay();

        this.currentRoom = this.gameModel.getRoom(0);
        this.outputText(this.currentRoom.description);
        this.cli.focus();
    }

    onCommandSubmit(e){
        e.preventDefault();
        this.gameLoop();
        this.cli.value = '';
    }

    clearDisplay(){
        this.display.textContent = '';
    }

    gameLoop(){

        // get the current command from the cli and parse
        let command = this.commandParser.parseInput(this.cli.value);

        // if we are in the starting room but the command is not the StartCommand, do nothing except maybe output som random gibberish
        if(this.currentRoom.roomNr === 0 && (command instanceof StartCommand) !== true && (command instanceof HelpCommand) !== true ){
            this.outputText(this.currentRoom.description);
            return;
        }

        let rtn = command.execute(this.currentRoom, this.player);
        console.log(rtn);
        if(typeof rtn  === 'string'){
            this.outputText(rtn);
        } else if(typeof rtn === 'number') {
            // we moved to a new room, display the description and set as current
            this.changeRoom(this.gameModel.getRoom(rtn));
        } else if(rtn instanceof StartCommand){
            this.changeRoom(this.gameModel.getRoom(1));
        }
    }

    outputText(text: string){
        this.clearDisplay();
        this.display.textContent = text;
    }

    changeRoom(nextRoom:Room){
        this.currentRoom = nextRoom;
        this.outputText(this.currentRoom.description);
    }
}