# Escape Planet Hildur
An attempt at a text based adventure game. 


## To run the game locally

Clone this repository and do a ```npm install``` followed by ```npm run start:dev```. This should make the game available at http://localhost:1234


## Structure

The game world is basically completely modelled in the ```data.json``` file found in the root of the ```src``` folder. The json file is parsed when the game loads in the browser, and a corresponding tree of rooms and items is created for the player to explore.


## Storyboard

The storyboard xml can be opened using Draw.io. It's used to map out which rooms connect where.