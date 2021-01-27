import React from 'react';
import {notification, Upload} from 'antd';
import axios from 'axios';
import {getBffUrlConfig} from '../../utils/Configs';
import {
    FILE_UPLOADING_DONE,
    FILE_UPLOADING_ERROR, INVALID_FILE_NAME,
    INVALID_FILE_TYPE,
    PCI_FILENAME_PREFIX,
    SUPPORTED_FILE_TYPES
} from '../../constants/Constants';
import {isValidFileName, isValidFileType} from '../../utils/FileUploadValidation';

const {Dragger} = Upload;

export class FileUploadError extends Error {
    constructor(type, ...params) {
        super(...params);
        Error.captureStackTrace(this, FileUploadError);
        this.errorType = type;
        return this;
    }
}

const handleResponse = (response) => response.json()
    .then((data) => {
        if (response.ok) {
            return {success: true, data};
        }
        throw new Error(data);
    });

const formRequestBody = (fileName, fileType) => JSON.stringify({
    fileNames: [fileName],
    contentType: fileType
});

const uploadArtifact = (path, payload) => {
    const config = {
        headers: {
            'Content-Type': payload.file.type,
        },
        onUploadProgress: (e) => {
            payload.onProgress({percent: (e.loaded / e.total) * 100});
        },
    };

    return axios.put(path, payload.file, config);
};

const fileUploadHandler = (payload) => {
    const filenameWithPciPrefix = PCI_FILENAME_PREFIX + payload.info.file.name;
    fetch(getBffUrlConfig().filesUploadUrl, {
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
                    .then((result) => {
                        payload.info.onSuccess(result, payload.info.file);
                    })
                    .catch(() => {
                        payload.info.onError();
                    });
                return resp.data;
            }
            return null;
        })
        .catch((e) => {
            payload.info.onError(e);
        });
};

const customUpload = (info) => {
    if (isValidFileType(info.file.type)) {
        if (isValidFileName(info.file.name)) {
            return new Promise((resolve, reject) => fileUploadHandler({
                info,
                resolve,
                reject,
            }));
        }
        return info.onError(new FileUploadError(INVALID_FILE_NAME.errorType));
    }
    return info.onError(new FileUploadError(INVALID_FILE_TYPE.errorType));
};

const openNotificationWithIcon = (type, description, msg) => {
    notification[type]({
        message: msg,
        description,
    });
};

const props = {
    accept: SUPPORTED_FILE_TYPES.join(', '),
    name: 'file',
    multiple: true,
    customRequest: customUpload,
    onChange(info) {
        const {status} = info.file;
        if (status === FILE_UPLOADING_DONE) {
            openNotificationWithIcon('success', `${info.file.name} file uploaded successfully.`, 'Success');
        } else if (status === FILE_UPLOADING_ERROR) {
            const err = info.file.error;
            if (err && err.errorType === INVALID_FILE_TYPE.errorType) {
                openNotificationWithIcon('error', `${info.file.name} ${INVALID_FILE_TYPE.errorMessage}`, 'Failure');
            } else if (err && err.errorType === INVALID_FILE_NAME.errorType) {
                openNotificationWithIcon('error', `${info.file.name} ${INVALID_FILE_NAME.errorMessage}`, 'Failure');
            } else {
                openNotificationWithIcon('error', `${info.file.name} file upload failed.`, 'Failure');
            }
        }
    },
};

function DropZone() {
    return (
        <div className="drop-zone">
            <Dragger {...props}>
                <i className="icon fi flaticon-upload"/>
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
