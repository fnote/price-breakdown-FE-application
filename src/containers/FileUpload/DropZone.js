import React from 'react';
import {notification, Upload} from 'antd';
import axios from 'axios';
import {getBffUrlConfig} from '../../utils/Configs';
import {
    FILE_UPLOADING_DONE,
    FILE_UPLOADING_ERROR,
    FILENAME_DELIMITER,
    INVALID_FILE_NAME,
    INVALID_FILE_TYPE,
    PCI_FILENAME_PREFIX,
    SUPPORTED_FILE_EXTENSIONS
} from '../../constants/Constants';
import {blobToFile, getMimeType, isValidFileName, isValidFileType} from '../../utils/FileUploadValidation';
import {getDisplayFileName} from '../../utils/CommonUtils';

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
    fileNames: [{fileName, contentType: fileType}],
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
        const file = info.file;
        if (file.name.includes(FILENAME_DELIMITER)) {
            // Get file extension from file name
            const splitFilename = file.name.split(FILENAME_DELIMITER);
            const extension = FILENAME_DELIMITER.concat(splitFilename[splitFilename.length - 1]);

            // create a blob from file calling mime type injection function
            const blob = new Blob([file], {type: getMimeType(extension)});
            // re-convert to a file
            info.file = blobToFile(blob, file.name);
        }
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

function DropZone(properties) {
    const props = {
        accept: SUPPORTED_FILE_EXTENSIONS.join(', '),
        name: 'file',
        multiple: true,
        customRequest: customUpload,
        onChange(info) {
            properties.refreshSwitch(false);
            const {status} = info.file;
            let fileName = info.file.name;
            fileName = getDisplayFileName(fileName);
            if (status === FILE_UPLOADING_DONE) {
                properties.onChange(true);
                openNotificationWithIcon('success', `${fileName} file uploaded successfully.`, 'Success');
            } else if (status === FILE_UPLOADING_ERROR) {
                const err = info.file.error;
                if (err && err.errorType === INVALID_FILE_TYPE.errorType) {
                    openNotificationWithIcon('error', `${fileName} ${INVALID_FILE_TYPE.errorMessage}`, 'Failure');
                } else if (err && err.errorType === INVALID_FILE_NAME.errorType) {
                    openNotificationWithIcon('error', `${fileName} ${INVALID_FILE_NAME.errorMessage}`, 'Failure');
                } else {
                    openNotificationWithIcon('error', `${info.file.name} file upload failed.`, 'Failure');
                }
            }
            properties.refreshSwitch(true);
        },
    };

    return (
        <div className="drop-zone">
            <Dragger {...props}>
                <i className="icon fi flaticon-upload"/>
                <p className="ant-upload-text">Drag and drop file(s) here</p>
                <p className="ant-upload-hint">or</p>
                <button
                    type="primary"
                    htmlType="submit"
                    className="select-btn outlined-btn">
                    Select File(s)
                </button>
            </Dragger>
        </div>
    );
}

export default DropZone;
