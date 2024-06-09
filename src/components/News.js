import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

function News(props) {
  const [fullData, setFullData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);


  const dataFilter = (data) => {
    let newData = data.articles.filter((article) => article.title !== "[Removed]");
    let diff = data.articles.length - newData.length;
    data.totalResults = (totalResults === 0 ? data.totalResults : totalResults) - diff;
    data.articles = newData;
    return data;
  }

  const updateData = () => {
    let newData = [];
    if(fullData){
      setLoading(true);
      for (let i = 0; i < props.newsInfo.pageSize; i++) {
        newData.push(fullData.shift());
      }
      setArticles([...articles, ...newData]);
      setLoading(false);
    }
  }

  const newPage = async () => {
            props.newsInfo.setProgress(10);
            // const url = `https://newsapi.org/v2/top-headlines?country=${props.newsInfo.country}&category=${props.newsInfo.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.newsInfo.pageSize}`;
            const url = `https://saurav.tech/NewsAPI/top-headlines/category/${props.newsInfo.category}/${props.newsInfo.country}.json`;
            setLoading(true);
            let data = await fetch(url);
            props.newsInfo.setProgress(30);
            let parsedData = await data.json();
            props.newsInfo.setProgress(70);

            if (parsedData.status === "ok")
              {
                let filteredData = dataFilter(parsedData);
                setFullData(filteredData.articles);
                setLoading(false);
                setTotalResults(filteredData.totalResults);
                setArticles(filteredData.articles.slice(0,props.newsInfo.pageSize));
              }
              props.newsInfo.setProgress(100);
  };

  useEffect(() => {
    document.title = `NewsMonkey - ${props.capitalizeFirst(props.newsInfo.category)}`;
    const dataFetch = async () => newPage();
    dataFetch();
    // eslint-disable-next-line 
  }, [props.newsInfo.country]);

  const fetchMoreData = async () => updateData();

  return (
    <div className="container my-3">
        <h1 className="text-center mb-5" style={{marginTop:"90px"}}>NewsMonkey - Top {props.capitalizeFirst(props.newsInfo.category)} Headlines</h1>
        {loading && (
          <div className="d-flex justify-content-center my-5">
            <div className="spinner-border text-success"></div>
          </div>
        )}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={
            <div className="d-flex justify-content-center my-5">
              <div className="spinner-border text-success"></div>
            </div>
          }
        >
          <div className="container">
            <div className="row d-flex justify-content-center">
              {articles.map((item, index) => {
                let info = {
                  title: item.title ? item.title : "No Title",
                  description: item.description ? item.description : "No Description",
                  imageUrl: item.urlToImage ? item.urlToImage : "./../assets/images/noImage.png",
                  newsUrl: item.url ? item.url : "No Url",
                  author: item.author ? item.author : "Unkown",
                  date: item.publishedAt ? new Date(item.publishedAt).toGMTString() : "Unknown Date",
                  source: item.source.name ? item.source.name : "Unknown",
                };
                return (
                  <div key={item.url + index} className="col-md-6 col-xl-4 col-xxl-3 my-2">
                    <NewsItem key={`child${item.url + index}`} info={info} />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
  );
}

News.defaultProps = {
  newsInfo: {
    country: "us",
    pageSize: 8,
    category: "general",
  },
};

News.propTypes = {
  newsInfo: PropTypes.object
  };

export default News;
