import { useState, useEffect } from "react";
import ProdCard from "../../components/smallProd";

import "./style.css";

const AllProd = ({ data }) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const renderElem = data.map((item, i) => {
    return (
      <ProdCard key={i} brand={item.brand} id={item.id} price={item.price} product={item.product}/>
    );
  });

  return <div className="allProd">{renderElem}</div>;
};

export default AllProd;
