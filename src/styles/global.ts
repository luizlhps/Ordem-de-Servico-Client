import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 //Configuração Padrão
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
 }

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
  input[type=number] {
  -moz-appearance: textfield;
}
}


 input:focus{
   outline: 0;
 }

 `;

export default GlobalStyle;
