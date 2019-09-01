import Room from './Room';
import Item from './Item';


/**
 * The World holds the current state of the game
 */
export default class World {

    rooms: Map<Number, Room>;
    items: Map<Number, Item>;

    constructor(data: Object){

        this.rooms = new Map<Number, Room>();
        this.items = new Map<Number, Item>();

        this.initRooms(data.rooms);
        this.initItems(data.items);
    }

    getRoom(id){
        return this.rooms.get(id);
    }

    getItem(id){
        return this.items.get(id);
    }


    initRooms(data:Array<Object>){
        data.forEach(element => {

            let r = new Room();
            r.roomNr = element.id;
            r.description = element.description;

            for(let key in element.exits){
                r.exits.set(key, element.exits[key]);
            }

            for(let key in element.items){
                let item:Item = this.createItem(element.items[key]);
                r.addItem(item);
            }

            this.rooms.set(element.id, r);
        });        
    }

    initItems(data:Array<Object>){
        data.forEach(element => {
            let r = new Item();
            r.id = element.id;
            r.name = element.name;
            r.description = element.description;
            r.location = element.location;
            r.isCarryable = element.isCarryable;

            r.tags = element.tags;

            this.getRoom(r.location).addItem(r);

            this.items.set(r.id, r);
        });
    }

    createItem(element:Object):Item{
        let r = new Item();
        r.id = element.id;
        r.name = element.name;
        r.description = element.description;
        r.isCarryable = element.isCarryable;

        r.tags = element.tags;

        if(element.contains){
            r.contains = this.createItem(element.contains);
        }

        return r;
    }
}