import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GettingWork from "./GettingWork";
import PostingWork from "./PostingWork";
import Grid from '@material-ui/core/Grid';
import RightTab from "../rightTab/RightTab";
import { useEffect } from "react";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function MyWork({myWorkId,myPostId}){
    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const onGettingUser =(userId)=>{
      console.log("i am getting user id in parent",userId)
      myWorkId(userId)
      }

    const onPostingUser = (userId)=>{
      console.log("i am getting id in posting",userId)
      myPostId(userId)
    }

     


    return(
        <>
        <Grid container direction="row"  spacing={3}>
        <Grid item xs={8}>
        <div className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Work Getting" />
        <Tab label="Work Posted" />
      </Tabs>
      {value === 0 && <GettingWork id={onGettingUser}/>}
      {value === 1 && <PostingWork id={onPostingUser}/>}
    </div>
    </Grid>
    <Grid item xs={4}><RightTab/></Grid>
    </Grid>
        </>
    )
}