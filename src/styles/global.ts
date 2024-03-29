import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 //Configuração Padrão
 *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 14px;
    
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
  outline: none;
  border-color: #719ECE;
 }
 textarea:focus{
  outline: none;
  border-color: #719ECE;
 }


 `;

export default GlobalStyle;
