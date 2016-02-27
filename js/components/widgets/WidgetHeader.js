import React from 'react';
import {Spinner} from 'elemental';

export default class WidgetHeader extends React.Component {
  static propTypes = {
    loading: React.PropTypes.bool.isRequired
  }

  static defaultProps = {
    loading: false
  }

  render() {
    const {loading, children, ...other} = this.props;
    return (
      <h2>
        {children}
        {loading && <small style={{float: "right"}}><Spinner block /></small>}
      </h2>
    );
  }
}
