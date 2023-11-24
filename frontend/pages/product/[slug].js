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
    const { BrandName, Description, Image, Price } = data.items.data[0].attributes;

    const notify = () => {
        toast.success(`${BrandName} added to your cart 🤩`, {
            duration: 1000,
        });
    }

    return (
        <DetailsStyle>
            <img src={Image.data.attributes.formats.small.url} alt={BrandName} />
            <ProductInfo>
                <h3>{BrandName}</h3>
                <p>{Description}</p>
                <p>Rs. {Price}</p>
                <Quantity>
                    <span>Quantity</span>
                    <button onClick={DecreaseQty}><AiFillMinusCircle /></button>
                    <p>{qty}</p>
                    <button onClick={IncreaseQty}><AiFillPlusCircle /></button>
                </Quantity>
                <Buy onClick={() => {
                    onAdd(data.items.data[0].attributes, qty);
                    notify();
                }}>
                    Add to cart
                </Buy>
            </ProductInfo>
        </DetailsStyle>
    )
}