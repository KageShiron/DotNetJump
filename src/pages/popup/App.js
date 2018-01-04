import React, { Component } from 'react';
import './App.css';
import ResultList from './ResultList';
import FA from 'react-fontawesome';
import SearchSource from './search'

class App extends Component {
  constructor(){
    super();
    this.state = {
      inputText:"",
      searchWord:"",
      sleepTimer:null
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

    if(this.state.sleepTimer)
    {
      clearTimeout(this.state.sleepTimer);
      this.setState({sleepTimer:null});
    }
    const timer = setTimeout( async () => {
      this.setState({searchWord:value})
    },1000);
    this.setState({sleepTimer:timer});
  }

  async componentWillMount() {
    const val = await browser.tabs.executeScript({
      file : "/injection/injection.js"
    });
    this.setState({"inputText":val[0],"searchWord":val[0]});
  }

  render() {
    console.log(SearchSource);
    return (
      <div className="App">
        <header className="App-header">
          <input className="search-word" type="search" name="inputText"
            autoFocus
            value={this.state.inputText} onChange={ this.handleInputChange }
            onKeyDown={ e => { if(e.keyCode === 13) this.invokeSearch(e); } } />
            <FA name="search" className="search-icon" />
        </header>
        <ResultList siteInfo={(<div><img src="https://docs.microsoft.com/favicon.ico" />Docs</div>) } invokeRequest={ SearchSource.searchDocs } searchWord={this.state.searchWord} searchUrl={"https://docs.microsoft.com/ja-jp/dotnet/api/index?term=" + this.state.searchWord} />
        <ResultList siteInfo={(<div><img src="https://referencesource.microsoft.com/favicon.ico" />Reference Source</div>)} invokeRequest={ SearchSource.searchReferenceSource } searchWord={this.state.searchWord} searchUrl={"https://referencesource.microsoft.com/#q=" + this.state.searchWord} />
        <ResultList siteInfo={(<div><img src="https://i1.social.s-msft.com/Search/GlobalResources/images/Msdn/favicon.ico" />MSDN</div>)}  invokeRequest={ SearchSource.searchMsdn } searchWord={this.state.searchWord} searchUrl={"https://social.msdn.microsoft.com/search/en-US?query=" + this.state.searchWord} />
      </div>
    );
  }
}

export default App;
