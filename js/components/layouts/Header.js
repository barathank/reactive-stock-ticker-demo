import React from 'react';

export default class Header {
  render() {
    const {children} = this.props;
    return (
      <header className="row">
        {children}
      </header>
    );
  }
}
