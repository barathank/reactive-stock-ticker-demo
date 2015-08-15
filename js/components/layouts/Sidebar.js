import React from 'react';

export default class Sidebar {
  render() {
    const {children} = this.props;
    return (
       <aside className="col-xs-4">
        {children}
      </aside>
    );
  }
}
