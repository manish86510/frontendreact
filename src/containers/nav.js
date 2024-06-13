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
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { PropTypes } from 'prop-types';
import '../styles/side-nav.css'
import { Avatar, Grow, ListItemText } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';


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
        color: '#657786',
        fontFamily:"Daikon-Regular"
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
        width: '15rem',
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
    profile: {
        padding: 2,
    }
});



class SideNav extends React.Component {
    timer = null;
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            userMenuOpen: false,
            sideList: '',
            homeLink: true,
            eventLink: false,
            chapterLink: false,
            schemesLink: false,
            myworkLink: false,
            myAccount: false,
            userProfile: JSON.parse(localStorage.getItem("userInfo")),
            home_title: "",
            selectedIcon: "home",
            menuArray: [
                {
                    "title": "Home",
                    "icon": "home",
                    "selected": true,
                    "link": "/home",
                },
                // {
                //     "title": "Bookmark",
                //     "icon": "explore",
                //     "selected": false,
                //     "link": "/bookmark",
                // },
                // {
                //     "title": "Notification",
                //     "icon": "notifications",
                //     "selected": false,
                //     "link": "/notifications",
                // },
                // {
                //     "title": "Collaborate",
                //     "icon": "wb_incandescent",
                //     "selected": false,
                //     "link": "/collaborate",
                // },
                {
                    "title": "Events",
                    "icon": "date_range",
                    "selected": false,
                    "link": "/events",
                },
                // {
                //     "title": "Tag",
                //     "icon": "local_offer",
                //     "selected": false,
                //     "link": "/tags",
                // },
                {
                    "title": "Chapter",
                    "icon": "explore",
                    "selected": false,
                    "link": "/chapter",
                },
                {
                    "title": "Govt. Schemes",
                    "icon": "local_offer",
                    "selected": false,
                    "link": "/governmentSchemes-tab",
                },
                {
                    "title": "My Work",
                    "icon": "date_range",
                    "selected": false,
                    "link": "/my_work",
                },
                {
                    "title": "Settings",
                    "icon": "settings",
                    "selected": false,
                    "link": "/settings",
                },
            ],
            pendding_message: 3,
        };
    }
    componentWillUnmount() {

    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({ userProfile: JSON.parse(localStorage.getItem("userInfo")) });
        }, 1000);
    }

    userMenuRef = null;

    // nav = () => {
    //     this.state.home_title = "Home";
    //     this.props.history.push({
    //         pathname: '/home',
    //     });
    // }

    // handleDrawerOpen = () => {
    //     this.setState({ open: true });
    // };

    // handleDrawerClose = () => {
    //     this.setState({ open: false });
    // };

    handleUserMenuClose = () => {
        this.setState({
            userMenuOpen: false
        });
    };

    handleUserMenuToggle = () => {
        this.setState({ userMenuOpen: !this.state.userMenuOpen });
    };

    mynav = () => {
        // this.state.home_title = "Home";
        this.setState({
            home_title: "Home",
            homeLink: true,
            eventLink: false,
            chapterLink: false,
            schemesLink: false,
            myworkLink: false,
        });
        this.props.history.push({ pathname: "/home" })
    }
    nav_bookmark = () => {
        // this.state.home_title = "Bookmark";
        this.setState({
            home_title: "Bookmark",
            homeLink: false,
            bookmarkLink: true,
            bookmarkLink1: false,
            bookmarkLink2: false,
            notificationLink: false,
            collabrationLink: false,
            eventsLink: false,
        });
        this.props.history.push({ pathname: "/bookmark" })
    }
    handleMessageNav = () => {
        this.setState({
            home_title: "Message",
            pendding_message: 0
        });
        // this.state.home_title = "Message";
        this.props.history.push({ pathname: "/message" })
    }
    nav_notification = () => {
        // this.state.home_title = "Notifications";
        this.setState({
            home_title: "Notifications",
            homeLink: false,
            bookmarkLink: false,
            bookmarkLink1: false,
            bookmarkLink2: false,
            notificationLink: true,
            collabrationLink: false,
            eventsLink: false,
        });
        this.props.history.push({ pathname: "/notifications" })
    }
    
    nav_collaborate = () => {
        // this.state.home_title = "Collaborate";
        this.setState({
            home_title: "Collaborate",
            homeLink: false,
            bookmarkLink: false,
            bookmarkLink1: false,
            bookmarkLink2: false,
            notificationLink: false,
            collabrationLink: true,
            eventsLink: false,
        });
        this.props.history.push({ pathname: "/collaborate" })
    }
    nav_profile = () => {
        // this.state.home_title = "Profile";
        this.setState({
            home_title: "Profile"
        });
        this.props.history.push({ pathname: "/profile/pf_" + this.state.userProfile.username })
    }

    nav_my_account = () => {
        // this.state.home_title = "My Account";
        this.setState({
            home_title: "My Account"
        });
        this.props.history.push({ pathname: "/my_account" })
    }

    nav_events = () => {
        // this.state.home_title = "Events";
        this.setState({
            home_title: "Events",
            homeLink: false,
            bookmarkLink: false,
            bookmarkLink1: false,
            bookmarkLink2: false,
            notificationLink: false,
            collabrationLink: false,
            eventsLink: true,
        });
        this.props.history.push({ pathname: "/events" })
    }
    nav_wallet = () => {
        // this.state.home_title = "Wallet";
        this.setState({
            home_title: "Wallet",
        });
        this.props.history.push({ pathname: "/wallet" })
    }
    nav_logout = () => {
        this.props.history.push({ pathname: "/logout" })
    }
    handlelistSelected = () => {

    }

    routeNav = (menu) => {
        let menu_list = this.state.menuArray;
        menu_list.map((item) => {
            item.selected = false;
            if (menu.link === item.link) {
                item.selected = true;
            }
        });
        this.setState({ menuArray: menu_list, home_title: menu.title,selectedIcon: menu.icon  });
        this.props.history.push({ pathname: menu.link });
    }

    render() {
        const { classes, children } = this.props;
        // console.log("arrayyyyy",this.state.menuArray)
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    elevation={0}
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                        {/* <div className={classes.pageTitle}>
                            <Icon className="material-icons-outlined">{this.state.selectedIcon}</Icon> 
                            {this.state.home_title}
                                                            </div> */}
                            <div className={classes.pageTitle}>
                                <HomeOutlinedIcon style={{ display: 'inline-block', marginBottom: '-5px' }} /> {this.state.home_title}
                            </div>
                            <div style={{ display: 'inline-block' }}>
                                <InputBase
                                    className={classes.input}
                                    placeholder="Search.."
                                    value={this.state.username}
                                    onChange={this.handleUserName}
                                    inputProps={{ 'aria-label': 'user' }}
                                />
                            </div>
                        </Typography>
                        <div>
                            <IconButton aria-label="pending messages" onClick={this.handleMessageNav} size="medium">
                                <Badge badgeContent={this.state.pendding_message} color="secondary">
                                    <MailOutlineOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton aria-label="search" onClick={this.nav_wallet} size="medium">
                                <MonetizationOnOutlinedIcon />
                            </IconButton>
                            <div style={{ display: 'inline-block', verticalAlign: 'middle', padding: '5px 10px' }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    {
                                        this.state.userProfile.first_name + " " + this.state.userProfile.last_name
                                    }
                                </div>

                                <div>{"@" + this.state.userProfile.username}</div>
                            </div>
                            <IconButton className={classes.profile} variant="contained" onClick={this.handleUserMenuToggle} ref="userMenuRef">
                                {
                                    (this.state.userProfile.avatar !== null && this.state.userProfile.avatar !== '') ? (
                                        <Avatar
                                            src={"https://energeapi.do.viewyoursite.net" + this.state.userProfile.avatar}>
                                        </Avatar>

                                    ) : (
                                        <Avatar
                                            src={"https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar-300x300.jpg"}>
                                        </Avatar>
                                    )
                                }
                            </IconButton>

                            <Popper open={this.state.userMenuOpen} role={undefined} transition disablePortal anchorEl={this.refs.userMenuRef}>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleUserMenuClose}>
                                                <MenuList autoFocusItem={this.state.userMenuOpen} id="menu-list-grow">
                                                    <MenuItem onClick={this.nav_profile}>Profile</MenuItem>
                                                    <MenuItem onClick={this.nav_my_account}>My account</MenuItem>
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
                    open={this.state.open}>
                    <div className={classes.toolbar} style={{paddingRight:'35px', }}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {/* <ChevronLeftIcon /> */}
                            <img style={{width:'140px'}} src='/images/BP.png' alt='altimage' />
                        </IconButton>
                    </div>

                    <List>
                        {
                            this.state.menuArray.map((menu, index) => (
                                <ListItem
                                    key={'key_nav_menu_' + index}
                                    button
                                    selected={menu.selected}
                                    data-menu={menu}
                                    onClick={() => this.routeNav(menu)}
                                    className={"menu-item"}>
                                    <ListItemIcon className={classes.iconWrapper}>
                                        <Icon
                                            // color={menu.selected?"primary":"default"} 
                                            className={"material-icons-outlined " + menu.icon}>{menu.icon}</Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={menu.title}  />
                                </ListItem>
                            ))
                        }
                    </List>
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
