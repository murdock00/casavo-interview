"use client";
import { Product, Products } from "@/types";
import {
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./searchbar.module.css";

interface SuggestState {
  show: boolean;
  product?: Product;
}

const Searchbar = ({
  products,
}: {
  products: Products | null;
}): ReactElement => {
  const [value, setValue] = useState("");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [suggest, setSuggest] = useState<SuggestState>({
    show: false,
  });
  const timeout = useRef<NodeJS.Timeout | null>(null);

  /* created function for change value and keyboard press for reusing fn instead of create every time a new anon function that used memory */

  const changeValue = (e: { target: { value: SetStateAction<string> } }) =>
    setValue(e.target.value);

  const keyboardPress = (e: { code: string }) => {
    if (e.code === "Tab" && suggest?.product?.title) {
      setValue(suggest?.product?.title);
      setSuggest({ show: false });
    }
  };


  /* if user click on product in the product list value setted with value clicked */
  const choiceProduct = (id: number) => () => {
    const product = products?.products.find((el) => el.id === id);
    if (product) {
      setSuggest({ show: false });
      setValue(product?.title);
    }
  };

  const showSuggest = (product: Product) => {
    timeout.current = setTimeout(() => {
      setSuggest({ show: true, product });
    }, 3000);
  };

  const filterData = () => {
    if (timeout.current) clearTimeout(timeout.current);
    const filteredData = products?.products?.filter((product) =>
      product?.title.toLowerCase().includes(value)
    );

    /* chnage state of filtered data only input value is more than 3 char and filtereddata exist */
    if (filteredData && filteredData?.length > 0 && value.length > 3) {
      setFilteredData(filteredData);
      showSuggest(filteredData[0]);
    }
  };

  /* suggest is avaible only when user type from 3 char and suggest close when it is visibile and user typing in a new time */

  useEffect(() => {
    if (suggest.show || value.length < 3) setSuggest({ show: false });
    filterData();
  }, [value]);

  /* on component unmount timeout is cleared */

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return (
    <div className={style.container}>
      <div className={style.inputContainer}>
        <input
          className={style.input}
          style={{
            color: suggest.show ? "slategray" : "inherit",
            fontFamily: suggest.show ? "cursive" : "sans-serif",
          }}
          value={
            value.length > 3 && suggest.show && suggest.product
              ? suggest.product.title
              : value
          }
          placeholder="Nome prodotto"
          onChange={changeValue}
          onKeyDown={keyboardPress}
        ></input>
        {value.length > 3 && suggest.show && (
          <span className={style.suggestText}>
            Premi tab per confermare il suggerimento
          </span>
        )}
      </div>

      {value.length > 3 && filteredData.length > 0 && (
        <div className={style.results}>
          {filteredData.map((el) => (
            <div
              key={el.id}
              className={style.product}
              onClick={choiceProduct(el.id)}
            >
              <span>{el.title}</span>
              <span>{el.price}€</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
