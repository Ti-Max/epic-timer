import React from "react";
import colors from "../css/colors";
import { formatTime } from "./utils";

class CurrentSolve extends React.Component {
  hideDuringSolve = document.getElementsByClassName("hide-during-solve");
  waitMargin = 0.3;

  tickInterval;
  startingTimerTimeout;

  isRunning = false;
  isWaited = false;
  isTouched = false;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0.0,
      currentTimeColor: colors.text,
    };
  }

  tick() {
    this.setState({ currentTime: this.state.currentTime + 0.01 });
  }

  handleKeyDown(event) {
    if (event.repeat) return;

    if (this.isRunning) {
      // Stop timer
      this.isRunning = false;
      clearInterval(this.tickInterval);

      this.setState({ currentTimeColor: colors.timerPressed });

      // Show elements
      for (let block of this.hideDuringSolve) {
        block.classList.remove("hidden-element");
      }
      //Send solve to the database
      this.props.commitSolve(this.state.currentTime);
    } else if (!this.isTouched && event.code === "Space") {
      // Timer touched
      this.isTouched = true;
      this.setState({ currentTimeColor: colors.timerPressed });

      // wait `waitMargin` before allowing to start the timer
      this.startingTimerTimeout = setTimeout(() => {
        // Timer ready
        this.setState({
          currentTime: 0.0,
          currentTimeColor: colors.timerReady,
        });
        this.isWaited = true;

        // Hide elements
        for (let block of this.hideDuringSolve) {
          block.classList.add("hidden-element");
        }
      }, this.waitMargin * 1000);
    }
  }

  handleKeyUp(event) {
    this.isTouched = false;
    this.setState({ currentTimeColor: colors.text });

    if (event.code !== "Space") return;

    if (!this.isWaited) {
      // Waited not long enough!
      clearTimeout(this.startingTimerTimeout);
    } else if (!this.isRunning) {
      // Start timer!
      this.setState({ currentTime: 0.0 });

      this.tickInterval = setInterval(() => {
        this.tick();
      }, 10);

      this.isRunning = true;
      this.isWaited = false;
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => this.handleKeyDown(event));
    document.addEventListener("keyup", (event) => this.handleKeyUp(event));
  }

  render() {
    // show only one digit after the point when timer is running
    const currentSingle = formatTime(
      this.state.currentTime,
      this.isRunning ? 1 : 2
    );

    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div
          className="text-[14rem] leading-[12rem]"
          style={{ color: this.state.currentTimeColor }}
        >
          {currentSingle}
        </div>
        <div className="hide-during-solve mt-12 flex max-h-96 items-center justify-center transition-all">
          <div>
            <div className="border-r-2 border-tertiary pr-2 pb-2 text-[4rem] leading-[3rem] text-secondary">
              {this.props.currentAO5}
            </div>
            <div className="text-center text-[1rem] text-secondary">ao5</div>
          </div>
          <div>
            <div className="pl-2 pb-2 text-[4rem] leading-[3rem] text-secondary">
              {this.props.currentAO12}
            </div>
            <div className="text-center text-[1rem] text-secondary">ao12</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentSolve;
