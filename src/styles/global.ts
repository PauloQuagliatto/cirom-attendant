import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --white-300: #C4C4C4;
        --blue-500: #282D7C;
    }

    * {
        margin: 0;
        padding: 0;  
        box-sizing: 0;
        overflow: hidden;
    }

    body {  
        font-family: 'Poppins';  
    }

    button{
        cursor: pointer;

        border: none;
        border-radius: 8px;
    }
`;

export default GlobalStyle;
