import React from 'react';

export default class Content {
  render() {
    const {children} = this.props;
    return (
      <div className="col-xs-6">
        {children}
      </div>
    );
  }
}
