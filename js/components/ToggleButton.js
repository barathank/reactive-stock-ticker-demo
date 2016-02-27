import React from 'react';
import {Button} from 'elemental';

export default class ToggleButton extends React.Component {
  static propTypes = {
    recording: React.PropTypes.bool
  }

  static defaultProps = {
    recording: false
  }

  render() {
    const {recording, ...other} = this.props;
    const icon = recording ? 'x' : 'triangle-right';
    const type = recording ? 'danger' : 'primary';
    return (
      <Button block type={type} {...other}>
        <span className={'octicon octicon-'+ icon} />
        {recording ? 'Stop' : 'Start/Resume'}
      </Button>
    );
  }
}
