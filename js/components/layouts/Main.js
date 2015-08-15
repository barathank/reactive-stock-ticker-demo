import React from 'react';

export default class Main {
  render() {
    const {children} = this.props;
    return (
      <div className="col-xs-8">
        {children}
      </div>
    );
  }
}
