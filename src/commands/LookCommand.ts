import AbstractCommand from "./AbstractCommand";
import Room from '../model/Room';
import Player from "../model/Player";

export default class LookCommand extends AbstractCommand{

    supportedVerbs = ['look', 'investigate'];
    supportedNouns = ['around', 'surroundings', 'space'];

    public execute(currentRoom: Room, player:Player): Object {

        console.log('Executing', this.constructor.name, currentRoom);

        let matchedNoun:string = null;
        
        // check if the input parts contain one of the supported nouns
        this.supportedNouns.forEach( (n:string) => {
            if(this.inputParts.indexOf(n) > -1){
                matchedNoun = n;
            }
        })

        if(matchedNoun === 'around'){
            let desc = currentRoom.getRoomItemDescriptions() ? currentRoom.getRoomItemDescriptions() : 'nothing...';
            return 'You see ' + desc;
        } else {
            return 'You look vacantly into the distance, contemplating the relevance of ice in icecream...';
        }
    }
}