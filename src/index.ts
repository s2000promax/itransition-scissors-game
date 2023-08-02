import { GameController } from './controller/gameController.ts';

const newGame = new GameController(process.argv.slice(2));
newGame.playGame();
