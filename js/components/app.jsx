import React from 'react';
import Ticker from './ticker.jsx';
import MutationReporter from './mutations.jsx';
import styles from '../../css/styles.css';

export default React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function() {
    return {
      quotes: (new Parse.Query('Quote')).limit(10).descending('createdAt')
    };
  },

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
    let {quotes} = this.data;
    return (
      <MutationReporter recording={recording}>
        <Ticker transactions={quotes} recording={recording} onStart={this.startTicker}
          onStop={this.stopTicker} onReset={this.reset} />
      </MutationReporter>
    );
  },

  startTicker(e) {
    this.props.onStart(e);
    this.setState({recording: true});
  },

  stopTicker(e) {
    this.props.onStop(e);
    this.setState({recording: false});
  },

  reset() {
    // TODO: re-add this
  }
});
