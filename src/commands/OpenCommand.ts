import AbstractCommand from "./AbstractCommand";
import Room from "../model/Room";
import Player from "../model/Player";
import Item from "../model/Item";

/**
 * Command for opening items that can be opened
 */
export default class OpenCommand extends AbstractCommand {

    supportedVerbs = ['open'];
    supportedNouns = ['box'];

    public execute(currentRoom:Room, player:Player):Object {
        console.log('Executing', this.constructor.name);

        if(this.matchedVerb === 'open'){
            // find out if any of the words match with tags of items in the room
            let item:Item = currentRoom.getItemMatchingTags(this.inputParts);
            if(item !== null && item.contains instanceof Item){

                let foundItem = item.contains;

                // the contained item now becomes part of the room, and the opened item disappears
                currentRoom.addItem(foundItem);
                currentRoom.removeItem(item);

                return "You opened "+item.description+" and it contains "+foundItem.description+". What a surprise!";

            } else if(item !== null && item.open === null){
                return "You tried to " + this.matchedVerb + " " + item.description + " but it does not want to open";
            }
        }
        
        return null;
    }
    
}