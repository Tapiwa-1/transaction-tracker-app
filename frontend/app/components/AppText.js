import React from "react";
import { Text } from "react-native";
import colors from "../config/colors";
import defaulStyles from "../config/styles"


function AppText({ children, style, ...otherProps }) {
    return (
        <Text style={[defaulStyles.text, style]} {...otherProps}>{children}</Text>
    )
}





export default AppText;