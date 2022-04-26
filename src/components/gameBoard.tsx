import Guess from './Guess';
import { states } from '../domain/states';
import { useEffect, useState } from 'react';
import './GameBoard.css';

function GameBoard() {

  let [geusses, setGuesses] = useState<string[]>([]);
  let [ guessResults, setGuessResults ] = useState<string[]>([]);
  let [stateName, setStateName] = useState<string>("");


  useEffect(() => {
    let index = Math.floor(Math.random() * 8);
    let state: string = states[index].name;
    setStateName(state.toLocaleLowerCase());

  }, []);

  console.log(stateName);
  function handleGuess(guess: string): void {
    if(guess.toLocaleLowerCase() === stateName){
      setGuessResults(prev => {
        const newList = prev.slice(0);
        newList.push("You got it!!");
        return newList;
      });
    }
    else {
      setGuessResults(prev => {
        const newList = prev.slice(0);
        newList.push("Wrong! Try again.");
        return newList;
      });
    }
    // console.log(guess);
    setGuesses(prev => {
      const newList = prev.slice(0);
      newList.push(guess);
      return newList;
    })
  }

  return (
    <div className="GameBoard">
      <div className="content">
        <h1>State-le</h1>
        <div>{
          stateName.length > 1 && <img className="state-container" src={`../images/${stateName}.png`} alt="State to Guess" />
        }</div>
        <Guess onSubmit={handleGuess} />
        <div>
          {geusses.length > 0 &&
            geusses.map((guess, i) => <p key={i}>Guess {i + 1}: {guess} | {guessResults[i]}</p>)}
        </div>
      </div>
      <footer className="footer">State images courtesy of <a href="https://suncatcherstudio.com/" target="_blank">Sun Catcher Studio</a></footer>
    </div>
  );
}

export default GameBoard;