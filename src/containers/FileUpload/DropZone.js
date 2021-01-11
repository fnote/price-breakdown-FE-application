import React from 'react';
import {message, Upload} from 'antd';
import {getBffUrlConfig} from "../../utils/Configs";
import axios from 'axios';
import {PCI_FILENAME_PREFIX} from '../../constants/Constants';

const {Dragger} = Upload;

const formRequestBody = (fileName, fileType) => JSON.stringify({
    fileNames: [fileName],
    contentType: fileType
});

const handleResponse = (response) => response.json()
    .then((json) => {
        if (response.ok) {
            return {success: true, data: json};
        }
        return {success: false, data: json};
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
                        console.log('Error:', JSON.stringify(error, null, 2));
                        payload.info.onError();
                    });
                return resp.data;
            } else {
                return null;
            }
        })
        .catch((e) => {
            console.log(e);
            payload.info.onError();
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
        if (status !== 'uploading') {
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
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
    </div>
  );
}

export default DropZone;
