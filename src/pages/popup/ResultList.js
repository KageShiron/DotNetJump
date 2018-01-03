import React, { Component } from 'react';

class ResultList extends Component {
    constructor()
    {
        super();
        this.state = {
            results : [],
            sleepTimer : null
        };
    }

    async componentWillReceiveProps(){
        if(this.state.sleepTimer)
        {
            clearTimeout(this.state.sleepTimer);
            this.setState({sleepTimer:null});
        }
        const timer = setTimeout( async () => {
            const res = await this.props.invokeRequest(this.props.searchWord);
            this.setState({"results" : res});
        },1000);
        this.setState({sleepTimer:timer});
    }

    render() {
        return (
            <div className="ResultList">
                <header className="ResultHeader">
                    {this.props.siteInfo}
                </header>
                <ul>
                    {
                        (this.state.results || []).slice(0, 3).map((x) => <li key={x.url}>
                            <a href={x.url}>{x.displayName}</a>
                        </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default ResultList;
