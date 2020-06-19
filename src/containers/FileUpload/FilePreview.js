/**
 * This component load a file preview.
 *
 * @author: adis0892 on 6/20/18
 **/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";

const styles = theme => ({
    container: {
        width: `calc(100% - ${theme.spacing(1) * 6}px)`,
        marginTop: theme.spacing(1) * 3,
        overFlow: 'auto'
    },
    table: {
        minWidth: 650,
    },
    btnToolBar: {
        margin: theme.spacing(1),
        justifyContent: "flex-end",
        display: "flex"
    },
    button: {
        margin: theme.spacing(1),
        backgroundColor: "#D7E8F3",
        textTransform: "capitalize"
    },
    cancelButton: {
        backgroundColor: "#1a713b",
        color: "#FFFFFF"
    }
});

class FilePreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldShowTable: true
        };
    }

    render() {
        const {classes} = this.props;
        return (
            this.state.shouldShowTable &&
            <div className={classes.container}>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                {
                                    this.props.fileData.header.map((headerCell, index) => <TableCell
                                        style={{"fontWeight": "bold", color: "#000000"}}
                                        key={index}>{headerCell}</TableCell>)
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.fileData.data.map((dataRow, index) => {
                                return (
                                    <TableRow key={index}>
                                        {
                                            dataRow.map((dataCell, index) => <TableCell
                                                key={index}>{dataCell}</TableCell>)
                                        }
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.btnToolBar}>
                    <Button className={classes.button} onClick={() => this.removePreviewTable()}
                            variant="contained">
                        Cancel
                    </Button>
                    <Button variant="contained"
                            className={classes.button}>
                        Submit
                    </Button>
                </div>
            </div>
        );
    }

    removePreviewTable = () => {
        this.setState({
            shouldShowTable: false
        })
    };
}

FilePreview.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    fileData: state.uploadData
});

export default connect(mapStateToProps)(withStyles(styles)(FilePreview));
