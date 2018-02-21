import React, { Component } from 'react';

class ResultList extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
            loading:false
        };
    }

    async componentWillReceiveProps(newProps) {
        this.setState({ "loading": true });
        console.log(newProps.searchWord);
        const res = await newProps.invokeRequest(newProps.searchWord);
        this.setState({ "results": res  , "loading" : false });
    }

    async handleClick(e)
    {
        e.preventDefault();
        await browser.tabs.create({ url:e.target.href});
        window.close();
    }

    render() {
        return (
            <div className="ResultList">
                <header className="ResultHeader">
                    <a href={this.props.siteHomeUrl}>
                        <img src={this.props.icon} />
                    </a>
                    <a href={this.props.searchUrl}>
                        {this.props.siteName}
                    </a>
                    { this.state.loading ? <img src="/static/img/loading.svg" style={{"width":12}} /> : ""}
                </header>
                <ul>
                    {
                        (this.state.results || []).map((x) => <li key={x.url}>
                            <a href={x.url} onClick={this.handleClick}>
                                {(() => { if (x.icon) return <img className="type-icon" src={x.icon} /> })()}
                                {x.displayName}
                                <small>{x.itemKind || ""}</small>
                            </a>
                        </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default ResultList;
