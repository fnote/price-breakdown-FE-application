import React from 'react';
import {Button, Input, Table, notification} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import {getBffUrlConfig} from "../../utils/Configs";
import {
  BATCH_MINOR_ERROR_FOLDER_NAME,
  ERROR_FILE_EXTENSION,
  FILE_ERROR,
  FILE_PROCESSING,
  FILE_SUCCESS,
  MAX_DOWNLOAD_ALLOWED
} from "../../constants/Constants";

const { Search } = Input;

class FileList extends React.Component {

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
              <i className="icon fi flaticon-cloud-computing" />
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
              <i className="icon fi flaticon-bin" />
            </Button>
            <Button className="btn icon-only empty-btn download-file"
                    onClick={() => {
                      this.downloadFile([data.fileName]);

                    }}
            >
              <i className="icon fi flaticon-cloud-computing" />
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
  const files = []
  return response.json().then((json) => {
    const responseData = json.data;
    if (response.ok && responseData) {
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
      return { success: true, data: files};
    }
    return { success: false, data: files};
  });
};

fileListRequestHandler = () => fetch(getBffUrlConfig().listOutputFilesEndpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  }).then(this.handleResponse);

fileSearchListRequestHandler = (searchRequestEndpoint) => fetch(searchRequestEndpoint, {
  method: 'GET',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
}).then(this.handleResponse);

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

downloadFile  =  (fileNamesArray) => {
  this.setState({
    dataIsReturned : false
  });

  this.generateSignedUrls(fileNamesArray)
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(response => {
          const fileNameUrlArray = response.data;
        Promise.all(this.downloadFromSignedUrl(fileNameUrlArray))
            .then(() => {
              console.log('all over..')
              this.setState({
                dataIsReturned : true
              });
            })
            .catch(() => {
              this.setState({
                dataIsReturned : true
              });
            });

        }).catch(error => {
    this.setState({
      dataIsReturned : true
    })
  console.log(error)
});
};

downloadFromSignedUrl = (fileNameUrlArray) => {
  console.log('filenames array length', fileNameUrlArray.length);
  let downloadurlarray = [];
  let filenames = [];
  let filenamescomb = [];

  let iteration = 0;
  return fileNameUrlArray.map(({fileName, readUrl}) => {
    // console.log('filename', fileName)
    // console.log('readUrl', readUrl)

    return new Promise((resolve, reject) => {
      iteration += 1;
setTimeout(() => {
    fetch(readUrl)
        .then(response => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(uril => {
          let link = document.createElement("a");
          link.href = uril;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          // document.body.removeChild(link);
          link.remove();


          downloadurlarray.push(uril);
          filenames.push(fileName);
          filenamescomb.push({fileName, uril});

          console.log('downloaded', downloadurlarray.length);
          console.log(filenames.sort());
          console.log(filenamescomb);

          // this.setState({
          //   dataIsReturned : true
          // });
          resolve();
        })
        .catch(() => {
          this.openNotificationWithIcon('error', 'Failed to download the file.');
          console.log('error');
          reject();
        });
}, 1000 * iteration);
  });
  });
};

openNotificationWithIcon = (type, description) => {
    notification[type]({
      message: 'Failure',
      description: description,
    });
  };


  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [],
      dataIsReturned : false,
      searchString: ''
    };
  }

  loadDataFiles = () => {
    this.setState({
      dataIsReturned : false,
      searchString: ''
    })
    this.fileListRequestHandler().then((res) => {
      if(res.success) {
        this.setState({
          data: res.data,
          dataIsReturned : true
        })
      }
    });
  }

  getListSearchFilesEndpoint = (source, prefix) => {
    return getBffUrlConfig().listSearchFilesEndpoint + source + "/" + prefix;
  }

  loadSearchDataFiles = (value) => {
    if(value !== ''){
      this.setState({
        dataIsReturned : false,
      })

      this.fileSearchListRequestHandler(this.getListSearchFilesEndpoint("output", value)).then((res) => {
        if(res.success) {
          this.setState({
            data: res.data,
            dataIsReturned : true
          })
        }
      });
    }else{
      this.loadDataFiles();
    }
  }

  componentDidMount() {
    this.loadDataFiles();
  }

  start = () => {
    if(this.state.selectedRowValues.length > MAX_DOWNLOAD_ALLOWED) {
      this.openNotificationWithIcon('error', 'Too many files to download.');
      return;
    }

    this.setState({loading: true});
    const selectedRowValues = this.state.selectedRowValues;
    const toDownloadFiles = [];

    selectedRowValues.forEach(row => {
      if(row.action.fileName) {
        toDownloadFiles.push(row.action.fileName);
      }

      if(row.action.minorErrorFileName) {
        toDownloadFiles.push(row.action.minorErrorFileName);
      }
    });

    this.downloadFile(toDownloadFiles);

    this.setState({
      selectedRowKeys: [],
      loading: false,
    });

  };

  onSelectChange = (selectedRowKeys, selectedRowValues) => {
    this.setState({ selectedRowKeys, selectedRowValues });
  };

  onSearchStringChange = (searchBox) => {
    this.setState({ searchString: searchBox.target.value });
  };

  render() {
    const {loading, selectedRowKeys, data, dataIsReturned, searchString} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
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
