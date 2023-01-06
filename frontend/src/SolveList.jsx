import React from "react";
import Solve from "./Solve";

class SolveList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selectedCount = 0;
    let count = this.props.solves.length;
    return (
      <div>
        <div className="hide-during-solve mb-16 flex h-[70vh] items-center justify-between">
          <div></div>
          <div className="max-h-80 overflow-y-auto pr-3">
            {this.props.solves.map((solve) => (
              <Solve
                key={solve.uuid}
                uuid={solve.uuid}
                nubmer={count--}
                single={solve.time}
                ao5={solve.ao5}
                ao12={solve.ao12}
                selected={solve.selected}
                firsSelected={solve.selected && !selectedCount++}
                selectSolve={this.props.selectSolve}
                deleteSelectedSolves={this.props.deleteSelectedSolves}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SolveList;
