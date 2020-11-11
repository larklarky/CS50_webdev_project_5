import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          text: '',
          dueDate: ''
      }
  }
  render() {
    return (
      <div>New App</div>
  )
  }
}
export default App;
