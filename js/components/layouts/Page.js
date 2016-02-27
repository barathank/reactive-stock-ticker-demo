import React from 'react';

export default class Page extends React.Component {
  render() {
    const {children} = this.props;
    return (
      <main className="container">
        {children}
      </main>
    );
  }
}
