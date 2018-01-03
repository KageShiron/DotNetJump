import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ResultList from './ResultList';

class App extends Component {
  constructor(){
    super();
    this.state = {
      searchWord:""
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input type="search" name="searchWord" value={this.state.searchWord} onChange={ this.handleInputChange } />
          <input type="button" value="Search" />
        </header>
        <ResultList siteInfo={(<div><img src="https://docs.microsoft.com/favicon.ico" />Docs</div>) } invokeRequest={ () => { return [{displayName:"hoge",url:"http://#"}] } } />
        <ResultList siteInfo={(<div><img src="https://referencesource.microsoft.com/favicon.ico" />Reference Source</div>)} invokeRequest={ () => { return [{displayName:"piyo",url:"http://#"}] } }  />
        <ResultList siteInfo={(<div><img src="https://i1.social.s-msft.com/Search/GlobalResources/images/Msdn/favicon.ico" />MSDN</div>)}  invokeRequest={ () => { return [{displayName:"fuga",url:"http://#"}] } } />
      </div>
    );
  }
}

export default App;
