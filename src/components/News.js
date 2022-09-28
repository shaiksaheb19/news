import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    articles = []
    constructor(){
        super();
        this.state = {
            articles : this.articles,
            page: 1

        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=1482b941c1f747f4b21f42c23ab14e36&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles})


    }
    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=1482b941c1f747f4b21f42c23ab14e36&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            page: this.state.page - 1, 
            articles: parsedData.articles
        })

    }
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

        } 
        else {
            let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=1482b941c1f747f4b21f42c23ab14e36&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
            let data = await fetch(url)
            let parsedData = await data.json()
            this.setState({
                page: this.state.page + 1, 
                articles: parsedData.articles
            })

        }

    }
  render() {
    return (
      <div className='container'>
        <center className="my-3"><h2>NEWS 24X7 - Top Headlines</h2></center>
        <div className='row'>
            {this.state.articles.map((element) => {
                return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title.slice(0,20)} description= {element.description.slice(0,70)} imageUrl={element.urlToImage} newsUrl={element.url}/>
                </div>
            })}
        </div>   
        <div className='container d-flex justify-content-between'>
            <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
        </div>
    )
  }
}
