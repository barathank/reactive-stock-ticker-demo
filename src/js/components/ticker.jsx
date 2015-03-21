import React from 'react';

let {PropTypes} = React;

export default React.createClass({

  getDefaultProps: function(){
    return {
      transactions: [],
      running: false
    };
  },

  propTypes: {
    transactions: PropTypes.array.isRequired,
    running: PropTypes.bool.isRequired,
    onStart: PropTypes.func.isRequired,
    onStop: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
  },

  render: function() {
    let {transactions, running, onReset} = this.props;
    return (
      <div>
        <table className="table table-bordered table-condensed">
          <thead>
            <tr>
              <td colSpan="2">
                <button className="btn btn-primary" onClick={this._toggle}>
                  {running ? 'Stop' : 'Start/Resume'}
                </button>
              </td>
              <td colSpan="2">
                <button onClick={onReset} className="btn btn-success">
                  <i className="glyphicon glyphicon-refresh" /> Reset
                </button>
              </td>
            </tr>
            <tr>
              <th>Time</th>
              <th>Ticker</th>
              <th>Price</th>
              <th>% Change</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(trx =>
              <tr key={trx.key} className={trx.category}>
                <td>{trx.time}</td>
                <td>{trx.ticker}</td>
                <td>{trx.price}</td>
                <td>{trx.perc}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  },

  _toggle(e) {
    let fn = (this.props.running) ? 'onStop' : 'onStart';
    this.props[fn](e);
  }
});
