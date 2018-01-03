import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResultList from './ResultList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <ResultList siteInfo="docs" invokeRequest={ () => { return [{displayName:"hoge",url:"http://#"}] } } />
        <ResultList siteInfo="Reference Source" invokeRequest={ () => { return [{displayName:"piyo",url:"http://#"}] } }  />
        <ResultList siteInfo="MSDN"  invokeRequest={ () => { return [{displayName:"fuga",url:"http://#"}] } } />
      </div>
    );
  }
}

export default App;
