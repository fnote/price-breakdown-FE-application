/**
 * Header Component.
 *
 * @author: cwic0864 on 6/25/18
 **/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import {openDrawer} from "../actions";
import {bindActionCreators} from 'redux';

const drawerWidth = 240;

const styles = theme => ({

    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    }
});

class HeaderBar extends Component {

    constructor(props) {
        super(props);

        this.handleDrawerOpen = () => {
            props.openDrawer(true);
        };

    }

    render() {
        const {classes} = this.props;
        const {open} = this.props;

        return (
            <div className={classes.root}>
                <AppBar
                    color="inherit" className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                    <Toolbar disableGutters={!open}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>

                        <Typography variant="h6" noWrap>
                            Cloud PCI
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

HeaderBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({openDrawer}, dispatch);

const mapStateToProps = state => ({
    open: state.isDrawerOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HeaderBar));
