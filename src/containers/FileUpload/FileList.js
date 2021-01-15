import React from 'react';
import {Button, Input, notification, Table} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import {getBffUrlConfig} from "../../utils/Configs";
import {
    EMPTY_STRING,
    FILE_ERROR,
    FILE_PROCESSING,
    FILE_SUCCESS,
    MAX_DOWNLOAD_ALLOWED,
    PCI_FILENAME_PREFIX,
    TAG_NAME_A,
    TIMEOUT_DURING_DOWNLOAD_CLICKS
} from "../../constants/Constants";

const {Search} = Input;

class FileList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [], // Check here to configure the default column
            selectedRowValues: [],
            loading: false,
            data: [],
            dataIsReturned: false,
            searchString: ''
        };
    };

    componentDidMount() {
        this.loadDataFiles();
    };

    fileListRequestHandler = () => fetch(getBffUrlConfig().listOutputFilesEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }).then(this.handleResponse);

    fileDeleteRequestHandler = () => fetch(getBffUrlConfig().bathcJobDeleteEndpoint, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    }).then(this.handleResponse);

    fileSearchListRequestHandler = (searchRequestEndpoint) => fetch(searchRequestEndpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(this.handleResponse);

    handleResponse = (response) => {
        const files = []
        return response.json().then((json) => {
            const responseData = json.data;
            if (response.ok && responseData) {
                console.log(responseData);
                responseData.forEach((file, index) => {
                    const action = {
                        status: file.action,
                        fileName: file.fileName,
                        minorErrorFileName: file.minorErrorFileName
                    };
                    files.push({
                        key: index + 1,
                        submittime: file.date,
                        filename: file.fileName,
                        action: action,
                    });
                });
                return {success: true, data: files};
            }
            return {success: false, data: files};
        });
    };

    downloadFile = (fileNamesArray) => {
        this.setState({
            dataIsReturned: false
        });

        const fileNamesArrayWithPciPrefix = [];

        fileNamesArray.forEach((fileName) => {
            const fileNameWithPciPrefix = PCI_FILENAME_PREFIX + fileName;
            fileNamesArrayWithPciPrefix.push(fileNameWithPciPrefix);
        });

        this.generateSignedUrls(fileNamesArrayWithPciPrefix)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json()
            })
            .then(response => {
                const fileNameUrlArray = response.data;
                Promise.all(this.downloadFromSignedUrl(fileNameUrlArray))
                    .then(() => {
                        this.setState({
                            dataIsReturned: true
                        });
                    })
                    .catch(() => {
                        this.setState({
                            dataIsReturned: true
                        });
                    });

            }).catch(() => {
            this.setState({
                dataIsReturned: true
            });
        });
    };

    generateSignedUrls = (fileNamesArray) => fetch(getBffUrlConfig().outputBucketFilesSignedUrlEndpoint, {
        method: 'POST',
        body: JSON.stringify({
            'fileNames': fileNamesArray
        }),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    });

    downloadFromSignedUrl = (fileNameUrlArray) => {
        let iteration = 0;
        return fileNameUrlArray.map(({fileName, readUrl}) => {
            return new Promise((resolve, reject) => {
                const regex = new RegExp("^(" + PCI_FILENAME_PREFIX + ")");
                const fileNameWithoutPciPrefix = fileName.replace(regex, EMPTY_STRING);
                iteration += 1;
                setTimeout(() => {
                    fetch(readUrl)
                        .then(response => {
                            if (!response.ok) {
                                const err = new Error(response.statusText);
                                err.status = response.status;
                                throw err;
                            }
                            return response;
                        })
                        .then(response => response.blob())
                        .then(blob => URL.createObjectURL(blob))
                        .then(uri => {
                            let link = document.createElement(TAG_NAME_A);
                            link.href = uri;
                            link.download = fileNameWithoutPciPrefix;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            resolve();
                        })
                        .catch((error) => {
                            let errorMsg = 'Failed to download the file.';
                            if (error.status === 404) {
                                errorMsg = 'Failed to download as file is not found.';
                            }
                            this.openNotificationWithIcon('error', errorMsg + ` : ${fileNameWithoutPciPrefix}`);
                            reject();
                        });
                }, TIMEOUT_DURING_DOWNLOAD_CLICKS * iteration);
            });
        });
    };

    openNotificationWithIcon = (type, description) => {
        notification[type]({
            message: 'Failure',
            description: description,
        });
    };

    loadDataFiles = () => {
        this.setState({
            dataIsReturned: false,
            searchString: ''
        })
        this.fileListRequestHandler().then((res) => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    dataIsReturned: true
                })
            }
        });
    }

    deleteFiles = () => {
        this.setState({
            dataIsReturned: false,
            searchString: ''
        })
        this.fileListRequestHandler().then((res) => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    dataIsReturned: true
                })
            }
        });
    }

    getListSearchFilesEndpoint = (source, prefix) => {
        return getBffUrlConfig().listSearchFilesEndpoint + source + "/" + prefix;
    }

    loadSearchDataFiles = (value) => {
        if (value !== '') {
            this.setState({
                dataIsReturned: false,
            })

            this.fileSearchListRequestHandler(this.getListSearchFilesEndpoint("output", value)).then((res) => {
                if (res.success) {
                    this.setState({
                        data: res.data,
                        dataIsReturned: true
                    })
                }
            });
        } else {
            this.loadDataFiles();
        }
    };

    start = () => {
        if (this.state.selectedRowValues.length > MAX_DOWNLOAD_ALLOWED) {
            this.openNotificationWithIcon('error', 'Too many files to download.');
            return;
        }

        this.setState({loading: true});
        const selectedRowValues = this.state.selectedRowValues;
        const toDownloadFiles = [];

        selectedRowValues.forEach(row => {
            if (row.action.fileName) {
                toDownloadFiles.push(row.action.fileName);
            }

            if (row.action.minorErrorFileName) {
                toDownloadFiles.push(row.action.minorErrorFileName);
            }
        });

        this.downloadFile(toDownloadFiles);

        this.setState({
            selectedRowKeys: [],
            loading: false,
        });

    };

    onSelect = (record, selected) => {
        if (selected) {
            this.setState({
                selectedRowKeys: [...this.state.selectedRowKeys, record.filename],
                selectedRowValues: [...this.state.selectedRowValues, record]
            });
        } else {
            this.setState({
                selectedRowKeys: this.state.selectedRowKeys.filter(key => key !== record.filename),
                selectedRowValues: this.state.selectedRowValues.filter(row => row.filename !== record.filename)
            });
        }
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        const changeRowKeys = changeRows.map(row => row.filename);
        if (selected) {
            this.setState({
                selectedRowKeys: [...this.state.selectedRowKeys, ...changeRowKeys],
                selectedRowValues: [...this.state.selectedRowValues, ...changeRows]
            });
        } else {
            const remainingSelectedRowKeys = this.state.selectedRowKeys.filter(key => changeRowKeys.indexOf(key) < 0);
            const remainingSelectedRow = this.state.selectedRowValues.filter(row => changeRows.indexOf(row) < 0);

            this.setState({
                selectedRowKeys: remainingSelectedRowKeys,
                selectedRowValues: remainingSelectedRow
            });

        }

    }

    onSearchStringChange = (searchBox) => {
        this.setState({searchString: searchBox.target.value});
    };

    columns = [
        {
            title: 'SUBMIT TIME',
            dataIndex: 'submittime',
            className: 'submittime'
        },
        {
            title: 'FILE NAME',
            dataIndex: 'filename',
            className: 'filename',
        },
        {
            dataIndex: 'action',
            className: 'action',
            width: 'auto',
            render: (data) => (
                <div className="action-bar">
                    {data.status === FILE_PROCESSING && (
                        <div className="file-process-status">FILE IS BEING PROCESSED</div>
                    )}
                    {data.status === FILE_ERROR && (
                        <div className="file-process-status error">
                            File Contained errors
                            <div className="divider"></div>
                            <Button className="btn empty-btn download-error-file"
                                    onClick={() => {
                                        this.downloadFile([data.minorErrorFileName]);

                                    }}
                            >
                                <i className="icon fi flaticon-cloud-computing"/>
                                View error file
                            </Button>
                        </div>
                    )}
                    {data.status === FILE_SUCCESS && (
                        <div className="file-process-status success">
                            File processed successfully
                        </div>
                    )}
                    {data.status !== FILE_PROCESSING ? (
                        <>
                            <Button className="btn icon-only empty-btn">
                                <i className="icon fi flaticon-bin"/>
                            </Button>
                            <Button className="btn icon-only empty-btn download-file"
                                    onClick={() => {
                                        this.downloadFile([data.fileName]);

                                    }}
                            >
                                <i className="icon fi flaticon-cloud-computing"/>
                            </Button>
                        </>

                    ) : (
                        <>
                            <Button className="btn icon-only empty-btn cancel-process">
                                <i className="icon fi flaticon-close"/>
                            </Button>
                            <SyncOutlined spin className="icon processing-spinner"/>
                        </>
                    )}
                </div>
            ),
        },
    ];

    render() {
        const {loading, selectedRowKeys, data, dataIsReturned, searchString} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onSelect: this.onSelect,
            onSelectAll: this.onSelectAll
        };
        const hasSelected = selectedRowKeys.length > 0;
        const shouldDisableDownload = selectedRowKeys.length > MAX_DOWNLOAD_ALLOWED;

        return (
            <div className="file-list">
                <div className="panel-header">
                    <div className="title">
                        <i className="icon fi flaticon-history"/>
                        File List
                    </div>
                    <Search
                        placeholder="Search"
                        className="search-list"
                        value={searchString}
                        onChange={this.onSearchStringChange}
                        onSearch={this.loadSearchDataFiles}
                    />
                    <div className="spacer"></div>
                    <div className="selected-item-status">
                        <p>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </p>
                        {hasSelected && (
                            <Button
                                type="primary"
                                className="btn green-action-btn rounded download-btn"
                                onClick={this.start}
                                disabled={shouldDisableDownload}
                                loading={loading}
                                scroll={{x: 'auto', y: 300}}>
                                <i className="icon fi flaticon-download"/> Download Selected (Max 25)
                            </Button>
                        )}
                    </div>
                    <Button
                        type="link"
                        className="refresh-btn"
                        onClick={this.loadDataFiles}
                    >
                        <i className="icon fi flaticon-refresh-1"/> Refresh
                    </Button>
                </div>
                <div className="file-list-table-wrapper">
                    {dataIsReturned ?
                        <Table
                            rowKey='filename'
                            rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={data}
                            scroll={{x: 'auto', y: '60vh'}}
                        />
                        : <Table loading={!dataIsReturned}/>}
                </div>
            </div>
        );
    }
}

export default FileList;
