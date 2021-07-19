import React, { Component } from 'react';
import { getAllArticles } from '../services/ArticlesService';

export default class Front extends Component {


    componentDidMount() {
        getAllArticles()
            .then(res => console.log(res))
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
