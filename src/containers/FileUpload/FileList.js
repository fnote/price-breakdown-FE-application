import React from 'react';
import {Button, Input, Table} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import {getBffUrlConfig} from "../../utils/Configs";

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
        {text[0] === 'processing' && (
          <div className="file-process-status">FILE IS BEING PROCESSED</div>
        )}
        {text[0] === 'error' && (
          <div className="file-process-status error">
            File Contained errors
            <div className="divider"></div>
            <Button className="btn empty-btn download-error-file">
              <i className="icon fi flaticon-cloud-computing" />
              View error file
            </Button>
          </div>
        )}
        {text[0] === 'success' && (
          <div className="file-process-status success">
            File processed successfully
          </div>
        )}
        {text[0] !== 'processing' ? (
          <>
            <Button className="btn icon-only empty-btn">
              <i className="icon fi flaticon-bin" />
            </Button>
            <Button className="btn icon-only empty-btn download-file"
                    onClick={() => {
                      downloadFile('https://sysco-us-east-1-prcp-dev-batch-output.s3.amazonaws.com/C01C_066_000041_20201124_A.txt?AWSAccessKeyId=ASIAQRLXWZJ2LLLMGGFX&Expires=1606269534&Signature=mhjEi40vw7tuzquTCtBJ20m4sdY%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGgaCXVzLWVhc3QtMSJHMEUCIFG%2BBchlV48bGulCYeJqUTa3NFr0I%2BIKFlcBQzHIurtFAiEAwrFJf9zcD0D5gDRse%2By0k%2FV9GmFHEWfFSP4b%2F6%2FvLTsqlgMI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwwMzcyOTUxNDc2MzYiDJ5Sj8JgC5EA%2BQjOpCrqAsdWZTqAyo7HvTtbFQmiOAhNizaOCCClV5dDuKzpyUCwqWjvWy4eWJPUnNUYKxPeaO%2FuYeBg%2BlfSVT8UNsKbLvKQNUtbDVQp4i1wu6%2FEqz2Yft1x6L2vuLtEYnmmJAOJEmAiFoYLoop8sU9hHt2ab1C4wkwkZfE2AvdFfgm9zQ3nEOy1meU9HUW0Wj8r4cbuZNmt2JaTrYkAPrNz1Tf8luSPZtLJxjPTTFsKQPcV51%2FsrHVOZoT0bo5wgK4Ap9dwY2BjSGm%2FDe9JI6doWMSEf2svfK3RtUtMKo34PQKx6V%2FE8Jm8qhpa24kSLPgqHww2qdzlD3oB31O32V0auAjp9kqz9aLE1L0BxAzDiXSPId7Ae4mZIJMJw7X1LRKf3nZQ729Dt%2FOk5qyZIHWbcZWcBmSYkpbWeI4OrbGYG0G0P18%2BVE6nvMYi5CbMqgDbIPmpW6XIQ%2BaPBMv6NXoNwbu6xF9KQbYf831oBfJGMOe79v0FOqYBZJsqnU9cvt%2BE3EAvfzGOqh%2F0iI8xnSy8lDDU%2Be1ewZ%2BANMpCG%2Fn6Z00D%2FV2Q%2Bpsr%2BKM7egs4hB7X7BaiyjirK3YOFbwbmhxN5CDaMLoKuogpLDDaQ0y%2BTvXZA4bPZl%2Fxg3x7cocCH%2F7pt2tBQVYzF%2BDv5Yo7yGB3%2F1mKbonM2H1mcmI2INOf8z9cI4mhaPbg1kg9BzovmJBf58kqdffF%2BfP%2BUqKddw%3D%3D')
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

const handleResponse = (response) => {
  const files = []
  return response.json().then((json) => {
    const responseData = json.data;
    if (response.ok && responseData) {
      responseData.forEach((file, index) => {
        files.push({
          key: index + 1,
          submittime: file.date,
          filename: file.fileName,
          action: ['success'],
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
  }).then(handleResponse);


const downloadFile  =  (url) => {
  fetch(url, {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        },
      }
      )
      .then((response) =>
          console.log('Downloaded successfully'))
      .catch(error => {
        console.log('error in downloading', error.message);
      })
};

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

  componentDidMount() {
    fileListRequestHandler().then((res) => {
      if(res.success) {
        this.setState({
          data: res.data,
          dataIsReturned : true
        })
      }
    });
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

    return dataIsReturned ? (
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
            <Button type="link" className="refresh-btn">
              <i className="icon fi flaticon-refresh-1"/> Refresh
            </Button>
          </div>
          <div className="file-list-table-wrapper">
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                scroll={{x: 'auto', y: '60vh'}}
            />
          </div>
        </div>
    ) : null;
  }
}

export default FileList;
