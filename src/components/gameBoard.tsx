import Guess from './guess';
import { states } from '../domain/states'

function GameBoard() {

    function handleGuess(guess: string){
        console.log(guess);
    }

    return (
      <div className="GameBoard">
        <h1>State-le</h1>
        <Guess onSubmit={handleGuess}/>
      </div>
    );
  }
  
  export default GameBoard;