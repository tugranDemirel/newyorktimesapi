import React from "react";

const Item = ({ item }) => {
    console.log(item)
    return <div className="item-area">
        <img src={ item.multimedia.src } alt="" width={210} height={140}/>
        <h3>{item.headline}</h3>
        <div className="info">
            <span>
                {item.byline}
            </span>
            <span>
                {item.publication_date}
            </span>
        </div>
        <p>{ item.summary_short.substring(0,200)}</p>
        <a href={item.link.url} target="_blank"> Bağlantıya git</a>
    </div>
}
export default Item