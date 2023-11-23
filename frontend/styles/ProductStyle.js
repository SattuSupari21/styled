import { styled } from "styled-components";

export const ProductStyles = styled.div`
    background-color: white;
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    cursor: pointer;
    
    img {
        width: 100%;
        object-fit: cover;
    }

    h2 {
        font-size: 1rem;
        padding: 0.5rem 0rem;
    }
`;