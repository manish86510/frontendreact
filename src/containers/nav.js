import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import DateRangeOutlinedIcon from '@material-ui/icons/DateRangeOutlined';
import LocalOfferOutlinedIcon from '@material-ui/icons/LocalOfferOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { PropTypes } from 'prop-types';
import '../styles/side-nav.css'
import { Button, Avatar, Grow, Divider } from '@material-ui/core';
// import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareAlt, faTag, faCoins, faUsers } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
// import { borderRadius } from '@material-ui/system';
// import { withRouter } from 'react-router-dom';


const drawerWidth = 240;


const styles = theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    pageTitle: {
        borderBottom: '2px solid ' + theme.palette.primary.main,
        padding: '2px 10px',
        display: 'inline-block',
        marginRight: 20
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        background: '#fafafa',
        color: '#657786'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        background: '#fafafa',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },

});



class SideNav extends React.Component {
    state = {
        open: false,
        userMenuOpen: false,
        rightSidebarOpen: false,
        sideList: '',
        homeLink:true,
        bookmarkLink:false,
        bookmarkLink1:false,
        bookmarkLink2:false,
        eventsLink:false,
        collabrationLink:false,
        notificationLink:false,
        home_title: ""
    };
    userMenuRef = null;

    // menuList = [
    //     <HomeOutlinedIcon />,
    //     <ExploreOutlinedIcon />,
    //     <NotificationsNoneOutlinedIcon />,
    //     <WbIncandescentOutlinedIcon />,
    //     <DateRangeOutlinedIcon />,
    //     <LocalOfferOutlinedIcon />,
    //     <SettingsOutlinedIcon />
    // ];

    constructor(props) {
        super(props);
    }

