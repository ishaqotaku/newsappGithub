import React from "react";

function NewsItem(props) {
  const {title, description, author, date, source, imageUrl, newsUrl} = props.info;

  return (
    <div className="card h-100">
        <span className="position-absolute translate-middle-y top-0 end-0 badge rounded-pill bg-danger" style={{zIndex : "1"}}>{source}</span>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="cardInfo">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <div className="cardButton mt-2">
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
          <div className="card-footer">
            <p className="card-text"><small className="text-body-secondary">By {author} on {date}</small></p>
          </div>
      </div>
  );
}

export default NewsItem;
