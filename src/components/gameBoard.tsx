import Guess from './Guess';
import { getDistance } from 'geolib';
import { State } from '../domain/state';
import { states } from '../domain/states';
import { useEffect, useState } from 'react';
import './GameBoard.css';

function GameBoard() {

  let [geusses, setGuesses] = useState<string[]>([]);
  let [ guessResults, setGuessResults ] = useState<string[]>([]);
  let [stateName, setStateName] = useState<string>("");
  let [ distances, setDistances ] = useState<number[]>([]);


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
      setDistances(prev => {
        const newList = prev.slice(0);
        newList.push(0);
        return newList;
      });
    }
    else {
      setGuessResults(prev => {
        const newList = prev.slice(0);
        newList.push("Wrong! Try again.");
        return newList;
      });
      let state: State | undefined = states.find(s => s.name.toLocaleLowerCase() === stateName);
      let guessedState : State | undefined = states.find(s => s.name === guess);
      let distance: number = getDistance({ latitude: state!.latitude, longitude: state!.longitude}, {latitude: guessedState!.latitude, longitude: guessedState!.longitude}) / 1000;
      console.log(distance);
      setDistances(prev => {
        const newList = prev.slice(0);
        newList.push(distance);
        return newList;
      });
    }
    setGuesses(prev => {
      const newList = prev.slice(0);
      newList.push(guess);
      return newList;
    });
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
            geusses.map((guess, i) => <p key={i}>Guess {i + 1}: {guess} | {guessResults[i]} You are {distances[i]} kilometers off.</p>)}
        </div>
      </div>
      <footer className="footer">State images courtesy of <a href="https://suncatcherstudio.com/" target="_blank">Sun Catcher Studio</a></footer>
    </div>
  );
}

export default GameBoard;