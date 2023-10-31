"use strict"
import {colors} from './components/colors.js';
import {words} from './components/words.js';
import Game from './components/Game.js';

const game = new Game(words, colors);
game.start();