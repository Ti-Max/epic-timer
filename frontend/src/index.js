import React from "react";
import ReactDOM from 'react-dom/client';
import World from "./3d/World";
// import TimerContainer from "./TimerContainer";

// const TimerRoot = ReactDOM.createRoot(document.getElementById("timer-container"));

// TimerRoot.render(
//     <TimerContainer />
// )

const container = document.getElementById("container")
const world = new World(container);

window.addEventListener("resize", () => world.resize());
world.start();