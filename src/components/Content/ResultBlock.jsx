import React from "react";
import "./ResultBlock.css";
const ResultBlock = (props) => {
  return (
    <div className="searchResult">
      <ol className="resultList">
        {props.results
          ? props.results.map((item, index) => (
              <li key={index}>
                <h2>
                  <a className="title" href={item.url} target="_blank">
                    {item.title}
                  </a>
                </h2>
                <div className="caption">
                  <div className="snippet">
                    <cite className="urlDisplay">{item.url}</cite>
                    <p className="metaData">{item.metadata}</p>
                  </div>
                  <div className="suggestions"></div>
                </div>
              </li>
            ))
          : null}
      </ol>
    </div>
  );
};

export default ResultBlock;
