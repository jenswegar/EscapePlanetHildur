import Item from "./Item";


/**
 * Reprensents the player in the game
 * 
 * Contains reference to the current room they're in, the items they're carrying, their health, etc
 */
export default class Player{

    inventory:Map<number, Item> = new Map();


    addItem(item:Item){
        // for now, the player does not have a limit on inventory

        this.inventory.set(item.id, item);

        return true;

    }

    /**
     * Removes an item from the inventory of the player
     * @param item 
     */
    removeItem(item:Item){
        if(this.inventory.has(item.id)){
            this.inventory.delete(item.id);
            return item;
        } else {
            return null;
        }
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
        this.inventory.forEach((val) => {
            console.log(val);
            if(val.hasOneOfTags(inputParts)){
                foundItem = val;
                return;
            }
        })

        return foundItem;
    }    
}