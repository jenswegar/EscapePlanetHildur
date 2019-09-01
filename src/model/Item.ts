
/**
 * Represents an object that can be manipulated by the user, either by opening it, picking it up, using it on some other object
 */
export default class Item {

    /**
     * The unique id of this item, for indexing.
     */
    id:number;
    
    /**
     * Short name of the item, mainly used in the inventory list.
     */
    name:string;
    
    /**
     * A long description of the item giving hints to how it could be used.
     */
    description:string;
    
    /**
     * Where is the item located (0 = in the player inventory, 9999 = used and discarded)
     */
    location:number;

    /**
     * True if this item can be carried by the player, false otherwise.
     */
    isCarryable:boolean;

    /**
     * If the item can be opened, e.g is a box, this references the item that is shown once opened
     */
    contains:Item = null;

    /**
     * An array of words that this item will match against, e.g. flashlight, box, knife
     */
    tags:Array<string> = [];

    /**
     * Determines if the array of input words contains one of the tags this item identifies with.
     * 
     * @param input 
     */
    hasOneOfTags(input:Array<String>){
        for(let i in input){
            let s = input[i];
            if(this.tags.indexOf(s) > -1){
                return true;
            }
        }

        return false;
    }

}