import React from 'react';

export default class Content extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <div className="col-xs-6">
        {children}
      </div>
    );
  }
}
