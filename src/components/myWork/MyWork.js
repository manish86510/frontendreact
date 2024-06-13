import React,{useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GettingWork from "./GettingWork";
import PostingWork from "./PostingWork";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));

export default function MyWork(){
    const classes = useStyles();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <>

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
      {value === 0 && <GettingWork/>}
      {value === 1 && <PostingWork/>}
    </div>

        </>
    )
}