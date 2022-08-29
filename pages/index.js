import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState({
    name: "",
    color: "",
    timeZone: "",
  });

  let addToCart = (event) => {
    setLoading(true);
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    };

    fetch("/api/add", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadCart();
      });
  };

  let removeFromCart = (id) => {
    setLoading(true);
    fetch("/api/remove?id=" + id)
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
          {data?.map((item) => {
            const {id, name, color, timeZone} = JSON.parse(item);
            return (
              <a
                href="#"
                key={id}
                onClick={() => removeFromCart(id)}
                className={styles.card}
              >
                <p>{name}</p>
                <p>Color : {color}</p>
                <p>Current Time : {timeZone}</p>
              </a>
            );
          })}
          {loading ? (
            <a href="#" className={styles.card}>
              <Image
                src="/loader.gif"
                alt="loader"
                width="16px"
                height="16px"
              />
            </a>
          ) : (
            <form className={styles.cardForm} onSubmit={addToCart}>
              <input
                className={styles.cardInput}
                type="text"
                name="name"
                onChange={(event) => {
                  setCart({ ...cart, name: event.target.value });
                }}
                placeholder="Enter name of product here..."
              />
              <input
                className={styles.cardInput}
                type="text"
                name="color"
                onChange={(event) => {
                  setCart({ ...cart, color: event.target.value });
                }}
                placeholder="Enter color of product here..."
              />
              <input
                className={styles.cardInput}
                type="text"
                name="timeZone"
                onChange={(event) => {
                  setCart({ ...cart, timeZone: event.target.value });
                }}
                placeholder="Enter your timezone here..."
              />
              <button type="submit">Add to cart</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
