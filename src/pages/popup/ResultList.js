import React, { Component } from 'react';

class ResultList extends Component {
    constructor()
    {
        super();
        this.state = {
            results : [],
        };
    }

    async componentWillReceiveProps(newProps){
        console.log(newProps.searchWord);
        const res = await newProps.invokeRequest(newProps.searchWord);
        this.setState({"results" : res});
    }

    render() {
        return (
            <div className="ResultList">
                <header className="ResultHeader">
                    <a href={this.props.searchUrl}>
                        {this.props.siteInfo}
                    </a>
                </header>
                <ul>
                    {
                        (this.state.results || []).map((x) => <li key={x.url}>
                            <a href={x.url}>
                                { (() => { if(x.icon)return <img className="type-icon" src={x.icon} />})() }
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
