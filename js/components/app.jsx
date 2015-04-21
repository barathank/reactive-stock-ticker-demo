import React from 'react';
import TickerContainer from './TickerContainer';
import MutationReporter from './mutations.jsx';
import styles from '../../css/styles.css';

export default React.createClass({
  getInitialState() {
    return {
      recording: false
    };
  },

  getDefaultProps: function () {
    return {
      autostart: false
    };
  },

  componentWillUnmount() {
    this.stopTicker();
  },

  render() {
    let {recording} = this.state;
    return (
      <MutationReporter recording={recording}>
        <TickerContainer recording={recording} onStart={this.startTicker}
          onStop={this.stopTicker} onReset={this.reset} />
      </MutationReporter>
    );
  },

  startTicker(e) {
    this.setState({recording: true});
  },

  stopTicker(e) {
    this.setState({recording: false});
  },

  reset() {
    // TODO: re-add this
  }
});
