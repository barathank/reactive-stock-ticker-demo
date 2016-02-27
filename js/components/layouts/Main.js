import React from 'react';

export default class Main extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <div className="row main">
        {children}
      </div>
    );
  }
}
