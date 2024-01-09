import React from "react";

import { Button as ContainerButton } from "./styles";

function Button( {children, ...props} ) { // ...props é para pegar o onclick e todas as outras funções, o isBack tbm chega

    return <ContainerButton {...props} > { children }</ContainerButton>

}

export default Button;