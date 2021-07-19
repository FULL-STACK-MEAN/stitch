import React, { Component } from 'react';
import { getAllArticles, searchArticles } from '../services/ArticlesService';

export default class Front extends Component {

    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            brands: [],
            searchBrands: []
        }
    }

    componentDidMount() {
        getAllArticles()
            .then(res => {
                const brands = res.map( elem => {
                    return elem.brand;
                })
                const uniqueBrands = this.getUniqueValues(brands);
                console.log(uniqueBrands);
                this.setState({
                    articles: res,
                    brands: uniqueBrands
                })
            })
    }

    getUniqueValues = (values) => {
        const uniqueValues = values.reduce((uniques, item) => {
            return uniques.includes(item) ? uniques : [...uniques, item]
        }, [])
        return uniqueValues;
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
                        <div className="footer-card">
                            <button>+ Info</button>
                        </div>
                    </div>
        })
        return cards;
    }

    brandsForm = () => {
        const brandsCheckbox = this.state.brands.map((brand, index) => {
            return  <label key={index}>
                        <input type="checkbox" id={brand} onChange={this.onChangeBrands} />
                        {brand}
                    </label>
        })
        return brandsCheckbox;
    }

    onChangeBrands = (event) => {
        let newArray;
        if(this.state.searchBrands.includes(event.target.id)) {
            newArray = this.state.searchBrands.filter(elem => elem !== event.target.id);
        } else {
            newArray = [...this.state.searchBrands, event.target.id];
        }
        this.setState({
            searchBrands: newArray
        }, this.getSearchArticles)
    }

    getSearchArticles = () => {
        searchArticles(this.state.searchBrands)
            .then(res => {
                this.setState({
                    articles: res
                })
            });
    }

    render() {
        return (
            <div className="container">
                <aside>
                    {this.brandsForm()}
                </aside>
                <div className="row grid">
                    {this.articlesCards()}
                </div>
            </div>
        )
    }
}
