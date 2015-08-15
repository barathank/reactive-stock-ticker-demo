import React from 'react';
import {Button} from 'elemental';

export default class ToggleButton {
  static propTypes = {
    recording: React.PropTypes.bool
  }

  static defaultProps = {
    recording: false
  }

  render() {
    const {recording, ...other} = this.props;
    const icon = recording ? 'x' : 'triangle-right';
    return (
      <Button type="primary" {...other}>
        <span className={'octicon octicon-'+ icon} />
        {recording ? 'Stop' : 'Start/Resume'}
      </Button>
    );
  }
}
