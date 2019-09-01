import Room from "../model/Room";
import Player from "../model/Player";


export default abstract class AbstractCommand {

    supportedVerbs: Array<string> = [];
    matchedVerb:string = null;
    
    supportedNouns: Array<string> = [];

    inputParts:Array<string> = [];
    inputStr:string = null;

    numTimesCalled:number = 0;

    public abstract execute(currentRoom:Room, player:Player) :Object;

    /**
     * 
     * @param verb The verb to test for
     * @returns true if the given word is in the list of verbs that this command supports, false otherwise
     */
    supportsVerb(verb: string){
        return this.supportedVerbs.indexOf(verb) > -1;
    }

    /**
     * 
     * @param noun The noun to test for
     * @returns true if the given word is in the list of nouns that this command supports, false otherwise
     */
    supportsNoun(noun: string){
        return this.supportedNouns.indexOf(noun) > -1;
    }


    setInputParts(parts: Array<string>){
        this.inputParts = parts;
    }

    setInput(str:string){
        this.inputStr = str;
    }

    setMatchedVerb(str:string){
        this.matchedVerb = str;
    }

    getInputNoun():string {
        let matchedNoun = null;
        // check if the input parts contain one of the supported nouns
        this.supportedNouns.forEach( (n:string) => {
            if(this.inputParts.indexOf(n) > -1){
                matchedNoun = n;
            }
        })

        return matchedNoun;
    }

    /**
     * returns true if this command has been called at least once during the game
     */
    calledOnce(){
        return this.numTimesCalled > 0;
    }

}