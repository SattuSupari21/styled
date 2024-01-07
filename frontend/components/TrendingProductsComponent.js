import {useState} from "react";
import {GET_TRENDING_QUERY} from "@/lib/query";
import {useQuery} from "urql";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

export default function TrendingProductsComponents() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    const [trending, setTrending] = useState([]);

    //Fetch products from strapi
    const [results] = useQuery({ query: GET_TRENDING_QUERY});
    const { data, fetching, error } = results;

    //Checks for the data coming in
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    let products = data.items.data;

    return (
        <div style={{justifyContent: 'center', alignItems: 'center', marginBottom: '5rem'}}>
            <Slider {...settings}>
                {
                    products.map((product) => {
                        return (
                            <Link href={`/product/${product.attributes.slug}`}>
                                <img key={product.attributes.Product_id}
                                     src={product.attributes.Image.data.attributes.formats.small.url}
                                     style={{width: '100%'}}/>
                            </Link>
                        )
                    })
                }
            </Slider>
        </div>
    )
}