import React from "react";
import Typography from '@material-ui/core/Typography';

function Services({name,shortdesc,longdesc,ellipsis,onClick}){
    return(
        <>
        {/* <Box style={{margin:"0.5rem 0rem 0.5rem 0rem"}}> */}
        <Typography variant="h5" style={{padding:"0.1rem",fontWeight:600}}>{name.toUpperCase()}</Typography>
        <Typography style={{padding:"0.4rem",fontSize: '1rem'}}>{shortdesc}</Typography>
        <Typography style={{padding:"0.4rem",fontSize: '1rem'}}>
            {longdesc}
              {ellipsis &&  <span onClick={onClick}>...read more</span> }</Typography>
        {/* </Box> */}
        </>
    )
}

export default Services;