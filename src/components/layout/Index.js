import React, { Component } from 'react';
import Tracks from '../track/Tracks';
import Search from '../track/Search';

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <Search />
                <Tracks />
            </React.Fragment>
        );
    }
}

export default Index;