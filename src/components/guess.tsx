import { FormEvent, useState } from 'react';
import { State } from '../domain/state';
import { states } from '../domain/states';

interface Props {
  onSubmit: (guess: string) => void;
  gameOver: boolean;
}

function Guess({ onSubmit, gameOver }: Props) {
 console.log(gameOver)
  let [guess, setGuess] = useState<string>("");
  let [statesArray, setStatesArray] = useState<State[]>(states);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit(guess);  
    let index = statesArray.findIndex(state => state.name === guess);
    
    setStatesArray(prev => {
      const newStatesArray = prev.slice(0);
      newStatesArray.splice(index, 1);
      return newStatesArray;
    });
  }
  
  return (
    <div className="Guess">
      <form onSubmit={handleSubmit}>
        <div><label htmlFor="state">Guess the state within 6 guesses:</label>
        <div>
          <select onChange={(e) => setGuess(e.target.value)} id="state">
            <option value="">Choose a state</option>
            {states.map((state, i) => <option key={i} value={state.name}>{state.name}</option>)}
          </select>   
          <input type="submit" value="Submit" disabled={gameOver} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Guess;