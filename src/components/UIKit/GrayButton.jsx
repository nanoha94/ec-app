import React from "react";
import {makeStyles} from "@material-ui/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
    "button" : {
        backgroundColor: "#e0e0e0",
        fontSize: 16,
        height: 48,
        marginBottom: 16,
        width: 256
    }
})

const GrayButton = (props) => {
    const classes = useStyles();
    return(
        <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>{props.label}</Button>
    )
}
export default GrayButton;