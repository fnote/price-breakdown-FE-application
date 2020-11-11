import React from "react";
import { Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

function RequestId() {
  return (
    <div className="request-id">
      Request Id - 3f5f45c7-12c7-4035-90fb-7a6480b416a3{" "}
      <Tooltip title="This is a unique ID for your request. You maybe requested to provide this for support purposes.">
        <InfoCircleOutlined />
      </Tooltip>
    </div>
  );
}

export default RequestId;
