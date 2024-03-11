import "./style.css";

const ProdCard = (props) => {
  const { i, brand, id, price, product } = props;
  return (
    <div className="prodCard">
      <div className="prodCardCategory">
        <p>Бренд : </p>
        <span>{brand !== null ? brand : "брендоф нетъ"}</span>
      </div>
      <div className="prodCardCategory">
        <p>Иди: </p>
        <span>{id}</span>
      </div>
      <div className="prodCardCategory">
        <p>Цена: </p>
        <span>{price}</span>
      </div>
      <div className="prodCardCategory">
        <p>Название: </p>
        <span>{product}</span>
      </div>
    </div>
  );
};
export default ProdCard;
