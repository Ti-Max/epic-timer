import React from "react";

function Scramble(props) {
  return (
    <div className="hide-during-solve mt-16 flex items-center justify-center">
      <div className="text-3xl text-text">{props.scramble}</div>
      <img
        src="images/refresh.svg"
        className="hover: ml-2 w-8 border-l-2 border-tertiary hover:cursor-pointer"
        onClick={() => props.updateScramble()}
      />
    </div>
  );
}

export default Scramble;
