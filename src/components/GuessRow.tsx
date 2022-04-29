interface Props {
  guessNumber: number;
  guess: string;
  distance: number;
  direction: string;
}

function GuessRow({ guessNumber, guess, distance, direction }: Props) {
  return (
    <tr className="GuessRow">
      <td>{guessNumber}</td>
      <td>{guess}</td>
      <td>{distance}</td>
      <td>{direction}</td>
    </tr>
  );
}

export default GuessRow;