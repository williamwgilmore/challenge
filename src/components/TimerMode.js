import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faSquare } from '@fortawesome/free-solid-svg-icons';

import DocumentHead from './DocumentHead';
import { createTimestamp, displayTimeElapsed } from '../utils/timeUtils';

export default class TimerMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: '',
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  //If the page was refreshed, we need to resume the timer
  componentWillMount(){
    const { isTiming, startTime } = this.props;

    if (isTiming){
      this.timer = setInterval(() => {
        const currentTime = createTimestamp();
        this.setState({ currentTime });
      }, 1000);
    }
  }

  startTimer() {
    const { handleTimerClick } = this.props;

    handleTimerClick();

    this.timer = setInterval(() => {
      const currentTime = createTimestamp();
      this.setState({ currentTime });
    }, 1000);
  }

  stopTimer() {
    const { handleTimerClick } = this.props;

    handleTimerClick();
    clearInterval(this.timer);
    this.setState({ currentTime: '' });
  }

  render() {
    const { isTiming, startTime } = this.props;
    const { currentTime } = this.state;

    const runningTimer = displayTimeElapsed(startTime, currentTime);

    return (
      <div className="flex w-100 items-center justify-end ph2">
        <DocumentHead runningTimer={runningTimer} isTiming={isTiming} />
        <h1 className="f4 mr4">{runningTimer}</h1>
        <button
          className="pointer mooveItNavybg f6 link dim br-100 w2 h2 dib mooveItPink bg-blue tc justify-end"
          onClick={isTiming ? this.stopTimer : this.startTimer}
        >
          <FontAwesomeIcon icon={isTiming ? faSquare : faPlay} size="1x" />
        </button>
      </div>
    );
  }
}

TimerMode.propTypes = {
  handleTimerClick: PropTypes.func.isRequired,
  isTiming: PropTypes.bool.isRequired,
  startTime: PropTypes.string.isRequired,
};
