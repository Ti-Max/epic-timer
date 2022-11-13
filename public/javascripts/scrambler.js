const label = document.getElementById("scramble");
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

updateScramble();

function updateScramble() {
  const moves = [];
  addMove(moves);

  printScramble(moves);
}

function addMove(moves) {
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
}

function printScramble(moves) {
  let str = "";
  moves.forEach((move) => {
    str += "\xa0\xa0" + move; // double space in between
  });

  label.innerText = str;
}
