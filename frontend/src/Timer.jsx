import React from "react";
import { calculateAO, formatTime, generateId } from "./utils";
import getNewScramble from "./scrambleGenerator";

// components
import Scramble from "./Scramble";
import SolveList from "./SolveList";
import CurrentSolve from "./CurrentSolve";

// `userdata` is a global variable that includes data from the server about user and his solves.

class Timer extends React.Component {
  firstSelectedSolve;

  constructor(props) {
    super(props);

    // generate averages
    this.udpateAverage(userdata.solves);

    this.state = {
      solves: userdata.solves,
      scramble: getNewScramble(),
    };

    // we neet this to access `this` when we call these funcitons from other components
    this.updateScramble = this.updateScramble.bind(this);
    this.selectSolve = this.selectSolve.bind(this);
    this.deleteSelectedSolves = this.deleteSelectedSolves.bind(this);
  }

  // calculates averages for every solve in an array untill limit is reached
  udpateAverage(solves, limit) {
    if (!limit) limit = solves.length; // no limit

    // convert single solve times to easy to deal format
    const solvesParsed = solves.map((solve) => Number(solve.time));

    // Calculate average of 5, 12
    for (let i = 0; i < limit; i++) {
      const slicedSolves = solvesParsed.slice(i);
      solves[i].ao5 = calculateAO(5, [...slicedSolves]).toFixed(2);
      solves[i].ao12 = calculateAO(12, slicedSolves).toFixed(2);
    }
  }

  selectSolve(uuid) {
    //mark solve solve as selected if uuid mathes solves uuid
    this.setState({
      solves: this.state.solves.map((s) => {
        if (s.uuid === uuid) {
          s.selected = s.selected ? false : true;
          return s;
        }
        return s;
      }),
    });
  }

  deleteSelectedSolves() {
    // gather all selected solves into array of uuids
    const selectedSolves = this.state.solves
      .filter((s) => s.selected)
      .map((s) => s.uuid);

    // Remove from database
    fetch("/deleteSolves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        solves: selectedSolves,
        category: "overall",
      }),
    }).catch((err) => console.log(err));

    // Remove from this.state
    const updatedSolves = this.state.solves.filter(
      (s) => !selectedSolves.includes(s.uuid)
    );

    // find last solve that needs to be updated
    const limit = this.state.solves.findIndex(
      (s) => s.uuid === selectedSolves.at(-1)
    );

    // udpate averages to all solves after the earliest solve (limit)
    this.udpateAverage(updatedSolves, limit);

    // update state
    this.setState({ solves: updatedSolves });
  }

  commitSolve(newSolveTime) {
    // assemble new solve
    const newSolve = {
      time: newSolveTime.toFixed(2),
      uuid: generateId(),
      scramble: this.state.scramble,
    };

    // copy solves from this.state and add a new solve
    const updatedSolves = [...this.state.solves];
    updatedSolves.unshift(newSolve);

    //update average for the new solve
    this.udpateAverage(updatedSolves, 1);

    // send new solve info to the server
    fetch("/commitSolve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        uuid: newSolve.uuid,
        time: newSolve.time,
        category: "overall",
        scramble: newSolve.scramble,
      }),
    }).catch((err) => console.log(err));

    // update the state
    this.setState({
      scramble: getNewScramble(),
      solves: updatedSolves,
    });
  }

  updateScramble() {
    this.setState({ scramble: getNewScramble() });
  }

  render() {
    // display current aos if any, else "-"
    const currentAO5 =
      this.state.solves[0] && this.state.solves[0].ao5 > 0
        ? formatTime(this.state.solves[0].ao5, 2)
        : "-";
    const currentAO12 =
      this.state.solves[0] && this.state.solves[0].ao12 > 0
        ? formatTime(this.state.solves[0].ao12, 2)
        : "-";

    return (
      <div>
        <CurrentSolve
          currentAO5={currentAO5}
          currentAO12={currentAO12}
          commitSolve={(s) => this.commitSolve(s)}
        />

        <Scramble
          scramble={this.state.scramble}
          updateScramble={this.updateScramble}
        />

        <SolveList
          solves={this.state.solves}
          deleteSelectedSolves={this.deleteSelectedSolves}
          selectSolve={this.selectSolve}
        />
      </div>
    );
  }
}

export default Timer;