    nav = () => {
        this.state.home_title = "Home";
        this.props.history.push({
            pathname: '/home',
        });
    }
    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };
    handleUserMenuClose = () => {
        this.setState({
            userMenuOpen: false,
            rightSidebarOpen: true
        });
    };
    handleUserMenuToggle = () => {
        this.setState({ userMenuOpen: !this.state.userMenuOpen });
    };

    handleMenuItems = () => {
        this.setState({
            rightSidebarOpen: false
        });
    }

    mynav = () => {
        this.state.home_title = "Home";
        this.setState({
            homeLink:true,
            bookmarkLink:false,
            bookmarkLink1:false,
            bookmarkLink2:false,
            notificationLink:false,
            collabrationLink:false,
            eventsLink:false,
        });
        this.props.history.push({ pathname: "/home" })
    }
    nav_bookmark = () => {
        this.state.home_title = "Bookmark";
        this.setState({
            homeLink:false,
            bookmarkLink:true,
            bookmarkLink1:false,
            bookmarkLink2:false,
            notificationLink:false,
            collabrationLink:false,
            eventsLink:false,
        });
        this.props.history.push({ pathname: "/bookmark" })
    }
    handleMessageNav = () => {
        this.state.home_title = "Message";
        this.props.history.push({ pathname: "/message" })
    }
    nav_notification = () => {
        this.state.home_title = "Notifications";
        this.setState({
            homeLink:false,
            bookmarkLink:false,
            bookmarkLink1:false,
            bookmarkLink2:false,
            notificationLink:true,
            collabrationLink:false,
            eventsLink:false,
        });
        this.props.history.push({ pathname: "/notifications" })
    }
    nav_collaborate = () => {
        this.state.home_title = "Collaborate";
        this.setState({
            homeLink:false,
            bookmarkLink:false,
            bookmarkLink1:false,
            bookmarkLink2:false,
            notificationLink:false,
            collabrationLink:true,
            eventsLink:false,
        });
        this.props.history.push({ pathname: "/collaborate" })
    }
    nav_profile = () => {
        this.state.home_title = "Profile";
        this.props.history.push({ pathname: "/profile" })
    }
    nav_events = () => {
        this.state.home_title = "Events";
        this.setState({
            homeLink:false,
            bookmarkLink:false,
            bookmarkLink1:false,
            bookmarkLink2:false,
            notificationLink:false,
            collabrationLink:false,
            eventsLink:true,
        });
        this.props.history.push({ pathname: "/events" })
    }
    nav_wallet = () => {
        this.state.home_title = "Wallet";
        this.props.history.push({ pathname: "/wallet" })
    }
    nav_logout = () => {
        this.props.history.push({ pathname: "/logout" })
    }
    handlelistSelected = () => {

    }

    render() {
        const { classes, children } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    elevation={0}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            <div className={classes.pageTitle}>
                                <HomeOutlinedIcon style={{ display: 'inline-block', marginBottom: '-5px' }} /> {this.state.home_title}
                            </div>
                            <div style={{ display: 'inline-block' }}>
                                <IconButton aria-label="search" size="medium">
                                    <SearchOutlinedIcon />
                                </IconButton>
                                
                            </div>
                        </Typography>
                        <div>
                            <IconButton aria-label="search" size="medium">
                                <MailOutlineOutlinedIcon onClick={this.handleMessageNav}/>
                            </IconButton>
                            <IconButton aria-label="search" size="medium">
                                <MonetizationOnOutlinedIcon onClick={this.nav_wallet} />
                            </IconButton>
                            <div style={{ display: 'inline-block', verticalAlign: 'middle', padding: '5px 10px' }}>
                                <div style={{ fontWeight: 'bold' }}>Suman Kumar</div>
                                <div>@suman</div>
                            </div>

                            <Button onClick={this.handleUserMenuToggle} ref="userMenuRef">
                                <Avatar
                                    src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                                </Avatar>
                            </Button>

                            <Popper open={this.state.userMenuOpen} role={undefined} transition disablePortal anchorEl={this.refs.userMenuRef}>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleUserMenuClose}>
                                                <MenuList autoFocusItem={this.state.userMenuOpen} id="menu-list-grow">
                                                    <MenuItem onClick={this.nav_profile}>Profile</MenuItem>
                                                    <MenuItem onClick={this.handleUserMenuClose}>My account</MenuItem>
                                                    <MenuItem onClick={this.nav_logout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>

                        </div>
                    </Toolbar>
                </AppBar>
                <Drawer
                    elevation={24}
                    data-name="Drawer"
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                    open={this.state.open}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    {/* <List>
                        {
                            this.menuList.map((item, index) => (
                                <ListItem button key={"menu_item_" + index}
                                onClick={this.mynav}
                                className={"menu-item"}>
                                    <ListItemIcon>
                                        {item}
                                    </ListItemIcon>
                                </ListItem>
                            ))
                        }
                        {
                            ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem button key={text} className={"menu-item"}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            </ListItem>
                        ))
                        }
                    </List> */}
                    <List>
                        <ListItem
                            button
                            selected={this.state.homeLink}
                            onClick={this.mynav}
                            className={"menu-item"}
                        >
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>

                        <ListItem button
                            selected={ this.state.bookmarkLink }
                            onClick={this.nav_bookmark}
                            className={"menu-item"}>
                            <ListItemIcon>
                                <ExploreOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button
                            selected={ this.state.notificationLink }
                            onClick={this.nav_notification}
                            className={"menu-item"}>
                            <ListItemIcon>
                                <NotificationsNoneOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button
                            selected={ this.state.collabrationLink }
                            onClick={this.nav_collaborate}
                            className={"menu-item"}>
                            <ListItemIcon>
                                <WbIncandescentOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button
                            selected={ this.state.eventsLink }
                            onClick={this.nav_events}
                            className={"menu-item"}>
                            <ListItemIcon>
                                <DateRangeOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button
                            selected={ this.state.bookmarkLink1 }
                            onClick={this.nav_bookmark}
                            className={"menu-item"}>
                            <ListItemIcon>
                                <LocalOfferOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem button
                            selected={ this.state.bookmarkLink2 }
                            onClick={this.nav_bookmark}
                            className={"menu-item"}>
                            <ListItemIcon>
                                <SettingsOutlinedIcon />
                            </ListItemIcon>
                        </ListItem>
                    </List>
                </Drawer>
                <Drawer
                    anchor="right"
                    open={this.state.rightSidebarOpen}
                >
                    {/* <MenuList autoFocusItem={this.state.userMenuOpen} id="menu-list-grow">
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <MenuItem onClick={this.handleMenuItems} key={text}>{text}</MenuItem>
                        ))}
                    </MenuList> */}

                    <List style={{ width: 350 }}>
                        <ListItem>
                            <Avatar
                                src={"https://upload.wikimedia.org/wikipedia/commons/0/01/Bill_Gates_July_2014.jpg"}>
                            </Avatar>

                            <div style={{ padding: 20 }}>
                                <div><b>Awosome Project</b></div>
                                <div>Suman Kumar@suman</div>
                            </div>
                            <IconButton color="inherit" aria-label="Close" style={{ float: 'right' }}>
                                <CloseIcon onClick={this.handleMenuItems} />
                            </IconButton><br />

                        </ListItem>
                        <div style={{ paddingLeft: 20 }}>
                            <IconButton size='small' color="inherit" aria-label="Close">
                                <FontAwesomeIcon icon={faComment} />
                            </IconButton>
                            <span style={{ paddingLeft: 10, fontSize: 12 }}>51</span>
                            <IconButton style={{ paddingLeft: 10 }} size='small' color="inherit" aria-label="Close">
                                <FontAwesomeIcon icon={faShareAlt} />
                            </IconButton>
                            <span style={{ paddingLeft: 10, fontSize: 12 }}>51</span>
                            <IconButton style={{ paddingLeft: 10 }} size='small' color="inherit" aria-label="Close">
                                <FontAwesomeIcon icon={faTag} />
                            </IconButton>
                        </div>
                        <Divider />
                    </List>
                    <div style={{ textAlign: 'justify', width: 350, padding: 20 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum egestas ex, vel ultrices est varius ac. Cras pulvinar vitae velit vitae iaculis. Curabitur ut nisi risus. Ut vestibulum libero non tortor ultrices venenatis. Mauris consequat odio at purus fermentum maximus. Curabitur ac semper justo.
                    </div><br />
                    <div style={{ textAlign: 'justify', width: 350, padding: [5, 20, 5, 20] }}>
                        <IconButton style={{ paddingLeft: 10 }} size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faCoins} />
                        </IconButton>
                        <span style={{ paddingLeft: 10, fontSize: 12 }}>$250</span>
                        <IconButton style={{ paddingLeft: 10 }} size='small' color="inherit" aria-label="Close">
                            <FontAwesomeIcon icon={faUsers} />
                        </IconButton>
                        <span style={{ paddingLeft: 10, fontSize: 12 }}>10</span>
                        <br />
                    </div>
                    <div style={{ textAlign: 'justify', width: 350, padding: 20 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum egestas ex, vel ultrices est varius ac. Cras pulvinar vitae velit vitae iaculis. Curabitur ut nisi risus. Ut vestibulum libero non tortor ultrices venenatis. Mauris consequat odio at purus fermentum maximus. Curabitur ac semper justo.
                    </div><br />
                    <div style={{ textAlign: 'justify', width: 350, padding: 20 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin bibendum egestas ex, vel ultrices est varius ac. Cras pulvinar vitae velit vitae iaculis. Curabitur ut nisi risus. Ut vestibulum libero non tortor ultrices venenatis. Mauris consequat odio at purus fermentum maximus. Curabitur ac semper justo.
                    </div><br />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}
                </main>
            </div>
        );
    }
}


SideNav.propTypes = {
    children: PropTypes.node.isRequired,
};

export default withRouter(withStyles(styles)(SideNav));
