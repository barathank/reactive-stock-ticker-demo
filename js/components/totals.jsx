import React from 'react';
import ReactRenderVisualizer from './mixins/highlight';

export default React.createClass({
  mixins: [ReactRenderVisualizer],

  propTypes: {
    adds: React.PropTypes.number,
    removes: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      adds: 0,
      removes: 0
    };
  },

  render() {
    const {adds, removes} = this.props;
    return (
      <table>
        <tr>
          <td>Added</td>
          <td>Removed</td>
        </tr>
        <tr>
          <td>{adds}</td>
          <td>{removes}</td>
        </tr>
      </table>
    );
  }
});
