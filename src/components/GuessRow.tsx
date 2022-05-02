interface Props {
  guessNumber: number;
  guess: string;
  distance: number;
  direction: string;
}

function GuessRow({ guessNumber, guess, distance, direction }: Props) {
  return (
    <tr className="GuessRow">
      <td className='guess-number'>{guessNumber}</td>
      <td className='guess'>{guess}</td>
      <td className='distance'>{distance} miles</td>
      <td className='direction'>{direction}</td>
    </tr>
  );
}

export default GuessRow;