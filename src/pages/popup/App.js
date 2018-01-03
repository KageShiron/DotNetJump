import React, { Component } from 'react';
import './App.css';
import ResultList from './ResultList';
import FA from 'react-fontawesome';
import SearchSource from './search'

class App extends Component {
  constructor(){
    super();
    this.state = {
      searchWord:"",
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

  invokeSearch()
  {
    
  }

  render() {
    console.log(SearchSource);
    return (
      <div className="App">
        <header className="App-header">
          <input className="search-word" type="search" name="searchWord" 
            value={this.state.searchWord} onChange={ this.handleInputChange }
            onKeyDown={ e => { if(e.keyCode === 13) this.invokeSearch(e); } } />
          <a className="search-button" onClick={this.invokeSearch}>
            <FA name="search" />
          </a>
        </header>
        <ResultList siteInfo={(<div><img src="https://docs.microsoft.com/favicon.ico" />Docs</div>) } invokeRequest={ SearchSource.searchDocs } searchWord={this.state.searchWord} />
        <ResultList siteInfo={(<div><img src="https://referencesource.microsoft.com/favicon.ico" />Reference Source</div>)} invokeRequest={ SearchSource.searchReferenceSource } searchWord={this.state.searchWord}  />
        <ResultList siteInfo={(<div><img src="https://i1.social.s-msft.com/Search/GlobalResources/images/Msdn/favicon.ico" />MSDN</div>)}  invokeRequest={ SearchSource.searchMsdn } searchWord={this.state.searchWord} />
      </div>
    );
  }
}

export default App;
