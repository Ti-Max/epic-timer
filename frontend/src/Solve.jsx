import React from "react";
import { formatTime } from "./utils";

function Solve(props) {
  let style =
    "m-1 flex justify-between rounded-md bg-tertiary p-1 pl-2 pr-2 hover:cursor-pointer hover:bg-secondaryAlt";
  if (props.selected) style += " selected-solve";

  const trashbinOpasity = props.firsSelected ? 1 : 0;
  return (
    <div className="flex">
      <img
        src="./images/trashbin.svg"
        className="w-7 opacity-0 transition-all hover:cursor-pointer"
        onClick={props.deleteSelectedSolves}
        style={{ opacity: trashbinOpasity }}
      />
      <div className={style} onClick={() => props.selectSolve(props.uuid)}>
        <div className="align-text-top text-xs text-secondary">
          #{props.nubmer}
        </div>
        <div className="ml-1 text-base">{formatTime(props.single, 2)}</div>
      </div>
    </div>
  );
}

export default Solve;
