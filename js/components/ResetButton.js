import React from 'react';
import {Button} from 'elemental';

export default class ToggleButton {
  render() {
    return (
      <Button block size="md" type="success" {...this.props}>
        <span className="octicon octicon-sync" /> Reset
      </Button>
    );
  }
}
