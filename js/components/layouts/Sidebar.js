import React from 'react';

export default class Sidebar {
  render() {
    const {children} = this.props;
    return (
       <aside className="col-xs-3">
        {children}
      </aside>
    );
  }
}
