import React, { useEffect } from 'react';
import { useState } from "react";
import "./NewsApp.css"

const API_KEY = `f9da2a1f72e0419aae155359baf3b0a7`
const newsTypes = ["business", "entertainment", "health", "science", "sports", "technology"]



function NewsApp() {
    const [news, setNews] = useState([])
    const [newsVariety, setNewsVariety] = useState("")
    const [loading, setLoading] = useState(true)
    const [count, setCount] = useState(0)

    const url = newsVariety ? `https://newsapi.org/v2/top-headlines?country=in&category=${newsVariety}&apiKey=${API_KEY}` :
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${API_KEY}`

    const fetchNews = async () => {
        const response = await fetch(url);
        const newNews = await response.json();
        console.log(newNews.articles);
        setNews(newNews.articles);
        setLoading(false)
    };

    useEffect(() => {
        fetchNews();
        setLoading(true)
    }, [newsVariety]);

    const handleClick = (e) => {
        setNewsVariety(e.target.innerText)
    }

    if (loading) {
        return (
            <>
                <h1 className='loading'>Loading...</h1>
            </>
        )
    }

    const nextmove = () => {
        if (count < news.length - 1) {
            setCount(count + 1)
        }
        else {
            let newCount = 0
            setCount(newCount)
        }
    }
    const backmove = () => {
        console.log(count);
        if (count > 0) {
            setCount(count - 1)
        }
        else {
            let newCounts = news.length - 1
            setCount(newCounts)
        }
    }

    return (
        <>
            <div className='btn-container'>
                {
                    newsTypes.map((data, index) => {
                        return (
                            <button onClick={(e) => handleClick(e)} key={index}>{data}</button>
                        )
                    })
                }
            </div>

            <>
                <div className='news-container'>
                    {
                        news[count].urlToImage ?
                            <>
                                <h1 className='title'>{news[count].title}</h1>
                                <div className='data-container'>
                                    <div className='data-news'>
                                        <img src={news[count].urlToImage} className="my-img" alt="--" />
                                    </div>
                                    <div className='data-news'>
                                        <ul>
                                            <li>
                                                <p className='description'>{news[count].description}</p>
                                            </li>
                                        </ul>
                                        <div className='switch-btn'>
                                            <button onClick={backmove} className="left"><i className="fa fa-arrow-left"></i></button>
                                            <button onClick={nextmove} className="right"><i className="fa fa-arrow-right"></i></button>
                                        </div>
                                        <br />
                                        <a href={news[count].url} className="read-more">Read More</a>
                                    </div>
                                </div>


                            </> : setCount(count + 1)
                    }
                </div>
            </>
        </>
    )
}

export default NewsApp;

{/* <div className='news-container'>
                {
                    news.map((data, index) => {
                        return (
                            <div key={index}>
                                <h1>{data.title}</h1>
                                <img src={data.urlToImage} className="my-img" alt="--" />
                                <p>{data.description}</p>
                                <small>{data.publishedAt}</small>
                                <br />
                                <small>{data.source.name}</small>
                                <a href={data.url}>Link</a>
                            </div>
                        )
                    })
                }
            </div> */}