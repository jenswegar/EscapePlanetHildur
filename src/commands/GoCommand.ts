import Room from "../model/Room";
import AbstractCommand from "./AbstractCommand";
import Player from "../model/Player";

/**
 * Command for moving the character from one room to another
 */
export default class GoCommand extends AbstractCommand {

    supportedVerbs: Array<string> = ['go', 'walk', 'run'];
    supportedNouns: Array<string> = ['east', 'west', 'north', 'south', 'up', 'down'];

    public execute(currentRoom:Room, player:Player): Object{

        console.log('Executing', this.constructor.name, currentRoom);

        let matchedNoun = this.getInputNoun();

        let nextRoom = currentRoom.getExit(matchedNoun);

        if(nextRoom === null && matchedNoun !== null){
            return 'You can not '+ this.matchedVerb +' ' + matchedNoun +'.';
        } else if(nextRoom === null && matchedNoun === null){
            return 'You can not '+ this.inputStr +'.';
        }

        return nextRoom;
    }

}