/**
 * Provides a dialog box with a message and title.
 *
 * @author: lchi0638 on 6/25/18
 **/

import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

const AlertDialog = (props) => {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions style={{"justifyContent": "center"}}>
                <div>
                    <Button onClick={props.handleClose} variant="contained" color="secondary" autoFocus>
                        Close
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
};

export default AlertDialog;