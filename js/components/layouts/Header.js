import React from 'react';

export default class Header extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <header className="row">
        {children}
      </header>
    );
  }
}
