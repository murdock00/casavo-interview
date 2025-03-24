import { Products } from "@/types/product";

export const getProducts = async (): Promise<Products | null> => {
  try {
    const data = await fetch("https://dummyjson.com/products");
    const res: Products = await data.json();
    return res;
  } catch (error) {
    console.error(error);
    return null;
  }
};
