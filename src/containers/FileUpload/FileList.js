import React from "react";
import { Input, Button, Table, Tag } from "antd";
const { Search } = Input;

const columns = [
  {
    title: "SUBMIT TIME",
    dataIndex: "submittime",
    className: "submittime",
  },
  {
    title: "FILE NAME",
    dataIndex: "filename",
    className: "filename",
  },
  {
    dataIndex: "action",
    className: "action",
    render: (text) => (
      <div className="action-bar">
        {text[0] == "processing" && (
          <div className="file-process-status">FILE IS BEING PROCESSED</div>
        )}
        {text[0] == "error" && (
          <div className="file-process-status error">
            File Contained errors
            <div className="divider"></div>
            <Button className="btn empty-btn download-error-file">
              <i className="icon fi flaticon-cloud-computing" />
              View error file
            </Button>
          </div>
        )}
        {text[0] == "success" && (
          <div className="file-process-status success">
            File processed successfully
          </div>
        )}
        {text[0] != "processing" ? (
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
              <i className="icon fi flaticon-close" />
            </Button>
            <i className="icon fi flaticon-refresh-2 processing-spinner" />
          </>
        )}
      </div>
    ),
  },
];

const data = [
  {
    key: 1,
    submittime: "01 July 2020 10:15 AM",
    filename: `2841202-075.XLS`,
    action: ["processing"],
  },
  {
    key: 1,
    submittime: "01 July 2020 10:15 AM",
    filename: `2841202-075.XLS`,
    action: ["error"],
  },
  {
    key: 1,
    submittime: "01 July 2020 10:15 AM",
    filename: `2841202-075.XLS`,
    action: ["success"],
  },
];
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    submittime: `${i} July 2020 10:15 AM `,
    filename: `284${i}02-075.XLS`,
    action: [],
  });
}

class FileList extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
  };

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
      <div className="file-list">
        <div className="panel-header">
          <div className="title">
            <i className="icon fi flaticon-history" />
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
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </p>
            {hasSelected && (
              <Button
                type="primary"
                className="btn green-action-btn rounded download-btn"
                onClick={this.start}
                disabled={!hasSelected}
                loading={loading}
                scroll={{ x: "auto", y: 300 }}>
                <i className="icon fi flaticon-download" /> Download Selected
              </Button>
            )}
          </div>
          <Button type="link" className="refresh-btn">
            <i className="icon fi flaticon-refresh-1" /> Refresh
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
    );
  }
}

export default FileList;
