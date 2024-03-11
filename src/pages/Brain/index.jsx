import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products";
import AllProd from "../ProdsPage";
import Pagination from "../../components/Pagination";
import Loading from "../../components/Loading";
import "./style.css";

const Brain = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.data); // получаем данные в redux
  const [step, setStep] = useState(0); // счетчик порядка поочередности действий
  const [countPage, setCountPage] = useState(1); // счетчик страниц
  const [countElem] = useState(50); // счетчик элементов на странице (в дальнейшем можно будет просто менять колличество элементов на странице)
  const [offset, setOffset] = useState(0); // порядковый индекс продукта, с которого начинается запрос на сервер
  const [limit, setLimit] = useState(50); // лимит продуктов(отличается от countElem тем, что изменяется при выявлении повторяющихся элементах)
  const [uniqueData, setUniqueData] = useState(null); // профильтрованный список элементов
  const [render, setRender] = useState(null); // профильтрованный список элементов в колличестве 50 шт
  const [obj, setObj] = useState({
    // params для запроса на сервер
    action: "get_ids",
    params: { offset: offset, limit: limit },
  });

  // useEffect для отслеживания колличества элементов в массиве после фильтрации фильтрации
  useEffect(() => {
    if (uniqueData && uniqueData.length < 50 && uniqueData.length > 1) {
      setLimit((e) => e + 1);
      setStep(10);
    }
    if (uniqueData && uniqueData.length === 50) {
      setRender(uniqueData); // готовые элементы помещаются в render для отправки в компонент AllProd для рендеринга
      // console.log("uniqueData.length === 50");
      setStep(99); // остановка процесса запросов данных с сервера
    }
  }, [uniqueData]);

  // Отслеживание клика по arrow в компоненте Pagination
  useEffect(() => {
    if (countPage === 1) {
      setLimit(50);
      setOffset(0);
      setStep(10);
    } else {
      setLimit(50);
      setOffset(countPage * countElem);
      setStep(10);
    }
  }, [countPage]);

  // Вывод ключевых данныx в консоль
  useEffect(() => {
    console.log(`
    ${countPage} - номер траницы
    ${limit} - лимит товаров на странице(с учётом повторяющихся)
    ${offset} - с какого товара начинается запрос`);
  }, [countPage, offset, limit]);

  // основная функция древа запросов по значению step
  useEffect(() => {
    // возвращение к первому шагу ( получению массива id )
    if (step === 10) {
      setObj({
        action: "get_ids",
        params: { offset: offset, limit: limit },
      });
      setStep(0);
    }
    // получение объектов по массиву id
    if (data && data.result && step === 0) {
      setObj({
        action: "get_items",
        params: { ids: data.result },
      });
      setStep(1);
    }
    // фильтр полученных объектов
    if (data && data.result && step === 1) {
      const uniqueData = Object.values(
        data.result.reduce((acc, obj) => {
          if (!acc[obj.id]) {
            acc[obj.id] = obj;
          }
          return acc;
        }, {})
      );
      setUniqueData(uniqueData);
    }
    console.log();
  }, [data, step]);

  // функция запроса, которая срабатывает только, если step !== 99 (при step === 99 происходит блокировка процесса запросов)
  useEffect(() => {
    if (step !== 99) {
      const fetchData = async () => {
        try {
          const response = await dispatch(fetchProducts(obj));
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [step, obj]);

  // фукция отслеживания перехода страниц
  const arrowClickHandler = (e) => {
    if (e === "left" && countPage > 1) {
      setCountPage((e) => e - 1);
      setRender(null);
    } else if (e === "right") {
      setCountPage((e) => e + 1);
      setRender(null);
    }
  };
  return (
    <div>
      {render !== null ? (
        <div>
          <h1>Продукты:</h1>
          <AllProd data={render} />
          <Pagination arrowClick={arrowClickHandler} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Brain;
