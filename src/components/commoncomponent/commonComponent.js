import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Container } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    imageContainer:{
        width:'100%',
        height:"100%",
        overflow:"hidden",
    },
    image:{
        width: '100%',
        height: '100%',
        objectFit:"contain"
    },
    heading:{
        textAlign:"center",
        padding:"1rem 0rem 1rem 0rem"
    },
}));


export default function CommonComponent(){
    const classes = useStyles();
    return(
        <>
        <Container>
            <Box className={classes.imageContainer} >
                <img src="https://st.adda247.com/https://adda247jobs-wp-assets-prod.adda247.com/articles/wp-content/uploads/2022/11/24173027/Schemes-of-Indian-Government.jpg" alt="imageishere" className={classes.image}/>
            </Box>
            <Typography variant="h4" className={classes.heading}>Here Is Heading Of Government Scheme</Typography>
            <Typography>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

            The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Typography>
            <br/><br/><br/>
            <Typography>Here Is dummy URL</Typography>
        </Container>

        </>
    )
}