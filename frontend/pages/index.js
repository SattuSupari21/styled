import Head from "next/head";
import {GET_RANDOM_PRODUCTS, PRODUCT_QUERY} from "../lib/query";
import { useQuery } from "urql";
import Product from "../components/Product";
import { Gallery } from "../styles/Gallery";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Home() {
  //Fetch products from strapi
  const [results] = useQuery({ query: PRODUCT_QUERY});
  const { data, fetching, error } = results;

  //Checks for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  let products = data.items.data;

    function shuffleArray(array) {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }

    products = shuffleArray(products);
    console.log(products);

  return (
      <div>
        <Head>
          <title>Styled Homepage</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <Gallery>
            {fetching && <Skeleton />}
            {products.map((product) => (
                <Product key={product.attributes.slug} product={product} />
            ))}
          </Gallery>
        </main>
      </div>
  );
}