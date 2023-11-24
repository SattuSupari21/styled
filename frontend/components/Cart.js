import { useStateContext } from "../lib/context"
import getStripe from "../lib/getStripe";
import { CartWrapper, CartStyle, Card, CardInfo, EmptyStyle, Quantity, Checkout, Cards } from "@/styles/CartStyles";
// import { Quantity } from "@/styles/ProductDetails";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

import {FaShoppingCart} from "react-icons/fa"

const card = {
    hidden: {opacity: 0, scale: 0.8},
    show: {opacity: 1, scale: 1, transition: 0.3},
};

const cards = {
    hidden: {opacity: 1},
    show: {
            opacity: 1,
            transition: {
                delayChildren: 0.4,
                staggerChildren: 0.1,
            },
        },
};


export default function Cart() {
    
    const { cartItems, setShowCart, onAdd, onRemove, totalPrice } = useStateContext();

    // Payment
    const handleCheckout = async () => {
        const stripe = await getStripe();
        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cartItems)
        });
        const data = await response.json();
        console.log(data);
        await stripe.redirectToCheckout({ sessionId: data.id });
    }
    
    return (
        <CartWrapper animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} onClick={() => setShowCart(false)}>
            {/*{console.log(cartItems)}*/}
            <CartStyle initial={{x: '50%'}} animate={{x: '0%'}} transition={{type: 'tween'}} exit={{x: '50%'}} onClick={(e) => e.stopPropagation()}>
                {cartItems.length < 1 &&  (
                    <EmptyStyle initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{delay: 0.2}}>
                        <h2>You have more shopping to do 😉</h2>
                        <FaShoppingCart />
                    </EmptyStyle>
                )}
                <Cards variants={cards} initial="hidden" animate="show" layout>
                    {cartItems.length >= 1 &&
                        cartItems.map((item) => {
                            console.log(item);
                            return (
                                <Card layout key={item.slug} variants={card}>
                                    <img src={item.Image.data.attributes.formats.thumbnail.url} alt={item.BrandName} />
                                    <CardInfo>
                                        <h3>{item.BrandName}</h3>
                                        <h3>Rs. {item.Price}</h3>
                                        <Quantity>
                                            <span>Quantity</span>
                                            <button onClick={() => onRemove(item)} style={{cursor: 'pointer'}}>
                                                <AiFillMinusCircle />
                                            </button>
                                            <p>{item.quantity}</p>
                                            <button onClick={() => onAdd(item, 1)} style={{cursor: 'pointer'}}>
                                                <AiFillPlusCircle />
                                            </button>
                                        </Quantity>
                                    </CardInfo>
                                </Card>
                            );
                        })
                    }
                </Cards>
                {cartItems.length >= 1 && (
                    <Checkout layout>
                        <h3>Subtotal: Rs. {totalPrice}</h3>
                        <button onClick={handleCheckout}>Purchase</button>
                    </Checkout>
                )}
            </CartStyle>
        </CartWrapper>
    );
}