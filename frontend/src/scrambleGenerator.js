const scrambleLength = 20;

const moveList = [
  "L",
  "R",
  "U",
  "D",
  "F",
  "B",
  "L'",
  "R'",
  "U'",
  "D'",
  "F'",
  "B'",
  "L2",
  "R2",
  "U2",
  "D2",
  "F2",
  "B2",
];

const opposite = {
  R: "L",
  L: "R",
  D: "U",
  U: "D",
  B: "F",
  F: "B",
};

const addMove = (moves) => {
  // Get random move from the moveList
  const move = moveList[Math.floor(Math.random() * moveList.length)];

  // Check if previus move is on the same side: "R R'" or "R L R'"
  if (
    (moves.length === 0 ||
      moves[moves.length - 1].charAt(0) !== move.charAt(0)) &&
    (moves.length <= 1 ||
      !(
        moves[moves.length - 2].charAt(0) === move.charAt(0) &&
        moves[moves.length - 1].charAt(0) === opposite[move.charAt(0)].charAt(0)
      ))
  ) {
    moves.push(move);
  }

  // add new move if scramble is not long enough
  if (moves.length !== scrambleLength) {
    addMove(moves);
  }
};

const formatScramble = (moves) => {
  let str = "";
  moves.forEach((move) => {
    str += str === "" ? "" : "\xa0\xa0"; // double space in between
    str += move;
  });

  return str;
};

const getNewScramble = () => {
  const moves = [];
  addMove(moves);

  return formatScramble(moves);
};

export default getNewScramble;
