import React from 'react';
import ResetButton from './ResetButton';
import ToggleButton from './ToggleButton';
import BaseWidget from './widgets/BaseWidget';
import WidgetHeader from './widgets/WidgetHeader';
import {Button} from 'elemental';

export default class Controls extends React.Component {
  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    recording: React.PropTypes.bool
  }

  static defaultProps = {
    recording: false
  }

  toggle(recording, actions) {
    return e => {
      recording
        ? actions.stopTicker()
        : actions.startTicker();
    }
  }

  render() {
    const {actions, recording} = this.props;
    const {reset, startTicker, stopTicker, openModal} = actions;
    return (
      <BaseWidget type="info">
        <WidgetHeader>Control Center</WidgetHeader>
        <ToggleButton recording={recording} onClick={this.toggle(recording, actions)} />
        <ResetButton onClick={reset} />
        <Button block onClick={openModal}>
          <span className="octicon octicon-gear" /> Configure
        </Button>
      </BaseWidget>
    );
  }
}
