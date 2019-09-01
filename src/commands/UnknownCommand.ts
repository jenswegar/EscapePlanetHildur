import AbstractCommand from "./AbstractCommand";
import Room from "../model/Room";
import Player from "../model/Player";

export default class UnknownCommand extends AbstractCommand {

    supportedVerbs: Array<string> = [];

    public execute(currentRoom:Room, player:Player){
        console.log('Executing', this.constructor.name);
        return 'You tried to ' + this.inputStr + ' but your efforts were in vain :( Try something different.';
    }
}