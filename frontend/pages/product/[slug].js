import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "@/lib/query";
import { useRouter } from "next/router";
import toast, {Toaster} from "react-hot-toast";

import { ProductInfo, Quantity, Buy, DetailsStyle } from "@/styles/ProductDetails";

import {AiFillPlusCircle, AiFillMinusCircle} from 'react-icons/ai';

import { useStateContext } from "@/lib/context";

export default function ProductDetails() {

    // use state
    const { qty, IncreaseQty,  DecreaseQty, onAdd } = useStateContext();

    // fetch slug
    const { query } = useRouter();  

    // fetch graphql data
    const [results] = useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {slug: query.slug}
    })

    const {data, fetching, error} = results;
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;

    // extracting our data
    const { title, description, image, price } = data.products.data[0].attributes;

    const notify = () => {
        toast.success(`${title} added to your cart 🤩`, {
            duration: 1000,
        });
    }

    return (
        <DetailsStyle>
            <img src={image.data.attributes.formats.medium.url} alt={title} />
            <ProductInfo>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>${price}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button onClick={DecreaseQty}><AiFillMinusCircle /></button>
                    <p>{qty}</p>
                    <button onClick={IncreaseQty}><AiFillPlusCircle /></button>
                </Quantity>
                <Buy onClick={() => {
                    onAdd(data.products.data[0].attributes, qty);
                    notify();
                }}>
                    Add to cart
                </Buy>
            </ProductInfo>
        </DetailsStyle>
    )
}