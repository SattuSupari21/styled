import { styled } from "styled-components";

export const ProductStyles = styled.div`
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    cursor: pointer;
    //box-shadow: 1px 1px 20px -5px rgba(0,0,0,0.2);
    //-webkit-box-shadow: 1px 1px 20px -5px rgba(0,0,0.2);
    //-moz-box-shadow: 1px 1px 20px -5px rgba(0,0,0,0.2);
    
    img {
        width: 100%;
        object-fit: cover;
    }

    h2 {
        font-size: 1rem;
        padding: 0.5rem 0rem;
    }
`;