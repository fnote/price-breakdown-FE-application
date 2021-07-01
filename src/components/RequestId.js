import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

function RequestId(props) {
  const { requestId } = props;
  return (
    <div className="request-id">
      Request Id - {requestId}
      <Tooltip title="This is a unique ID for your request. You may be requested to provide this for support purposes.">
        <InfoCircleOutlined className="pz-req-id-icon"/>
      </Tooltip>
    </div>
  );
}

export function RequestIdForEmptyResponse(props) {
    const { requestId } = props;
    return (
        <div className="pz-request-id">
            Request Id - {requestId}
            <Tooltip title="This is a unique ID for your request. You may be requested to provide this for support purposes.">
                <InfoCircleOutlined className="pz-req-id-icon"/>
            </Tooltip>
        </div>
    );
}

export default RequestId;
