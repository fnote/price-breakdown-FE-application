/**
 * Dashboard which changes according to navigation.
 *
 * @author: adis0892 on 6/23/18
 **/

import React from 'react';
import { connect } from 'react-redux';
import FileUploadBase from "./FileUpload/FileUploadBase";
import {SHOW_EXCEL_UPLOAD, SHOW_HISTORY_TABLE, SHOW_RESULT_TABLE} from "../actions/ActionType";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from 'classnames';
import { bindActionCreators } from "redux";
import { openDrawer } from "../actions";
import FileDownloadBase from "./FileDownload/FileDownloadBase";

const drawerWidth = 240;

const styles = theme => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1) * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: window.innerWidth,
    },
    'content-left': {
        marginLeft: -drawerWidth,

    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),

        width: window.innerWidth - drawerWidth,
    },
    'contentShift-left': {
        marginLeft: 0,
    },
});

let DashboardBase = (props) => {

    const {classes} = props;
    const {open} = props;

    let content = null;
    switch (props.navType) {
        case SHOW_EXCEL_UPLOAD:
            content = (<FileUploadBase/>);
            break;
        case SHOW_RESULT_TABLE:
            content = (<FileDownloadBase/>);
            break;
    }

    return (
        <main className={classNames(classes.content, classes[`content-left`], {
            [classes.contentShift]: open,
            [classes[`contentShift-left`]]: open,
        })}>
            <div className={classes.drawerHeader}/>
            <div className={classes.container}>
                {content}
            </div>
        </main>
    );
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({openDrawer}, dispatch);

const mapStateToProps = state => ({
    navType: state.navigation,
    open: state.isDrawerOpen
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(DashboardBase));
