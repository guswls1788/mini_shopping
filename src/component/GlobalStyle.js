import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    body{
        padding: 0;
        margin: 0;
        font-family: 'Noto Sans KR', sans-serif;
    };
    button{
        display: flex;
        cursor: pointer;
        outline: none;
        border:0
    };
    input{
        display: flex;
        outline: none;
        padding-left: 10px;
    }
    a{
        color:#000;
        text-decoration:none;
    }
    *{
        box-sizing: border-box;
        margin:0;
        padding:0;
    }
    ul,li{
        margin:0;
        padding:0;
    }
    @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);

.notosanskr * { 
 font-family: 'Noto Sans KR', sans-serif;
}
`;

export default GlobalStyle;