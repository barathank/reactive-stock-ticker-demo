import React from 'react';
import {Alert} from 'elemental';

export default class BaseWidget extends React.Component {
  static defaultProps = {
    type: 'success'
  }

  render() {
    const {children, type, ...other} = this.props;
    return (
      <Alert type={type} {...other}>
        {children}
      </Alert>
    );
  }
}
