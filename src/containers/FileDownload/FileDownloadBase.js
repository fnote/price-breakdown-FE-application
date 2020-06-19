/**
 * Base component for file upload and its preview.
 *
 * @author: adis0892 on 6/20/18
 **/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {uploadFile} from '../../actions/index';
import {bindActionCreators} from 'redux';
import Typography from "@material-ui/core/Typography";

class FileDownloadBase extends Component {

    validationFailureType = null;

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div>
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                    gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                    donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                    Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                    imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                    arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                    donec massa sapien faucibus et molestie ac.
                </Typography>
            </div>
        )
    }

    handleClose = () => {
        this.setState({isInvalidFile: false});
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({uploadFile}, dispatch);

const mapStateToProps = state => ({
    fileData: state.uploadData
});

export default connect(mapStateToProps, mapDispatchToProps)(FileDownloadBase);
