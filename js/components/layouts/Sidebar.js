import React from 'react';

export default class Sidebar extends React.Component {
  render() {
    const {children} = this.props;
    return (
       <aside className="col-xs-3">
        {children}
      </aside>
    );
  }
}
