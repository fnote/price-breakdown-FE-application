import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import DropZone from './DropZone';
import FileList from './FileList';

function FileUpload() {
    const [fileUploadCompleted, setFileUploadCompleted] = React.useState(false);
    const [refreshOn, setRefreshOn] = React.useState(true);

    const handleChange = (newValue) => {
        setFileUploadCompleted(newValue);
    };

    const refreshSwitch = (value) => {
            setRefreshOn(value);
    };

    return (
        <div className="wrapper cloudpricing-wrapper">
            <AppBar/>
            <div className="content file-upload">
                <DropZone fileUploadCompleted={fileUploadCompleted} onChange={handleChange}
                          refreshSwitch={refreshSwitch}/>
                <FileList refreshOn={refreshOn} fileUploadCompleted={fileUploadCompleted} onChange={handleChange}/>
            </div>
        </div>
    );
}

export default FileUpload;
