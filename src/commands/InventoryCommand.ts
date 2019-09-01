import Room from "../model/Room";
import AbstractCommand from "./AbstractCommand";
import Player from "../model/Player";

/**
 * Command for showing the current inventory of the player
 */
export default class InventoryCommand extends AbstractCommand {

    supportedVerbs: Array<string> = ['show inventory', 'inventory'];

    public execute(currentRoom:Room, player:Player): Object{
        
        let rtn:Array<string> = [];

        player.inventory.forEach(element => {
            rtn.push(element.description);
        });

        if(rtn.length === 0){
            return "You are not carrying anything... how sad :(";
        } else {
            return "You are carrying \r\n\r\n" + rtn.join(',\r\n');
        }
    }

}