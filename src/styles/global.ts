import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 //Configuração Padrão
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
 }

 input:focus{
   outline: 0;
 }

 `;

export default GlobalStyle;
