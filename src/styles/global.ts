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
        --red-500: #b42828;
    }

    * {
        margin: 0;
        padding: 0;  
        box-sizing: 0;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
         }
    
         @media (max-width: 720px) {
             font-size: 67.5%;
         }
    }

    body {
        font-family: 'Poppins';  
    }

    h1 {
        font-size: 24px;
    }

    h2 {
        font-size: 20px;
    }
    h3 {
        font-size: 18px;
    }
    h4 {
        font-size: 16px;
    }
    h5 {
        font-size: 14px;
    }
    h6 {
        font-size: 12px;
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

  .icon-link {
      color: white;
      font-style: none;
    &:visited {
        color: white;
    }
  }  

 .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
 }

 .react-modal-content {
    overflow-y: auto;
    width: 100%;
    max-width: 1000px;
    background-color: white;
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
 }

 .react-modal-content-spinner {
    overflow-y: auto;
    width: 100%;
    max-width: 576px;
    position: relative;
 }

 .react-modal-close {
     position: absolute;
     right: 1.5rem;
     top: 1.5rem;
     display: flex;
     align-items: center;
     border: 0;
     border-radius: 8px;
     background: transparent;

     transition: 0.2s ease;

     &:hover {
         background-color: var(--white-300);
     }
 }
`;

export default GlobalStyle;
