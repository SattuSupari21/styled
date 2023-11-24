import { ProductStyles } from "@/styles/ProductStyle";

import Link from "next/link";

export default function Product({ product }) {

    const { BrandName, Price, Image, slug } = product.attributes;

    return (
        <ProductStyles>
            <Link href={`/product/${slug}`}>
                <div>
                    <img src={Image.data.attributes.formats.small.url} alt={slug} />
                </div>
            </Link>
            <h2>{BrandName}</h2>
            <h3>Rs. {Price}</h3>
        </ProductStyles>
    )
}