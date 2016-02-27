import React from 'react';
import {Button} from 'elemental';

export default class ToggleButton extends React.Component {
  render() {
    return (
      <Button block type="success" {...this.props}>
        <span className="octicon octicon-sync" /> Reset
      </Button>
    );
  }
}
