import React from 'react';
import {Button, Input, notification, Popconfirm, Table} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
// eslint-disable-next-line import/no-named-default
import {default as _} from 'lodash';
import {getBffUrlConfig} from '../../utils/Configs';
import {
    DELETE_CONFIRM,
    DELETE_REJECT,
    DELETE_TITLE,
    EMPTY_STRING,
    FILE_APPEAR_NOTIFICATION,
    JOB_COMPLETE_STATUS,
    JOB_COMPLETE_STATUS_DISPLAY,
    JOB_DELETING_STATUS,
    JOB_DELETING_STATUS_DISPLAY,
    JOB_DOWNLOADING_STATUS,
    JOB_DOWNLOADING_STATUS_DISPLAY,
    JOB_MINOR_ERROR_DOWNLOADING_STATUS,
    JOB_MINOR_ERROR_DOWNLOADING_STATUS_DISPLAY,
    JOB_ERROR_STATUS,
    JOB_ERROR_STATUS_DISPLAY,
    JOB_INPROGRESS_STATUS,
    JOB_INPROGRESS_STATUS_DISPLAY,
    JOB_PARTIALLY_COMPLETED_STATUS,
    JOB_PARTIALLY_COMPLETED_STATUS_DISPLAY,
    MAX_DOWNLOAD_ALLOWED,
    MINOR_ERROR_STATUS_DISPLAY,
    PCI_FILENAME_PREFIX,
    TAG_NAME_A,
    TIMEOUT_DURING_DOWNLOAD_CLICKS,
    MINOR_ERROR_FILE,
    COMPLETED_FILE
} from '../../constants/Constants';
import {
    generateBatchJobSearchUrl,
    isMaxDownloadableCountExceed,
    removeFileNamePrefixFromList
} from '../../utils/FileListUtils';
import {withHooksHOC} from './FileListHOC';
import {
    fileSearchListRequestHandler,
    generateSignedUrls,
    jobDeleteRequestHandler
} from './BatchJobResults/BatchJobResults';
import {getDisplayFileName} from '../../utils/CommonUtils';

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
    }

    componentDidUpdate(prevProps) {
        if (this.props.refreshedData && prevProps.refreshedData !== this.props.refreshedData
            && (JSON.stringify(this.props.refreshedData) !== JSON.stringify(this.state.data))) {
            this.doUpdate();
            if (this.props.fileUploadCompleted) {
                this.props.onChange(false);
            }
        }
    }

    componentDidMount() {
        this.listBatchJobs();
    }

    doUpdate = () => {
        // keep deleting items in the same state
        const newJobs = this.props.refreshedData.filter((current) => this.comparer(current, this.state.data));
        this.setState({
            data: [...newJobs, ...this.state.data]
        });
    };

    // compare two job lists - filter new jobs, if it's an older job keep deleting jobs
    comparer = (current, stateData) => {
        let found = false;
        stateData.forEach((item) => {
            if (current.jobId === item.jobId) {
                if (!item.jobDetail.isProcessing
                    && item.jobDetail.status !== current.jobDetail.status) {
                    item.jobDetail = current.jobDetail;
                    item.startTime = current.startTime;
                    item.endTime = current.endTime;
                    this.setState({item});
                }
                found = true;
            } else if (current.filename === item.filename) {
                    item.jobId = current.jobId;
                    item.jobDetail = current.jobDetail;
                    item.endTime = current.endTime;
                    item.startTime = current.startTime;
                    this.setState({item});
                    found = true;
                }
        });
        return !found;
    };

    // ------ notification slider ------
    openNotificationWithIcon = (type, description, msg) => {
        notification[type]({
            message: msg,
            description,
        });
    };

    // -----------throw an Error if response is non-ok---------------
    throwError(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }

    // ------ delete job ------
    deleteJob = (jobId) => {
        // set the file state to deleting
        const item = {...this.state.data.filter((i) => i.jobDetail.jobId === jobId)[0]};
        if (item && item.jobDetail) {
            item.jobDetail.isProcessing = true;
            item.jobDetail.originalStatus = item.jobDetail.status;
            item.jobDetail.status = JOB_DELETING_STATUS;
            this.setState({item});
        }

        jobDeleteRequestHandler(jobId)
            .then((response) => {
                return this.throwError(response);
            }).then((response) => {
            const fileNames = removeFileNamePrefixFromList(response.data.fileNames);
            const formattedFileNames = [];
            fileNames.forEach((fileName) => {
                formattedFileNames.push(getDisplayFileName(fileName));
            });
            this.removeDeletedJobFromList(jobId, formattedFileNames);
            this.removeDeletedJobFromSelectedRecords(jobId);
        }).catch(() => {
            this.openNotificationWithIcon('error', 'Failed to delete the batch file', 'Failure');
            item.jobDetail.isProcessing = false;
            item.jobDetail.status = item.jobDetail.originalStatus;
            this.setState({item});
        });
    };

    removeDeletedJobFromList = (jobId, fileNames) => {
        const rows = this.state.data;

        this.setState({
            data: rows.filter((row) => row.jobDetail.jobId !== jobId),
            dataIsReturned: true
        });
        Promise.resolve().then(() => {
            this.openNotificationWithIcon('success',
                `Batch job deletion successful. Deleted file names: ${fileNames}`, 'Success');
        });
    };

    removeDeletedJobFromSelectedRecords(jobId) {
        this.setState({
            selectedRowKeys: this.state.selectedRowKeys.filter((key) => key !== jobId),
            selectedRowValues: this.state.selectedRowValues.filter((row) => row.jobId !== jobId)
        });
    }

    // ------ download file ------
    downloadFiles = (fileDownloadType, jobIds, fileNamesArray) => {
        if (fileNamesArray.length > 0) {
            const fileNamesArrayWithPciPrefix = [];
            const jobList = {};

            fileNamesArray.forEach((fileName, i) => {
                jobList[fileName] = jobIds[i];
                const fileNameWithPciPrefix = PCI_FILENAME_PREFIX + fileName;
                fileNamesArrayWithPciPrefix.push(fileNameWithPciPrefix);
            });
            jobIds.forEach((jobId) => {
                const item = {...this.state.data.filter((i) => i.jobDetail.jobId === jobId)[0]};
                if (item && item.jobDetail) {
                    item.jobDetail.isProcessing = true;
                    item.jobDetail.originalStatus = item.jobDetail.status;
                    if (fileDownloadType === COMPLETED_FILE) {
                        item.jobDetail.status = JOB_DOWNLOADING_STATUS;
                    } else {
                        item.jobDetail.status = JOB_MINOR_ERROR_DOWNLOADING_STATUS;
                    }
                    this.setState({item});
                }
            });
            generateSignedUrls(fileNamesArrayWithPciPrefix)
                .then((response) => {
                    return this.throwError(response);
                }).catch(() => {
                    const fileNamesWithOutPrefix = removeFileNamePrefixFromList(fileNamesArrayWithPciPrefix);
                    const errorMsg = 'Failed to download the files.';
                    this.openNotificationWithIcon('error',
                        `${errorMsg} :${getDisplayFileName(fileNamesWithOutPrefix)}`, 'Failure');
                    this.changeJobsToOriginalState(jobIds);
            })
                .then((response) => {
                    const fileNameUrlArray = response.data;
                    Promise.all(this.downloadFromSignedUrl(fileNameUrlArray, jobList));
                });
        }
    };

    columns = [
        {
            title: 'FILE NAME',
            dataIndex: 'filename',
            render: (fileName) => (
                <div className='filename' title={fileName}>{fileName}</div>
            )
        },
        {
            title: 'SUBMIT TIME',
            dataIndex: 'startTime',
            className: 'submittime',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.jobId - b.jobId,
        },
        {
            title: 'END TIME',
            dataIndex: 'endTime',
            className: 'submittime'
        },
        {
            dataIndex: 'jobDetail',
            className: 'action',
            width: 'auto',
            render: (jobDetail) => (
                <div className="action-bar">
                    {jobDetail.status === JOB_INPROGRESS_STATUS && (
                        <div className="file-process-status">{JOB_INPROGRESS_STATUS_DISPLAY}</div>
                    )}
                    {jobDetail.status === JOB_PARTIALLY_COMPLETED_STATUS && (
                        <div className="file-process-status warn">
                            <Button className="btn empty-btn download-error-file"
                                    onClick={() => {
                                        this.downloadFiles(MINOR_ERROR_FILE, [jobDetail.jobId], [jobDetail.minorErrorFileName]);
                                    }}
                            >
                                <i className="icon fi flaticon-cloud-computing"/>
                            </Button>
                            <div className="file-process-status minor-error">
                                {MINOR_ERROR_STATUS_DISPLAY}
                            </div>
                            <div className="divider"></div>
                            {JOB_PARTIALLY_COMPLETED_STATUS_DISPLAY}
                        </div>
                    )}
                    {jobDetail.status === JOB_COMPLETE_STATUS && (
                        <div className="file-process-status success">
                            {JOB_COMPLETE_STATUS_DISPLAY}
                        </div>
                    )}
                    {jobDetail.status === JOB_ERROR_STATUS && (
                        <div className="file-process-status error">
                            {JOB_ERROR_STATUS_DISPLAY}
                        </div>
                    )}
                    {jobDetail.status === JOB_DELETING_STATUS && (
                        <div className="file-process-status processing">
                            {JOB_DELETING_STATUS_DISPLAY}
                        </div>
                    )}
                    {jobDetail.status === JOB_DOWNLOADING_STATUS && (
                        <div className="file-process-status processing">
                            {JOB_DOWNLOADING_STATUS_DISPLAY}
                        </div>
                    )}
                    {jobDetail.status === JOB_MINOR_ERROR_DOWNLOADING_STATUS && (
                        <div className="file-process-status processing">
                            {JOB_MINOR_ERROR_DOWNLOADING_STATUS_DISPLAY}
                        </div>
                    )}
                    {jobDetail.status !== JOB_INPROGRESS_STATUS && !jobDetail.isProcessing ? (
                        <>
                            <Popconfirm
                                title={DELETE_TITLE}
                                okText={DELETE_CONFIRM}
                                cancelText={DELETE_REJECT}
                                onConfirm={() => {
                                    this.deleteJob(jobDetail.jobId);
                                }
                                }
                            >
                                <Button className="btn icon-only empty-btn">
                                    <i className="icon fi flaticon-bin"/>
                                </Button>
                            </Popconfirm>
                            <Button className="btn icon-only empty-btn download-file"
                                    onClick={() => {
                                        this.downloadFiles(COMPLETED_FILE, [jobDetail.jobId], [jobDetail.fileName]);
                                    }}
                            >
                                <i className="icon fi flaticon-cloud-computing"/>
                            </Button>
                        </>

                    ) : (
                        <>
                            <SyncOutlined spin className="icon processing-spinner"/>
                        </>
                    )}
                </div>
            ),
        },
    ];

    downloadFromSignedUrl = (fileNameUrlArray, jobList) => {
        let iteration = 0;
        return fileNameUrlArray.map(({fileName, readUrl}) => new Promise((resolve, reject) => {
            const regex = new RegExp(`^(${PCI_FILENAME_PREFIX})`);
            const fileNameWithoutPciPrefix = fileName.replace(regex, EMPTY_STRING);
            iteration += 1;
            setTimeout(() => {
                fetch(readUrl)
                    .then((response) => {
                        if (!response.ok) {
                            const err = new Error(response.statusText);
                            err.status = response.status;
                            throw err;
                        }
                        return response;
                    })
                    .then((response) => response.blob())
                    .then((blob) => URL.createObjectURL(blob))
                    .then((uri) => {
                        const link = document.createElement(TAG_NAME_A);
                        link.href = uri;
                        link.download = fileNameWithoutPciPrefix;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        this.openNotificationWithIcon('success',
                            `File downloaded successful. File name: ${getDisplayFileName(fileNameWithoutPciPrefix)}`, 'Success');
                        this.changeJobToOriginalState(jobList[fileNameWithoutPciPrefix]);
                        resolve();
                    })
                    .catch((error) => {
                        let errorMsg = 'Failed to download the file.';
                        if (error.status === 404) {
                            errorMsg = 'Failed to download as file is not found.';
                        }
                        this.openNotificationWithIcon('error',
                            `${errorMsg} : ${getDisplayFileName(fileNameWithoutPciPrefix)}`, 'Failure');
                        this.changeJobToOriginalState(jobList[fileNameWithoutPciPrefix]);
                        reject();
                    });
            }, TIMEOUT_DURING_DOWNLOAD_CLICKS * iteration);
        }));
    };

    changeJobsToOriginalState(jobIds) {
        jobIds.forEach((jobId) => {
            this.changeJobToOriginalState(jobId);
        });
    }

    changeJobToOriginalState(jobId) {
        const item = {...this.state.data.filter((i) => i.jobDetail.jobId === jobId)[0]};
        if (item && item.jobDetail) {
            item.jobDetail.isProcessing = false;
            item.jobDetail.status = item.jobDetail.originalStatus;
            this.setState({item});
        }
    }

    // ------list all the batch jobs------
    listBatchJobs = (searchString = '') => {
        this.setState({
            dataIsReturned: false,
        });
        let batchJobListUrl = getBffUrlConfig().batchJobsUrl;
        if (searchString !== '') {
            batchJobListUrl = generateBatchJobSearchUrl(searchString);
        }
        fileSearchListRequestHandler(batchJobListUrl).then((res) => {
            if (res.success) {
                this.setState({
                    data: res.data,
                    dataIsReturned: true
                });
            }
        }).catch(() => {
            this.setState({
                dataIsReturned: true
            });
            this.openNotificationWithIcon('error', 'Failed to list files.', 'Failure');
        });
    };

    debouncedListBatchJobs = _.debounce(((searchString) => this.listBatchJobs(searchString)), 1000);

    bulkDownload = () => {
        if (isMaxDownloadableCountExceed(this.state.selectedRowValues.length)) {
            this.openNotificationWithIcon('error', 'Too many files to download.', 'Failure');
            return;
        }

        const selectedRowValues = this.state.selectedRowValues;
        const toDownloadFiles = [];
        const toDownloadFileIds = [];
        const inprogressBatchJobs = [];

        selectedRowValues.forEach((row) => {
            if (row.jobDetail.status === JOB_INPROGRESS_STATUS) {
                inprogressBatchJobs.push(row.jobDetail.fileName);
            } else {
                toDownloadFileIds.push(row.jobDetail.jobId);
                if (row.jobDetail.fileName) {
                    toDownloadFiles.push(row.jobDetail.fileName);
                }

                if (row.jobDetail.minorErrorFileName) {
                    toDownloadFiles.push(row.jobDetail.minorErrorFileName);
                }
            }
        });

        if (inprogressBatchJobs.length > 0) {
            this.openNotificationWithIcon('warn',
                `Failed to download files for in-progress records. File names: ${getDisplayFileName(inprogressBatchJobs.join(', '))}`,
                'Warning');
        }

        this.downloadFiles(COMPLETED_FILE, toDownloadFileIds, toDownloadFiles);

        this.setState({
            selectedRowKeys: [],
            selectedRowValues: [],
        });
    };

    onSelect = (record, selected) => {
        if (selected) {
            this.setState({
                selectedRowKeys: [...this.state.selectedRowKeys, record.jobId],
                selectedRowValues: [...this.state.selectedRowValues, record]
            });
        } else {
            this.setState({
                selectedRowKeys: this.state.selectedRowKeys.filter((key) => key !== record.jobId),
                selectedRowValues: this.state.selectedRowValues.filter((row) => row.jobId !== record.jobId)
            });
        }
    };

    onSelectAll = (selected, selectedRows, changeRows) => {
        const changeRowKeys = changeRows.map((row) => row.jobId);
        if (selected) {
            this.setState({
                selectedRowKeys: [...this.state.selectedRowKeys, ...changeRowKeys],
                selectedRowValues: [...this.state.selectedRowValues, ...changeRows]
            });
        } else {
            const remainingSelectedRowKeys = this.state.selectedRowKeys.filter((key) => changeRowKeys.indexOf(key) < 0);
            const remainingSelectedRows = this.state.selectedRowValues.filter((row) => changeRows.indexOf(row) < 0);

            this.setState({
                selectedRowKeys: remainingSelectedRowKeys,
                selectedRowValues: remainingSelectedRows
            });
        }
    };

    onSearchStringChange = (searchBox) => {
        const searchString = searchBox.target.value;
        this.setState({searchString});
        this.debouncedListBatchJobs(searchString);
    };

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
                        onSearch={this.listBatchJobs}
                    />
                    <div className="upload-confirmation">
                        {this.props.fileUploadCompleted ? FILE_APPEAR_NOTIFICATION : ''}
                    </div>
                    <div className="spacer"></div>
                    <div className="selected-item-status">
                        <p>
                            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                        </p>
                        {hasSelected && (
                            <Button
                                type="primary"
                                className="btn green-action-btn rounded download-btn"
                                onClick={this.bulkDownload}
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
                        onClick={() => this.listBatchJobs(searchString)}
                    >
                        <i className="icon fi flaticon-refresh-1"/> Refresh
                    </Button>
                </div>
                <div className="file-list-table-wrapper">
                    {dataIsReturned
                        ? <Table
                            rowKey='jobId'
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

export default withHooksHOC(FileList);
