import Guess from './Guess';
import { states } from '../domain/states';
import { useEffect, useState } from 'react';
import './GameBoard.css';

function GameBoard() {

  let [ geusses, setGuesses ] = useState<string[]>([]);
  let [ stateName, setStateName ] = useState<string>("");

 
  useEffect(() => {
    let index = Math.floor(Math.random() * 7);
    let state: string = states[index].name;
    setStateName(state);
    
  }, []);

console.log(stateName);
  function handleGuess(guess: string): void {
   // console.log(guess);
    setGuesses(prev => {
      const newList = prev.slice(0);
      newList.push(guess);
      return newList;
    })
  }

  return (
    <div className="GameBoard">
      <h1>State-le</h1>
       <div>{
        stateName.length > 1 && <img className="state-container" src={'../images/nevada.png'} alt="State to Guess"/>
        }</div> 
      <Guess onSubmit={handleGuess} />
      <div>
        {geusses.length > 0 &&
          geusses.map((guess, i) => <p key={i}>Guess {i + 1}: {guess}</p>)}
      </div>
    </div>
  );
}

export default GameBoard;