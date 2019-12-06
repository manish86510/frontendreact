import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
    card: {
        maxWidth: 345,
      },
      media: {
        height: 220,
      },
    cardHeader:{
        fontSize: 16,
        fontWeight: 'bold'
    }
});

class HotTopic extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <Card>
                <CardHeader title={
                    <Typography className={classes.cardHeader}>Hot Topics</Typography>
                }
                action={
                    <IconButton aria-label="settings">
                        <RefreshIcon />
                    </IconButton>
                }>
                </CardHeader>
                <CardMedia className={classes.media} image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg" />
                <CardContent>                        
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default withStyles(styles)(HotTopic);