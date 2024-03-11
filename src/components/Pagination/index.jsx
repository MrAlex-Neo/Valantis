import Arrow from "../../elements/arrow";
import "./style.css";

const Navigation = (props) => {
  const clickHandler = (e) => {
    props.arrowClick(e.currentTarget.getAttribute("name"))
  };

  return (
    <div className="navigation"> 
      <div className="arrowLeft" name="left" onClick={clickHandler}>
        <Arrow data="left"/>
      </div>
      <div className="page">
        {props.page}
      </div>
      <div className="arrowRight" name="right" onClick={clickHandler}>
        <Arrow data="right"/>
      </div>
    </div>
  );
};

export default Navigation;
