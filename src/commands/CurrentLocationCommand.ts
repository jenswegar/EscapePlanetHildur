import Room from "../model/Room";
import AbstractCommand from "./AbstractCommand";
import Player from "../model/Player";

/**
 * Command for letting the player know where they are again
 */
export default class CurrentLocationCommand extends AbstractCommand {

    supportedVerbs: Array<string> = ['where'];

    public execute(currentRoom:Room, player:Player): Object{

        console.log('Executing', this.constructor.name, currentRoom);

        return currentRoom.roomNr;
    }

}