import React, { Component } from 'react';
import { getAllArticles } from '../services/ArticlesService';

export default class Front extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: []
        }
    }

    componentDidMount() {
        getAllArticles()
            .then(res => {
                this.setState({
                    articles: res
                })
            })
    }

    articlesCards = () => {
        const cards = this.state.articles.map((article, index) => {
            return  <div className="card" key={index}>
                        <div className="header-card">
                            <h1>{article.brand}</h1>
                        </div>
                        <div className="body-card">
                            <p>{article.model}</p>
                            <p>{article.description}</p>
                            <img src={article.pic} />
                            <p>
                                <span>{article.price} €</span>
                                <span>{article.currentPrice} €</span>
                            </p>
                        </div>
                    </div>
        })
        return cards;
    }

    render() {
        return (
            <div className="row grid">
                {this.articlesCards()}
            </div>
        )
    }
}
