import { Searchbar } from "@/components";
import styles from "./page.module.css";
import { getProducts } from "@/api";
import { Products } from "@/types";

export default async function Home() {
  const products: Products | null = await getProducts();
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Casavo Interview</h1>
      <Searchbar products={products} />
    </div>
  );
}
