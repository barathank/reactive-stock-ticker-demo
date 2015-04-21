import React from 'react';

let interval = null;

export default React.createClass({
  propTypes: {
    recording: React.PropTypes.bool.isRequired
  },

  getDefaultProps() {
    return {
      recording: false
    };
  },

  getInitialState() {
    return {
      observer: null,
      adds: 0,
      removes: 0,
      entries: 0
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.recording === nextProps.recording) { return; }
    (nextProps.recording)
      ? this.startRecording()
      : this.stopRecording();
  },

  render() {
    return (
      <div>
        <div ref="observatory" id="observatory">
          {this.props.children}
        </div>
        <div id="scoreboard">
          <div id="graph"></div>
          <table>
            <tr>
              <td>Added</td>
              <td>Removed</td>
            </tr>
            <tr>
              <td>{this.state.adds}</td>
              <td>{this.state.removes}</td>
            </tr>
          </table>
        </div>
      </div>
    );
  },

  stopRecording() {
    console.log('STOP!');
    clearInterval(interval);
  },

  startRecording() {
    console.log('START!', this.state);
    var callback = this._handleMutation;
    this.state.observer = new MutationObserver(function(records) {
      records.forEach(callback);
    });

    let target = this.refs.observatory;

    this.state.observer.observe(target.getDOMNode(), {
      childList : true,
      characterData : true,
      attributes: true,
      subtree : true,
      attributeOldValue: true
    });

    var _this = this;
    this.chart = $('#graph').highcharts({
      chart: {
        type: 'spline',
          animation: Highcharts.svg, // don't animate in old IE
          marginRight: 10,
          events: {
            load () {
              // set up the updating of the chart each second
              var adds = this.get('adds');
              var removes = this.get('removes');
              interval = setInterval(function () {
                adds.addPoint(_this.state.adds);
                removes.addPoint(_this.state.removes);
                _this.setState({entries: _this.state.entries+1});

                if (_this.state.entries > 10) {
                  adds.removePoint(0);
                  removes.removePoint(0);
                }
              }, 1000);
            }
          }
        },
        title: {
          text: 'DOM Mutations over time'
        },
        xAxis: {
          categories: []
        },
        series: [{
          id: 'adds', name: 'Additions', data: []
        },{
          id: 'removes', name: 'Removals', data: []
        }]
      });

  },

  _handleMutation(mutation) {
    switch (mutation.type) {
      case 'childList':
        if (mutation.addedNodes[0] && mutation.addedNodes[0].wholeText) {
          this.setState({texts: this.state.texts + 1});
          this.setState({texts: this.state.texts + mutation.addedNodes.length});
        } else {
          this.setState({adds: this.state.adds + mutation.addedNodes.length});
          this.setState({removes: this.state.removes + mutation.removedNodes.length});
        }
        break;
      case 'attributes':
        this.setState({attrs: this.state.attrs + 1});
        break;
      case 'characterData':
        break;
    }
  }
});
