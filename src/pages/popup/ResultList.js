import React, { Component } from 'react';

class ResultList extends Component {
    constructor()
    {
        super();
        this.state = {
            results : []
        };
    }

    async componentDidMount(){
        const res = await this.props.invokeRequest();
        console.log(res);
        this.setState({"results" : res});
    }

    render() {
        return (
            <div className="ResultList">
                <header className="ResultHeader">
                    {this.props.siteInfo}
                </header>
                <ul>
                    {
                        this.state.results.slice(0, 3).map((x) => <li key={x.url}>
                            <a href={x.url}>{x.displayName}</a>
                        </li>)
                    }
                </ul>
            </div>
        );
    }
}

export default ResultList;
