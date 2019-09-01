import Room from "../model/Room";
import AbstractCommand from "./AbstractCommand";
import Player from "../model/Player";

/**
 * Command for starting the game. 
 * 
 * This is marked as a single use command and can only be used again if the player 'resets' the game or reloads the page.
 */
export default class StartCommand extends AbstractCommand {

    supportedVerbs: Array<string> = ['start'];
    supportedNouns: Array<string> = [];

    public execute(currentRoom:Room, player:Player): Object{
        this.numTimesCalled++;
        return this;
    }

}