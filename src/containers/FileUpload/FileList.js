import React from 'react';
import {Button, Input, Table} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import {getBffUrlConfig} from "../../utils/Configs";
import {ERROR_FILE_EXTENSION, FILE_ERROR, FILE_PROCESSING, FILE_SUCCESS} from "../../constants/Constants";

const { Search } = Input;

const columns = [
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
    render: (text) => (
      <div className="action-bar">
        {text[0] === FILE_PROCESSING && (
          <div className="file-process-status">FILE IS BEING PROCESSED</div>
        )}
        {text[0] === FILE_ERROR && (
          <div className="file-process-status error">
            File Contained errors
            <div className="divider"></div>
            <Button className="btn empty-btn download-error-file">
              <i className="icon fi flaticon-cloud-computing" />
              View error file
            </Button>
          </div>
        )}
        {text[0] === FILE_SUCCESS && (
          <div className="file-process-status success">
            File processed successfully
          </div>
        )}
        {text[0] !== FILE_PROCESSING ? (
          <>
            <Button className="btn icon-only empty-btn">
              <i className="icon fi flaticon-bin" />
            </Button>
            <Button className="btn icon-only empty-btn download-file">
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

const handleResponse = (response) => {
  const files = []
  return response.json().then((json) => {
    const responseData = json.data;
    if (response.ok && responseData) {
      responseData.forEach((file, index) => {
        let action = [FILE_SUCCESS];
        if (file.fileName.endsWith(ERROR_FILE_EXTENSION)) {
          action = [FILE_ERROR];
        }
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

const fileListRequestHandler = () => fetch(getBffUrlConfig().listOutputFilesEndpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(handleResponse);

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [],
      dataIsReturned : false
    };
  }

  loadDataFiles = () => {
    this.setState({
      dataIsReturned : false
    })
    fileListRequestHandler().then((res) => {
      if(res.success) {
        this.setState({
          data: res.data,
          dataIsReturned : true
        })
      }
    });
  }

  componentDidMount() {
    this.loadDataFiles();
  }

  start = () => {
    this.setState({loading: true});
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const {loading, selectedRowKeys, data, dataIsReturned} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

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
                // loading
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
                      disabled={!hasSelected}
                      loading={loading}
                      scroll={{x: 'auto', y: 300}}>
                    <i className="icon fi flaticon-download"/> Download Selected
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
                  columns={columns}
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
