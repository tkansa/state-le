import Guess from './Guess';
import { getCompassDirection, getDistance } from 'geolib';
import { getDirectionEmoji } from '../domain/directions';
import GuessRow from './GuessRow';
import { State } from '../domain/state';
import { states } from '../domain/states';
import { useEffect, useState } from 'react';
import './GameBoard.css';

function GameBoard() {

  let [guesses, setGuesses] = useState<string[]>([]);
  let [guessResults, setGuessResults] = useState<string[]>([]);
  let [stateName, setStateName] = useState<string>("");
  let [distances, setDistances] = useState<number[]>([]);
  let [directionEmojis, setDirectionEmojis] = useState<string[]>([]);
  let [ gameOver, setGameOver ] = useState<boolean>(false);


  // on startup, pick a random state
  useEffect(() => {
    let index = Math.floor(Math.random() * 26);
    let state: string = states[index].name;
    setStateName(state.toLocaleLowerCase());

  }, []);

  

  console.log(stateName);
  console.log("Arrow: " + '\uFE0F')
  function handleGuess(guess: string): void {
    if(guesses.length === 5){
      setGameOver(true);
    }
    if (guess.toLocaleLowerCase() === stateName) {
      setGameOver(true);
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
      setDirectionEmojis(prev => {
        const newList = prev.slice(0);
        newList.push("🎉");
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
      let guessedState: State | undefined = states.find(s => s.name === guess);
      let distance: number = getDistance({ latitude: state!.latitude, longitude: state!.longitude }, { latitude: guessedState!.latitude, longitude: guessedState!.longitude }) / 1609;
      distance = Math.round(distance);
      setDistances(prev => {
        const newList = prev.slice(0);
        newList.push(distance);
        return newList;
      });

      let compassDirection: string = getCompassDirection({ latitude: guessedState!.latitude, longitude: guessedState!.longitude }, { latitude: state!.latitude, longitude: state!.longitude });
      debugger;
      let directionEmoji: string = getDirectionEmoji(distance, compassDirection);
      setDirectionEmojis(prev => {
        const newList = prev.slice(0);
        newList.push(directionEmoji);
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
        <Guess onSubmit={handleGuess} gameOver={gameOver} />
        <table>
          <thead>
            <tr>
              <th className='guess-number'>#</th>
              <th className='guess'>Guess</th>
              <th className='distance'>Distance</th>
              <th className='direction'>Direction</th>
            </tr>
          </thead>
          <tbody>
          {guesses.length > 0 &&
            guesses.map((guess, i) => <GuessRow key={i} guessNumber={i + 1} guess={guess} distance={distances[i]} direction={directionEmojis[i]}></GuessRow>)}
          </tbody>
        </table>
        <div>{gameOver && <p>Learn more: <a href={`https://en.wikipedia.org/wiki/${stateName}`} target="_blank">{stateName}</a></p>}</div>
      </div>
      <footer className="footer">State images courtesy of <a href="https://suncatcherstudio.com/" target="_blank">Sun Catcher Studio</a> | Inspired by <a href="https://worldle.teuteuf.fr/" target="_blank">Worldle</a></footer>
    </div>
  );
}

export default GameBoard;