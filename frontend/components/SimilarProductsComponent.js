import axios from "axios";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useQuery} from "urql";
import {PRODUCT_QUERY} from "@/lib/query";
import {Gallery} from "@/styles/Gallery";
import Product from "@/components/Product";

export default function SimilarProductsComponent() {

    const router = useRouter();
    const { slug } = router.query;
    const [recommendations, setRecommendations] = useState([]);

    // Function to fetch recommendations
    const fetchRecommendations = async (productId) => {
        try {
            if (productId) {
                const response = await axios.post('http://localhost:5000/get_recommendations', { product_id: productId });
                setRecommendations(response.data.recommendations || []);
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        if (slug) {
            fetchRecommendations(slug);
        }
    }, [slug]);

    // -------------    Similar product logic   -------------
    //Fetch products from strapi
    const [results] = useQuery({ query: PRODUCT_QUERY});
    const { data, fetching, error } = results;

    //Checks for the data coming in
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    let products = data.items.data;

    const findProductDetails = (productIds, details) => {
        return details.filter(product => productIds.includes(Number(product.attributes.Product_id)));
    };

    const matchingProductDetails = findProductDetails(recommendations, products);

    return (
        <div>
            <Gallery>

                {matchingProductDetails.map((product) => (
                    <Product key={product.attributes.slug} product={product} />
                ))}

            </Gallery>
        </div>
    )

}