import React from 'react';
import {Button, Input, message, notification, Table} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
// eslint-disable-next-line import/no-named-default
import {default as _} from 'lodash';
import {getBffUrlConfig} from '../../utils/Configs';
import {
    EMPTY_STRING,
    JOB_COMPLETE_STATUS,
    JOB_ERROR_STATUS,
    JOB_INPROGRESS_STATUS,
    JOB_PARTIALLY_COMPLETED_STATUS,
    MAX_DOWNLOAD_ALLOWED,
    PCI_FILENAME_PREFIX,
    TAG_NAME_A,
    TIMEOUT_DURING_DOWNLOAD_CLICKS
} from '../../constants/Constants';
import JobDetail from '../../model/jobDetail';
import {
    generateBatchJobSearchUrl,
    generateBatchJobDeleteUrl,
    removeFileNamePrefix,
    removeFileNamePrefixFromList
} from '../../utils/FIleListUtils';

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

    componentDidMount() {
        this.listBatchJobs();
    }

    deleteJob = (jobId) => {
        this.jobDeleteRequestHandler(jobId)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).then((response) => {
            const fileNames = removeFileNamePrefixFromList(response.data.fileNames);
            this.openNotificationWithIcon('success',
                `Batch job deletion successful. Deleted file names: ${fileNames}`, 'Success');
            this.removeDeletedJobFromList(jobId);
            this.removeDeletedJobFromSelectedRecords(jobId);
        }).catch(() => {
            this.openNotificationWithIcon('error', 'Failed to delete the batch file', 'Failure');
        });
    };

    removeDeletedJobFromList = (jobId) => {
        const rows = this.state.data;

        this.setState({
            data: rows.filter((row) => row.jobDetail.jobId !== jobId),
            dataIsReturned: true
        });
    };

    removeDeletedJobFromSelectedRecords(jobId) {
        this.setState({
            selectedRowKeys: this.state.selectedRowKeys.filter((key) => key !== jobId),
            selectedRowValues: this.state.selectedRowValues.filter((row) => row.jobId !== jobId)
        });
    }

    jobDeleteRequestHandler = (jobId) => fetch(generateBatchJobDeleteUrl(jobId), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    downloadFile = (fileNamesArray) => {
        const fileNamesArrayWithPciPrefix = [];

        fileNamesArray.forEach((fileName) => {
            const fileNameWithPciPrefix = PCI_FILENAME_PREFIX + fileName;
            fileNamesArrayWithPciPrefix.push(fileNameWithPciPrefix);
        });

        this.generateSignedUrls(fileNamesArrayWithPciPrefix)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            }).catch(() => {
                const errorMsg = 'Failed to download the files.';
                this.openNotificationWithIcon('error', `${errorMsg} : ${fileNamesArrayWithPciPrefix}`, 'Failure');
            })
            .then((response) => {
                const fileNameUrlArray = response.data;
                Promise.all(this.downloadFromSignedUrl(fileNameUrlArray));
            });
    };

    generateSignedUrls = (fileNamesArray) => fetch(getBffUrlConfig().filesDownloadUrl, {
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

                        this.openNotificationWithIcon('success', `File downloaded successful. File name: ${fileNameWithoutPciPrefix}`, 'Success');
                        resolve();
                    })
                    .catch((error) => {
                        let errorMsg = 'Failed to download the file.';
                        if (error.status === 404) {
                            errorMsg = 'Failed to download as file is not found.';
                        }
                        this.openNotificationWithIcon('error', `${errorMsg} : ${fileNameWithoutPciPrefix}`, 'Failure');
                        reject();
                    });
            }, TIMEOUT_DURING_DOWNLOAD_CLICKS * iteration);
        }));
    };

    openNotificationWithIcon = (type, description, msg) => {
        notification[type]({
            message: msg,
            description,
        });
    };

    columns = [
        {
            title: 'FILE NAME',
            dataIndex: 'filename',
            className: 'filename',
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
                        <div className="file-process-status">File is being processed</div>
                    )}
                    {jobDetail.status === JOB_PARTIALLY_COMPLETED_STATUS && (
                        <div className="file-process-status warn">
                            <Button className="btn empty-btn download-error-file"
                                    onClick={() => {
                                        this.downloadFile([jobDetail.minorErrorFileName]);
                                    }}
                            >
                                <i className="icon fi flaticon-cloud-computing"/>
                                View minor error file
                            </Button>
                            <div className="divider"></div>
                            File processed partially
                        </div>
                    )}
                    {jobDetail.status === JOB_COMPLETE_STATUS && (
                        <div className="file-process-status success">
                            File processed successfully
                        </div>
                    )}
                    {jobDetail.status === JOB_ERROR_STATUS && (
                        <div className="file-process-status error">
                            Failed to process
                        </div>
                    )}
                    {jobDetail.status !== JOB_INPROGRESS_STATUS ? (
                        <>
                            <Button className="btn icon-only empty-btn"
                                    onClick={() => {
                                        this.deleteJob(jobDetail.jobId);
                                    }}
                            >
                                <i className="icon fi flaticon-bin"/>
                            </Button>
                            <Button className="btn icon-only empty-btn download-file"
                                    onClick={() => {
                                        this.downloadFile([jobDetail.fileName]);
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

    handleResponse = (response) => {
        const batchJobDetailList = [];
        return response.json().then((json) => {
            const responseData = json.data;
            if (response.ok && responseData) {
                responseData.forEach((job) => {
                    const jobDetail = this.formatJobDetailObject(job);
                    batchJobDetailList.push({
                        jobId: jobDetail.jobId,
                        startTime: jobDetail.startTime,
                        endTime: jobDetail.endTime,
                        filename: jobDetail.fileName,
                        jobDetail,
                    });
                });
                return {success: true, data: batchJobDetailList};
            }
            return {success: false, data: batchJobDetailList};
        });
    };

    fileSearchListRequestHandler = (batchJobsListUrl) => fetch(batchJobsListUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(this.handleResponse);

    listBatchJobs = (searchString = '') => {
        this.setState({
            dataIsReturned: false,
        });
        let batchJobListUrl = getBffUrlConfig().batchJobsUrl;
        if (searchString !== '') {
            batchJobListUrl = generateBatchJobSearchUrl(searchString);
        }
        this.fileSearchListRequestHandler(batchJobListUrl).then((res) => {
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
            message.error('Failed to list files.');
        });
    };

    bulkDownload = () => {
        if (this.state.selectedRowValues.length > MAX_DOWNLOAD_ALLOWED) {
            this.openNotificationWithIcon('error', 'Too many files to download.', 'Failure');
            return;
        }

        const selectedRowValues = this.state.selectedRowValues;
        const toDownloadFiles = [];

        selectedRowValues.forEach((row) => {
            if (row.jobDetail.fileName) {
                toDownloadFiles.push(row.jobDetail.fileName);
            }

            if (row.jobDetail.minorErrorFileName) {
                toDownloadFiles.push(row.jobDetail.minorErrorFileName);
            }
        });

        this.downloadFile(toDownloadFiles);

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
            const remainingSelectedRow = this.state.selectedRowValues.filter((row) => changeRows.indexOf(row) < 0);

            this.setState({
                selectedRowKeys: remainingSelectedRowKeys,
                selectedRowValues: remainingSelectedRow
            });
        }
    };



    onSearchStringChange = (searchBox) => {
        const searchString = searchBox.target.value;
        this.setState({searchString});
        this.debouncedListBatchJobs(searchString);
    };

    debouncedListBatchJobs = _.debounce(((searchString) => this.listBatchJobs(searchString)), 1000);

    formatJobDetailObject = (job) => {
        const jobDetail = JobDetail.fromJson(job);
        jobDetail.fileName = removeFileNamePrefix(jobDetail.fileName);
        jobDetail.minorErrorFileName = jobDetail.minorErrorFileName
            ? jobDetail.minorErrorFileName.replace(PCI_FILENAME_PREFIX, '') : null;
        jobDetail.startTime = jobDetail.startTime ? new Date(jobDetail.startTime).toString() : null;
        jobDetail.endTime = jobDetail.endTime ? new Date(jobDetail.endTime).toString() : null;
        return jobDetail;
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

export default FileList;
