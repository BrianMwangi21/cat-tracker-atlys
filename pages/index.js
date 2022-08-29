import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState("");

  let changeHandler = (event) => {
    setCart(event.target.value);
  };

  let addToCart = (event) => {
    setLoading(true);
    event.preventDefault();
    fetch("/api/add?cart=" + cart)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadCart();
      });
  };

  let removeFromCart = (cart_to_remove) => {
    setLoading(true);
    fetch("/api/remove?cart=" + cart_to_remove)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadCart();
      });
  };

  let loadCart = () => {
    setLoading(true);
    fetch("/api/list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    loadCart();
  }, []);

  if (!data) return "Loading....";

  return (
    <div className={styles.container}>
      <Head>
        <title>Cart Tracker - Atlys Challenge</title>
        <meta name="description" content="Cart Tracker - Atlys Challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.grid}>
          <h1 className={styles.title}>
            Cart Tracker - Atlys Challenge
            <br />
            <br />
          </h1>
          {loading ? (
            <a href="#" className={styles.card}>
              <Image src="/loader.gif" alt="loader" />
            </a>
          ) : (
            <form className={styles.cardForm} onSubmit={addToCart}>
              <input
                className={styles.cardInput}
                type="text"
                name="cart"
                onChange={changeHandler}
                placeholder="Enter your item to cart here..."
              />
            </form>
          )}
          {data.map((item) => (
            <a
              href="#"
              key={item}
              onClick={() => removeFromCart(item)}
              className={styles.card}
            >
              <p>{item}</p>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
