import React from 'react';
import {Button} from 'elemental';

export default class ToggleButton {
  render() {
    return (
      <Button type="success" {...this.props}>
        <span className="octicon octicon-sync" /> Reset
      </Button>
    );
  }
}
