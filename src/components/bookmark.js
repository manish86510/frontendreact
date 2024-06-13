import React,{useState,useEffect} from 'react';
// import PostHotTopics from './hot-topics/hot-topic';
import Grid from '@material-ui/core/Grid';
import BookmarkTabs from './bookmark-tab'
import { withStyles } from '@material-ui/styles';
import RightTab from './rightTab/RightTab';
import Carousel from './carousel';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


const styles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

export default function Bookmark(){
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

        return (
            <div>
                 <Grid ><Carousel/></Grid>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={8}>
                        <BookmarkTabs />
                    </Grid>
                    <Grid item xs={4}>
                        <RightTab />
                    </Grid>
                </Grid>
            </div>
        );
    }
