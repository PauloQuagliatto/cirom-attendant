import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        --white-300: #C4C4C4;
        --white-500: #a1a1a1;

        --blue-300: #4f56bb;
        --blue-500: #282D7C;

        --green-300: #33D330;

        --yellow-300: #EEE507;

        --red-300: #ec7878;
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

    input, label, textarea, select, option, li, button {
        font-family: 'Poppins';
    }

    button{
        cursor: pointer;

        border: none;
        border-radius: 8px;
    }

    .functional-icon {
        display: flex;
        align-items: center;
        cursor: pointer;

        border-radius: 50%;

        transition: 0.2s ease;
        &:hover {
            background-color: var(--white-500);
            color: white;
        }
    }
`;

export default GlobalStyle;
