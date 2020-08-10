/**
 * Base component for file upload and its preview.
 *
 * @author: adis0892 on 6/20/18
 **/

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {uploadFile} from '../../actions/index';
import {bindActionCreators} from 'redux';
import FilePreview from './FilePreview';
import Dropzone from 'react-dropzone';
import Xlsx from 'xlsx';
import AlertDialog from '../../components/AlertDialog';
import Button from "@material-ui/core/Button";

const HEADER_FORMAT_FAIL = "HeaderFormatFail";
const FILE_EXTENSION_FAIL = "FileExtensionFail";

class FileUploadBase extends Component {

    validationFailureType = null;

    constructor(props) {
        super(props);

        this.state = {
            isInvalidFile: false,
            errorTitle: '',
            inProgress: false,
            showPreview: false
        };
    }

    render() {
        return (
            <div>
                <Dropzone accept={" .csv, .xlsx, .xls, .txt"} multiple={true} className="dropZone"
                          onDrop={(e) => this.handleFile(e)}>
                    <Button variant="contained" style={{
                        marginRight: "15px", "backgroundColor": "#D7E8F3", "color": "#1A4F71",
                        "textTransform": "capitalize"
                    }}><b>Select Files</b></Button>
                    <i className='fa fa-upload'
                       style={{marginRight: "4px", "color": "#808080", "fontSize": "28px", "padding": "5px"}}/>
                    <p style={{"paddingTop": "5px", "color": "#808080"}}>Drop file here</p>
                </Dropzone>

                {this.state.inProgress && <div className="loader-dual-ring"/>}
                {(this.state.showPreview) && (this.props.fileData.header) && <FilePreview/>}

                <AlertDialog open={this.state.isInvalidFile} handleClose={() => this.handleClose()}
                             title={this.state.errorTitle} message={this.state.errorMsg}/>
            </div>
        )
    }

    handleFile = (e) => {
        this.setState({
            showPreview: false
        });

        let file = e[0];
        this.validateFileExtension(file);

        if (this.validationFailureType === null) {
            this.readExcel(file);
        } else if (this.validationFailureType === FILE_EXTENSION_FAIL) {
            this.setState({
                isInvalidFile: true,
                errorTitle: "Invalid File Extension",
                errorMsg: "Only Excel, Text and CSV files are allowed.",
                showPreview: false
            });
            this.validationFailureType = null;
        }

        e = '';
    };

    readExcel = (file) => {
        let reader = new FileReader();

        reader.onloadstart = () => {
            this.setState({
                inProgress: true
            });
        };

        reader.onloadend = () => {
            this.setState({
                inProgress: false
            });
        };

        reader.onload = (e) => {
            let excelResult = e.target.result;

            /* Reading file content as readAsBinaryString */
            let workbook = Xlsx.read(excelResult, {type: 'binary', sheetRows: 5});
            let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let header = this.getHeaderRow(first_worksheet);

            if (this.validationFailureType === HEADER_FORMAT_FAIL) {
                this.setState({
                    isInvalidFile: true,
                    errorTitle: "Invalid format in the content header",
                    errorMsg: "Content header does not match expected header format",
                    showPreview: false
                });
                return this.validationFailureType = null;
            }

            let data = FileUploadBase.formatDataRows(first_worksheet);

            this.props.uploadFile(
                {
                    'header': header,
                    'data': data
                }
            );

            this.setState({
                showPreview: true
            });
        };
        reader.readAsBinaryString(file);
    };

    getHeaderRow = (sheet) => {
        let headers = [];
        let range = Xlsx.utils.decode_range(sheet['!ref']);
        let C, R = range.s.r;
        for (C = range.s.c; C <= range.e.c; ++C) {
            let cell = sheet[Xlsx.utils.encode_cell({c: C, r: R})];
            let initialHeaderValue = "UNKNOWN";
            if (cell && cell.t) {
                initialHeaderValue = Xlsx.utils.format_cell(cell);
            } else {
                this.validationFailureType = HEADER_FORMAT_FAIL;
                return;
            }
            headers.push(initialHeaderValue);
        }
        return headers;
    };

    static formatDataRows(sheet) {
        let data = [];
        let rowData = Xlsx.utils.sheet_to_json(sheet, {header: 1});
        let range = Xlsx.utils.decode_range(sheet['!ref']).e.c;

        if (rowData.length > 0) {
            let row;
            let previewRowLength = 3;
            if (rowData.length <= 3) {
                previewRowLength = rowData.length - 1;
            }

            //read top 3 records without first row(header row)
            for (let j = 1; j <= previewRowLength; j++) {
                row = rowData[j];
                for (let i = 0; i <= range; i++) {
                    if (row[i] === undefined) {
                        row[i] = '';
                    }
                }
                data.push(row);
            }
        }
        return data;
    }

    validateFileExtension = (file) => {
        let allowedExtensions = /(\.csv|\.xlsx|\.xls|\.txt)$/i;
        if (file === undefined || !allowedExtensions.exec(file.name)) {
            this.validationFailureType = FILE_EXTENSION_FAIL;
        }
    };

    handleClose = () => {
        this.setState({isInvalidFile: false});
    };
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({uploadFile}, dispatch);

const mapStateToProps = state => ({
    fileData: state.uploadData
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadBase);
