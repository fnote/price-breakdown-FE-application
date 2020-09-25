import React from "react";
import { Input, Button, Table, Tag } from "antd";
const { Search } = Input;

const columns = [
  {
    title: "SUBMIT TIME",
    dataIndex: "submittime",
    className: "submittime"
  },
  {
    title: "FILE NAME",
    dataIndex: "filename",
    className: "filename"
  },
  {
    title: "",
    dataIndex: "action",
    className: "action"
  },
];

const data = [];
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    submittime: `${i} July 2020 10:15 AM `,
    filename: `284${i}02-075.XLS`,
    action: "FILE IS BEING PROCESSED",
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
          <Button type="link" className="refresh-btn">
            <i className="icon fi flaticon-refresh-1" /> Refresh
          </Button>
        </div>
        <div className="file-list-table-wrapper">
          <div style={{ marginBottom: 16 }}>
            
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
          <div className="selected-item-status">
            <p>
              {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
            </p>
            {hasSelected &&
            <Button
              type="primary"
              className="btn green-action-btn rounded download-btn"
              onClick={this.start}
              disabled={!hasSelected}
              loading={loading}
              scroll={{ x: 'auto', y: 300 }}>
              <i className="icon fi flaticon-download" /> Download Selected
            </Button>}
          </div>
        </div>
      </div>
    );
  }
}

export default FileList;
