import AbstractCommand from "./AbstractCommand";
import Room from "../model/Room";
import Player from "../model/Player";
import Item from "../model/Item";

/**
 * Command for picking up and leaving items in the world
 */
export default class TakeDropCommand extends AbstractCommand {

    supportedVerbs = ['take', 'pick', 'drop', 'leave'];

    public execute(currentRoom:Room, player:Player):Object {
        console.log('Executing', this.constructor.name);

        if(this.matchedVerb === 'take' || this.matchedVerb === 'pick'){
            return this.takeItem(currentRoom, player);
        } else if(this.matchedVerb === 'drop' || this.matchedVerb === 'leave'){
            return this.leaveItem(currentRoom, player);
        }
        
        return null;
    }

    protected takeItem(currentRoom:Room, player:Player):string {
        // find out if any of the words match with tags of items in the room
        let item:Item = currentRoom.getItemMatchingTags(this.inputParts);

        if(item !== null && item.isCarryable){
            let accepted = player.addItem(item);
            if(accepted === true){
                currentRoom.removeItem(item);
                return "You picked up "+item.description;
            } else {
                return "You tried to take "+item.description+" but it just didn't work.";
            }
        } else if(item !== null && !item.isCarryable){
            return "You tried to " + this.matchedVerb + " " + item.description + " but it just won't move."
        } else {
            return "You tried to "+this.inputStr+", but end up just fondling around in the air a bit.";
        }
    }

    protected leaveItem(currentRoom:Room, player:Player):string {

        // find out if any of the words match with tags of items in the room
        let item:Item = player.getItemMatchingTags(this.inputParts);

        if(item !== null){
            let removed = player.removeItem(item);

            currentRoom.addItem(removed);

            return "You left "+item.description+ " behind. Hope you don't need it anymore.";
        } else {
            return "You tried to " + this.inputStr+ " behind, but life is cruel...";
        }
    }
    
}