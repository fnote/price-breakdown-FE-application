/**
 * Application component that contains all base components.
 *
 * @author: adis0892 on 6/21/18
 **/

import React, { Component } from 'react';
import NavDrawer from "../containers/NavDrawer";
import withStyles from "@material-ui/core/styles/withStyles";
import HeaderBar from "../containers/HeaderBar";
import DashboardBase from "../containers/DashboardBase";

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#FFFFFF',
        color: '#000000'
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        height: '100vh',
        width: '100%',
    },
});

class HomePage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <HeaderBar/>
                    <NavDrawer/>
                    <DashboardBase/>
                </div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme: true})(HomePage);
