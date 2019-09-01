import AbstractCommand from "./AbstractCommand";
import Room from "../model/Room";
import Player from "../model/Player";

export default class HelpCommand extends AbstractCommand {

    /**
     * @override
     */
    supportedVerbs: Array<string> = ['help'];

    public execute(currentRoom:Room, player:Player){
        return 'The following instructions are available to you when playing this game: move, walk, go, run, swim, take, put, drop, throw, kill, inventory. To move around, you can use the compass directions, as well as up and down.'
    }
}