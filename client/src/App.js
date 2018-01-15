import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Client side app</h1>
        <a href='/auth/google'>Sign in with google</a>  
      </div>
    );
  }
}

export default App;
