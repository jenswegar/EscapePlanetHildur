import Item from "./Item";

/**
 * A room represents the current location of the player in the world
 * 
 * The room is just a concept for the location of the player,
 * and is used also in cases where the user is not actually in a room, 
 * e.g. a cave, forrest, beach, etc.
 *  
 */
export default class Room {

    /**
     * The id of the room, used to link it to other rooms
     */
    roomNr:number = 0;

    /**
     * Provides the text that is displayed when the player enters the room
     * in order to orient them.
     */
    description:string = '';

    /**
     * A key value map of the directions the user can exit from this room
     * and which room they end up in.
     * 
     * e.g. Direction.SOUTH = 2
     */
    exits: Map<string, number> = new Map();

    /**
     * A key value map of the items currently in the room.
     */
    items: Map<number, Item> = new Map();

    /**
     * If some event has caused this room to be blocked, 
     * this will contain a string describing the event that 
     * prevents the player from entering the room again.
     * 
     * This is also used if the room is never supposed to be entered but we want to show a explanation for why
     */
    blocked:string = null;


    /**
     * Adds an item to the item list of this room
     * @param item 
     */
    addItem(item:Item){
        this.items.set(item.id, item);
    }

    /**
     * Removes an item to the item list of this room
     * @param item 
     */
    removeItem(item:Item){
        if(this.items.has(item.id)){
            this.items.delete(item.id);
        }
    }    

    /**
     * 
     * @param direction The direction key for which to fetch a linked room
     */
    getExit(direction:string){
        if(this.exits.has(direction)){
            return this.exits.get(direction);
        } else {
            return null;
        }
    }

    /**
     * @returns A string of the descriptions of each item in the room.
     */
    getRoomItemDescriptions():string{

        let rtn:Array<string> = [];

        this.items.forEach(element => {
            rtn.push(element.description);
        });

        return rtn.join(', ');
    }

    /**
     * 
     * @param inputParts array of words the player entered in the last command
     * @returns The first item that has a tag matching any of the words in the input, or null if no item matches
     */
    getItemMatchingTags(inputParts: string[]): Item {

        let foundItem = null;

        // FIXME: for some reason for ... of map iteration does not work, probably transpiler messing something up.
        // this will match the last item having the given tag
        this.items.forEach((val) => {
            console.log(val);
            if(val.hasOneOfTags(inputParts)){
                foundItem = val;
                return;
            }
        })

        return foundItem;
    }



}