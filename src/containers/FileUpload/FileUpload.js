import React from 'react';
import AppBar from '../../components/AppBar/AppBar';
import DropZone from './DropZone';
import FileList from './FileList';

function FileUpload() {
  return (
    <div className="wrapper cloudpricing-wrapper">
      <AppBar />
      <div className="content file-upload">
        <DropZone />
        <FileList />
      </div>
    </div>
  );
}

export default FileUpload;
