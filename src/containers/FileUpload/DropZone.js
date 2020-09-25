import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function DropZone() {
  return (
    <div className="drop-zone">
      <Dragger {...props}>
        <i className="icon fi flaticon-upload" />
        <p className="ant-upload-text">Drag and drop file here</p>
        <p className="ant-upload-hint">or</p>
        <button
          type="primary"
          htmlType="submit"
          className="select-btn outlined-btn">
          Select File
        </button>
      </Dragger>
      <div className="upload-list">List</div>
    </div>
  );
}

export default DropZone;
