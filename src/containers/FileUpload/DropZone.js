import React from 'react';
import {message, Upload} from 'antd';
import {getBffUrlConfig} from "../../utils/Configs";
import axios from 'axios';
import {
    FILE_UPLOADING,
    FILE_UPLOADING_DONE,
    FILE_UPLOADING_ERROR,
    PCI_FILENAME_PREFIX,
    UNSUPPORTED_FILE_TYPE_CODE
} from '../../constants/Constants';

const {Dragger} = Upload;

export class FileUploadRequestError extends Error {
    constructor(response, ...params) {
        super(...params);
        Error.captureStackTrace(this, FileUploadRequestError);
        this.response = response;
        return this;
    }
}

const handleResponse = (response) => response.json()
    .then((data) => {
        if (response.ok) {
            return {success: true, data: data};
        }
        throw new FileUploadRequestError(data);
    });

const formRequestBody = (fileName, fileType) => JSON.stringify({
    fileNames: [fileName],
    contentType: fileType
});

const fileUploadHandler = (payload) => {
    const filenameWithPciPrefix = PCI_FILENAME_PREFIX + payload.info.file.name;
    fetch(getBffUrlConfig().fileUploadUrl, {
        method: 'POST',
        body: formRequestBody(filenameWithPciPrefix, payload.info.file.type),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(handleResponse)
        .then((resp) => {
            if (resp.success) {
                const data = resp.data.data[0];
                uploadArtifact(data.putUrl, payload.info)
                    .then(result => {
                        payload.info.onSuccess(result, payload.info.file);
                    })
                    .catch(error => {
                        payload.info.onError();
                    });
                return resp.data;
            } else {
                return null;
            }
        })
        .catch((e) => {
            payload.info.onError(e);
        });
};

const uploadArtifact = (path, payload) => {
    const config = {
        headers: {
            'Content-Type': payload.file.type,
        },
        onUploadProgress: e => {
            payload.onProgress({percent: (e.loaded / e.total) * 100});
        },
    };

    return axios.put(path, payload.file, config);

}

const customUpload = info => {
    return new Promise((resolve, reject) => fileUploadHandler({
        info,
        resolve,
        reject,
    }));
};

const props = {
    name: 'file',
    multiple: true,
    customRequest: customUpload,
    onChange(info) {
        const {status} = info.file;
        if (status !== FILE_UPLOADING) {
        }
        if (status === FILE_UPLOADING_DONE) {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === FILE_UPLOADING_ERROR) {
            const err = info.file.error;
            if (err && err.response && err.response.errorCode === UNSUPPORTED_FILE_TYPE_CODE) {
                message.error(`${info.file.name} file upload failed due to unsupported file type.`);
            } else {
                message.error(`${info.file.name} file upload failed.`);
            }
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
    </div>
  );
}

export default DropZone;
