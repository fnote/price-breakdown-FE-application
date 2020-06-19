/**
 * Navigation Drawer Component.
 *
 * @author: cwic0864 on 6/25/18
 **/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import VisibilityIcon from '@material-ui/icons/Visibility';
import HistoryIcon from '@material-ui/icons/History';

import ListItem from "@material-ui/core/ListItem";
import {connect} from "react-redux";
import {navigate, openDrawer} from "../actions";
import LogoSysco from '../assets/images/logoSysco.png'
import {bindActionCreators} from 'redux';
import {SHOW_EXCEL_UPLOAD, SHOW_HISTORY_TABLE, SHOW_RESULT_TABLE} from "../actions/ActionType";
import Typography from "@material-ui/core/Typography";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        backgroundColor: '#1A4F71',
        color: theme.palette.background.paper,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    logo: {
        width: '45%',
        height: 'auto',
        marginRight: 'auto',
        marginLeft: 'auto',
    }
});

class NavDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchor: 'left',
        };

        this.handleDrawerClose = () => {
            this.props.openDrawer(false);
        };
    }

    render() {
        const {classes, theme} = this.props;
        const {open} = this.props;

        return (
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <img src={LogoSysco} className={classes.logo} resizemode="contain"/>
                    <IconButton color="inherit" onClick={this.handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button onClick={() => this.handleNavigation(SHOW_EXCEL_UPLOAD)}>
                        <ListItemIcon><CloudUploadIcon /></ListItemIcon>
                        <Typography className="drawerTextAlignment" variant="subheading" color="inherit">
                            File Submit
                        </Typography>
                    </ListItem>
                    <ListItem button onClick={() => this.handleNavigation(SHOW_HISTORY_TABLE)}>
                        <ListItemIcon><HistoryIcon /></ListItemIcon>
                        <Typography className='drawerTextAlignment' variant="subheading" color="inherit">
                            History
                        </Typography>
                    </ListItem>
                    <ListItem button onClick={() => this.handleNavigation(SHOW_RESULT_TABLE)}>
                        <ListItemIcon><VisibilityIcon /></ListItemIcon>
                        <Typography className='drawerTextAlignment' variant="subheading" color="inherit">
                            Results
                        </Typography>
                    </ListItem>
                </List>
            </Drawer>
        );
    }

    handleNavigation = (navigationType) => {
        this.props.navigate(navigationType);
    };
}

NavDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({navigate, openDrawer}, dispatch);

const mapStateToProps = state => ({
    open: state.isDrawerOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(NavDrawer));
