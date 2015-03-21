import React from 'react';

export default React.createClass({
  getInitialState: function(){
    return {
      observer: null,
      adds: 0,
      removes: 0,
      texts: 0,
      attrs: 0,
      series: []
    }
  },

  componentDidMount: function() {
    var callback = this._handleMutation;
    this.state.observer = new MutationObserver(function(records) {
      records.forEach(callback);
    });

    this.state.observer.observe(this.props.target, {
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
            load: function () {
              // set up the updating of the chart each second
              var adds = this.get('adds');
              var removes = this.get('removes');
              var attrs = this.get('attrs');
              var texts = this.get('text');
              var interval = setInterval(function () {
                adds.addPoint(_this.state.adds);
                removes.addPoint(_this.state.removes);
                attrs.addPoint(_this.state.attrs);
                texts.addPoint(_this.state.texts);
              }, 1000);
              setTimeout(function(){ clearInterval(interval) }, 11000);
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
          id: 'adds', name: 'Adds', data: []
        },{
          id: 'removes', name: 'Removes', data: []
        },{
          id: 'attrs', name: 'Attrs', data: []
        },{
          id: 'text', name: 'Text', data: []
        }]
      });
  },

  _handleMutation: function(mutation) {
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
  },

  render: function() {
    return (
      <div>
        <div id="graph"></div>
        <table>
          <tr>
            <td>Added</td>
            <td>Removed</td>
            <td>Text</td>
            <td>Attrs</td>
          </tr>
          <tr>
            <td>{this.state.adds}</td>
            <td>{this.state.removes}</td>
            <td>{this.state.texts}</td>
            <td>{this.state.attrs}</td>
          </tr>
        </table>
      </div>
    );
  }
});
