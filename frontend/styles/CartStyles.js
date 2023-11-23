import styled from 'styled-components';

const { motion } = require('framer-motion');

export const CartWrapper = styled(motion.div)`
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    z-index: 100;
    display: flex;
    justify-content: flex-end;
`;

export const CartStyle = styled(motion.div)`
    width: 30%;
    background: #f1f1f1;
    padding: 2rem 4rem;
    overflow-y: scroll;
    position: relative;
`;

export const Card = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 1rem;
    overflow: hidden;
    background: white;
    padding: 1rem;
    margin: 2rem 0rem;
    img {
        width: 8rem;
    }
`;

export const CardInfo = styled.div`
    width: 50%;
`;

export const EmptyStyle = styled(motion.div)`
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 80%;
    h2 {
        font-size: 1.5rem;
        padding: 1rem;
    }
    svg {
        font-size: 3rem;
        color: var(--secondary);
    }
`;

export const Quantity = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0rem;
    button {
        gap: 20px;
        background: transparent;
        border: none;
        display: flex;
        font-size: 1.2rem;
    }
    p {
        width: 1rem;
        text-align: center;
    }
    span {
        color: var(-secondary);
        margin-right: 10px;
    }
    svg {
        color: #494949;
    }
`

export const Checkout = styled(motion.div)`
    button {
        background: var(--primary);
        padding: 1rem 2rem;
        width: 100%;
        color: white;
        margin-top: 2rem;
        cursor: pointer;
        border: none;
    }
`

export const Cards = styled(motion.div)``;