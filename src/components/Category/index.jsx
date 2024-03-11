import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory } from "../../redux/slices/products";
import Dropdown from "../../elements/Dropdown";

import "./style.css";

const CategoryBox = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.category.data); // получаем данные в redux
  const [fields, setFields] = useState(null);
  const [field, setField] = useState(null);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(50);
  const [obj, setObj] = useState({
    // params для запроса на сервер
    action: "get_fields",
    params: { field: field, offset: offset, limit: limit },
  });

  useEffect(() => {
    const fetchData = async () => {
      if (fields === null) {
        try {
          const response = await dispatch(
            fetchCategory({
              action: "get_fields",
            })
          );
          //   console.log(response);
          //   console.log(response.payload.result)
          setFields(response.payload.result);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [fields]);

  const categoryClickHandler = (e) => {
    setField(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (field !== "all" && field !== null) {
        try {
          const response = await dispatch(
            fetchCategory({
              action: "get_fields",
              params: { field: field, offset: offset, limit: limit },
            })
          );
            // console.log(response);
            // console.log(response.payload.result)
            const uniqueIds = Array.from(new Set(response.payload.result));
            console.log(uniqueIds)
          // setFields(response.payload.result);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [field]);

  return (
    <div>
      <Dropdown categories={fields} categoryClick={categoryClickHandler} />
    </div>
  );
};

export default CategoryBox;
