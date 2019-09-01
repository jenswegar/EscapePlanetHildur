import HelpCommand from "../commands/HelpCommand";
import AbstractCommand from "../commands/AbstractCommand";
import UnknownCommand from "../commands/UnknownCommand";
import GoCommand from "../commands/GoCommand";
import StartCommand from "../commands/StartCommand";
import CurrentLocationCommand from "../commands/CurrentLocationCommand";
import LookCommand from "../commands/LookCommand";
import TakeDropCommand from "../commands/TakeDropCommand";
import InventoryCommand from "../commands/InventoryCommand";
import OpenCommand from "../commands/OpenCommand";

/**
 * Parses the input that the player writes and attempts to extract a command from it.
 * 
 * These are basically our verbs + a few special actions
 * 
 * e.g. help, invetory, go, walk, swim
 */

const commands : Set<AbstractCommand> = new Set();
commands.add(new HelpCommand());
commands.add(new StartCommand());
commands.add(new CurrentLocationCommand());
commands.add(new GoCommand());
commands.add(new LookCommand());
commands.add(new TakeDropCommand());
commands.add(new InventoryCommand());
commands.add(new OpenCommand());


export default class CommandParser {

    parseInput(val: string){
        let rtn:AbstractCommand = null;
        
        console.log('input:', val);
        // ensure we remove spaces
        let cleaned = val.trim().toLocaleLowerCase();
        if(cleaned !== ''){

            // split at word boundary
            let parts = cleaned.split(' ');

            // naive approach: test each word in the input against a command verb
            parts.forEach((word:string) => {
                commands.forEach((c) => {
                    if(c.supportsVerb(word)){
                        console.log('matched ', c);
                        c.setMatchedVerb(word);
                        c.setInputParts(parts);
                        c.setInput(cleaned);
                        rtn = c;
                    }
                });
    
            })
        } 

        // if we still don't have a command, execute the unknown command
        if(rtn === null){
            rtn = new UnknownCommand();
            rtn.setInput(cleaned);
        }
        
        return rtn;
    }
}