import Engine from './model/Engine';
import World from './model/World';
import CommandParser from './model/CommandParser';

import data from './data.json';


let gameWorld = new World(data);

// load game data
let engine = new Engine(document, gameWorld, new CommandParser());
engine.initGame();

