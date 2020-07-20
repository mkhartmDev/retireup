import React from 'react';
import Table from './components/table.js';
import { Range } from 'rc-slider';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';


class App extends React.Component {

  async componentDidMount()
  {
    const URL = 'http://localhost:5000/data';
    const response = await axios.get(URL);
    this.setState({range: [response.data[Object.keys(response.data).length-1].year, response.data[0].year]});
    this.setState({value: [response.data[Object.keys(response.data).length-1].year, response.data[0].year]});
    this.setState({results: response.data.reverse()});
  }

  constructor(props) {
    super(props);
    this.state = {
      value: [0, 0],
      range: [0, 0],
      results: [0]
    };
  }

  onSliderChange = (value) => {
    this.setState({
        value
      }
    );
  };

  render() {
    return (
      <div style={ {width: '50%', margin: 50 }}>
        <Range style={ { marginBottom: 50 }}
          min={this.state.range[0]}
          max={this.state.range[1]}
          value={this.state.value}
          onChange={this.onSliderChange}
        />
        <Table index={this.state.value} results={this.state.results}></Table>
      </div>
    );
  }
}

   
export default App;
