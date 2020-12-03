import React from 'react';
import {Button, Input, Table} from 'antd';
import {SyncOutlined} from '@ant-design/icons';
import {getBffUrlConfig} from "../../utils/Configs";
import {ERROR_FILE_EXTENSION, FILE_ERROR, FILE_PROCESSING, FILE_SUCCESS} from "../../constants/Constants";

const { Search } = Input;

const columns = [
  {
    title: 'SUBMIT TIME',
    dataIndex: 'submittime',
    className: 'submittime'
  },
  {
    title: 'FILE NAME',
    dataIndex: 'filename',
    className: 'filename',
  },
  {
    dataIndex: 'action',
    className: 'action',
    width: 'auto',
    render: (data) => (
      <div className="action-bar">
        {data.status === FILE_PROCESSING && (
          <div className="file-process-status">FILE IS BEING PROCESSED</div>
        )}
        {data.status === FILE_ERROR && (
          <div className="file-process-status error">
            File Contained errors
            <div className="divider"></div>
            <Button className="btn empty-btn download-error-file">
              <i className="icon fi flaticon-cloud-computing" />
              View error file
            </Button>
          </div>
        )}
        {data.status === FILE_SUCCESS && (
          <div className="file-process-status success">
            File processed successfully
          </div>
        )}
        {data.status !== FILE_PROCESSING ? (
          <>
            <Button className="btn icon-only empty-btn">
              <i className="icon fi flaticon-bin" />
            </Button>
            <Button className="btn icon-only empty-btn download-file"
                    onClick={() => {
                      downloadFile([data.fileName]);

                    }}
            >
              <i className="icon fi flaticon-cloud-computing" />
            </Button>
          </>

        ) : (
          <>
            <Button className="btn icon-only empty-btn cancel-process">
              <i className="icon fi flaticon-close"/>
            </Button>
            <SyncOutlined spin className="icon processing-spinner"/>
          </>
        )}
      </div>
    ),
  },
];

const handleResponse = (response) => {
  const files = []
  return response.json().then((json) => {
    const responseData = json.data;
    if (response.ok && responseData) {
      responseData.forEach((file, index) => {
        let action = {
          status: FILE_SUCCESS,
          fileName: file.fileName
        };
        if (file.fileName.endsWith(ERROR_FILE_EXTENSION)) {
          action = {
            status: FILE_ERROR,
          }
        }
        files.push({
          key: index + 1,
          submittime: file.date,
          filename: file.fileName,
          action: action,
        });
      });
      return { success: true, data: files};
    }
    return { success: false, data: files};
  });
};

const fileListRequestHandler = () => fetch(getBffUrlConfig().listOutputFilesEndpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  }).then(handleResponse);


const generateSignedUrls = (fileNamesArray) => fetch(getBffUrlConfig().outputBucketFilesSignedUrlEndpoint, {
      method: 'POST',
      body: JSON.stringify({
          'fileNames': fileNamesArray
        }),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

const downloadFile  =  (fileNamesArray) => {
  console.log(fileNamesArray)

  generateSignedUrls(fileNamesArray)
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then(response => {
        console.log(response)
        console.log(response.data)
          const fileNameUrlArray = response.data;
          console.log(fileNameUrlArray.length)
          downloadFromSignedUrl(fileNameUrlArray)
        }).catch(error => {
  console.log(error)
});



//   fetch(url, {
//         method: 'GET',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Access-Control-Allow-Origin': '*',
//           'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
//         },
//       }
//       )
//       .then((response) => {
//           console.log(response);
//           console.log('Downloaded successfully');
// })
//       .catch(error => {
//         console.log('error in downloading', error.message);
//       })

const ar = ['https://sysco-us-east-1-prcp-dev-batch-output.s3.amazonaws.com/C01C_066_000041_20201124_A.txt?AWSAccessKeyId=ASIAQRLXWZJ2BOMGUEEY&Expires=1606286144&Signature=feCqVbO3au7xDP9eXV0%2BeB1Elyw%3D&response-content-disposition=attachment&x-amz-security-token=IQoJb3JpZ2luX2VjEGwaCXVzLWVhc3QtMSJHMEUCIQDhYEXP%2FRIkI%2Few7UGBio6GiswfkaE9y7kiKIOG%2Bp%2FF8wIgL0O1lO7DR3zP5qGZ6VLBnb%2Fdki%2Bnv9%2B17%2Fuub%2BbJONQqlgMI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwwMzcyOTUxNDc2MzYiDCQo%2F0l2j2C2tmbzxirqAs3BubpbWbKmGi%2BD7bVYvZ5%2BRTxHJB%2F8hYYgV4gvIQpj%2B8M8Zkms%2FKGpvw9cz50D0TnAwovRvg8J7yNRk3uSzx5J8BKk5F0RHfKB9JkD5dWZVQYxPaCfnxPgz%2Ftr11VYwB54JnZKRJ4MseGZpsNS2ka2ykH7u0%2BvvFFE11Xmel%2BwD%2Bj3FKXD%2FTPCMnIYirRV0aRaamJ8vjvOZOcq1NCl1MI%2BT91h3%2FPL04Y6AR497d%2B0UH4mYLiTbOBFLMTwIhlK4sD6wATuLnPfgiVCeuAwUko%2FEYbtkSMzgMPxFNhLD%2BTh4YYC7EdtpaHRtbTTSqo0QBSfE%2FpPL72aEd4hye7wlpWkav4BbNAQofWPr6voilBvcv%2Bmeyrnd%2BpfbFzrS5FSfm2n0p4vwr%2BPSB8aklM7tAWpP9MB7VEw8%2FYnM7PifXDK8VI9oeueRVhQk3UMidg%2BKKCKCjqshB1v1SmE%2BbWUdor%2FVwPWzEf6k0MWMN2s9%2F0FOqYBE8alS%2BHfgHvZLvTizKxN%2F4Ny7KGzCi0xRdQDRAffdCAREntDFIVLuLFDU2sz2v8Va6ykUI4YOHWvUfe8APQHnb2EYYG4RFSU9V6QpsJ%2B33JAURFDUA3QJTjpbZibLK6ymmDWaN6wmjlbKonQRRoRlyQg0OmG7Da7ncGHt6llKz%2BWcz8ADqGnfbOxgVVtSPXnFgG7mHAq90T8TjkTkSin5o1InJRBfw%3D%3D',
'https://sysco-us-east-1-prcp-dev-batch-output.s3.amazonaws.com/DevTest1_006_20200616_C.txt?AWSAccessKeyId=ASIAQRLXWZJ2BOMGUEEY&Expires=1606286144&Signature=aagsQa6IQEUcxompTubj%2F7ANoYQ%3D&response-content-disposition=attachment&x-amz-security-token=IQoJb3JpZ2luX2VjEGwaCXVzLWVhc3QtMSJHMEUCIQDhYEXP%2FRIkI%2Few7UGBio6GiswfkaE9y7kiKIOG%2Bp%2FF8wIgL0O1lO7DR3zP5qGZ6VLBnb%2Fdki%2Bnv9%2B17%2Fuub%2BbJONQqlgMI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwwMzcyOTUxNDc2MzYiDCQo%2F0l2j2C2tmbzxirqAs3BubpbWbKmGi%2BD7bVYvZ5%2BRTxHJB%2F8hYYgV4gvIQpj%2B8M8Zkms%2FKGpvw9cz50D0TnAwovRvg8J7yNRk3uSzx5J8BKk5F0RHfKB9JkD5dWZVQYxPaCfnxPgz%2Ftr11VYwB54JnZKRJ4MseGZpsNS2ka2ykH7u0%2BvvFFE11Xmel%2BwD%2Bj3FKXD%2FTPCMnIYirRV0aRaamJ8vjvOZOcq1NCl1MI%2BT91h3%2FPL04Y6AR497d%2B0UH4mYLiTbOBFLMTwIhlK4sD6wATuLnPfgiVCeuAwUko%2FEYbtkSMzgMPxFNhLD%2BTh4YYC7EdtpaHRtbTTSqo0QBSfE%2FpPL72aEd4hye7wlpWkav4BbNAQofWPr6voilBvcv%2Bmeyrnd%2BpfbFzrS5FSfm2n0p4vwr%2BPSB8aklM7tAWpP9MB7VEw8%2FYnM7PifXDK8VI9oeueRVhQk3UMidg%2BKKCKCjqshB1v1SmE%2BbWUdor%2FVwPWzEf6k0MWMN2s9%2F0FOqYBE8alS%2BHfgHvZLvTizKxN%2F4Ny7KGzCi0xRdQDRAffdCAREntDFIVLuLFDU2sz2v8Va6ykUI4YOHWvUfe8APQHnb2EYYG4RFSU9V6QpsJ%2B33JAURFDUA3QJTjpbZibLK6ymmDWaN6wmjlbKonQRRoRlyQg0OmG7Da7ncGHt6llKz%2BWcz8ADqGnfbOxgVVtSPXnFgG7mHAq90T8TjkTkSin5o1InJRBfw%3D%3D']




  //                       const link = document.createElement('a');
//                       link.href = "https://sysco-us-east-1-prcp-dev-batch-output.s3.amazonaws.com/C01C_066_000041_20201124_A.txt?AWSAccessKeyId=ASIAQRLXWZJ2LLLMGGFX&Expires=1606272121&Signature=25Vfm7wMDh4IczxVkqgL7oWPX74%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEGgaCXVzLWVhc3QtMSJHMEUCIFG%2BBchlV48bGulCYeJqUTa3NFr0I%2BIKFlcBQzHIurtFAiEAwrFJf9zcD0D5gDRse%2By0k%2FV9GmFHEWfFSP4b%2F6%2FvLTsqlgMI4f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwwMzcyOTUxNDc2MzYiDJ5Sj8JgC5EA%2BQjOpCrqAsdWZTqAyo7HvTtbFQmiOAhNizaOCCClV5dDuKzpyUCwqWjvWy4eWJPUnNUYKxPeaO%2FuYeBg%2BlfSVT8UNsKbLvKQNUtbDVQp4i1wu6%2FEqz2Yft1x6L2vuLtEYnmmJAOJEmAiFoYLoop8sU9hHt2ab1C4wkwkZfE2AvdFfgm9zQ3nEOy1meU9HUW0Wj8r4cbuZNmt2JaTrYkAPrNz1Tf8luSPZtLJxjPTTFsKQPcV51%2FsrHVOZoT0bo5wgK4Ap9dwY2BjSGm%2FDe9JI6doWMSEf2svfK3RtUtMKo34PQKx6V%2FE8Jm8qhpa24kSLPgqHww2qdzlD3oB31O32V0auAjp9kqz9aLE1L0BxAzDiXSPId7Ae4mZIJMJw7X1LRKf3nZQ729Dt%2FOk5qyZIHWbcZWcBmSYkpbWeI4OrbGYG0G0P18%2BVE6nvMYi5CbMqgDbIPmpW6XIQ%2BaPBMv6NXoNwbu6xF9KQbYf831oBfJGMOe79v0FOqYBZJsqnU9cvt%2BE3EAvfzGOqh%2F0iI8xnSy8lDDU%2Be1ewZ%2BANMpCG%2Fn6Z00D%2FV2Q%2Bpsr%2BKM7egs4hB7X7BaiyjirK3YOFbwbmhxN5CDaMLoKuogpLDDaQ0y%2BTvXZA4bPZl%2Fxg3x7cocCH%2F7pt2tBQVYzF%2BDv5Yo7yGB3%2F1mKbonM2H1mcmI2INOf8z9cI4mhaPbg1kg9BzovmJBf58kqdffF%2BfP%2BUqKddw%3D%3D";
//                       document.body.appendChild(link);
//                       link.click();


// const ar = ['https://sysco-us-east-1-prcp-dev-batch-output.s3.amazonaws.com/DevTest1_006_20200616_C.txt?AWSAccessKeyId=ASIAQRLXWZJ2BOMGUEEY&Expires=1606285119&Signature=XFhzgsWFb8CktJ8%2BQH4f3HwtPQ8%3D&response-content-disposition=attachment&x-amz-security-token=IQoJb3JpZ2luX2VjEGwaCXVzLWVhc3QtMSJHMEUCIQDhYEXP%2FRIkI%2Few7UGBio6GiswfkaE9y7kiKIOG%2Bp%2FF8wIgL0O1lO7DR3zP5qGZ6VLBnb%2Fdki%2Bnv9%2B17%2Fuub%2BbJONQqlgMI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwwMzcyOTUxNDc2MzYiDCQo%2F0l2j2C2tmbzxirqAs3BubpbWbKmGi%2BD7bVYvZ5%2BRTxHJB%2F8hYYgV4gvIQpj%2B8M8Zkms%2FKGpvw9cz50D0TnAwovRvg8J7yNRk3uSzx5J8BKk5F0RHfKB9JkD5dWZVQYxPaCfnxPgz%2Ftr11VYwB54JnZKRJ4MseGZpsNS2ka2ykH7u0%2BvvFFE11Xmel%2BwD%2Bj3FKXD%2FTPCMnIYirRV0aRaamJ8vjvOZOcq1NCl1MI%2BT91h3%2FPL04Y6AR497d%2B0UH4mYLiTbOBFLMTwIhlK4sD6wATuLnPfgiVCeuAwUko%2FEYbtkSMzgMPxFNhLD%2BTh4YYC7EdtpaHRtbTTSqo0QBSfE%2FpPL72aEd4hye7wlpWkav4BbNAQofWPr6voilBvcv%2Bmeyrnd%2BpfbFzrS5FSfm2n0p4vwr%2BPSB8aklM7tAWpP9MB7VEw8%2FYnM7PifXDK8VI9oeueRVhQk3UMidg%2BKKCKCjqshB1v1SmE%2BbWUdor%2FVwPWzEf6k0MWMN2s9%2F0FOqYBE8alS%2BHfgHvZLvTizKxN%2F4Ny7KGzCi0xRdQDRAffdCAREntDFIVLuLFDU2sz2v8Va6ykUI4YOHWvUfe8APQHnb2EYYG4RFSU9V6QpsJ%2B33JAURFDUA3QJTjpbZibLK6ymmDWaN6wmjlbKonQRRoRlyQg0OmG7Da7ncGHt6llKz%2BWcz8ADqGnfbOxgVVtSPXnFgG7mHAq90T8TjkTkSin5o1InJRBfw%3D%3D',
// 'https://sysco-us-east-1-prcp-dev-batch-output.s3.amazonaws.com/C01C_066_000041_20201124_A.txt?AWSAccessKeyId=ASIAQRLXWZJ2BOMGUEEY&Expires=1606285119&Signature=MhxTHjOvTwfgwHsbWSpZadDbLk0%3D&response-content-disposition=attachment&x-amz-security-token=IQoJb3JpZ2luX2VjEGwaCXVzLWVhc3QtMSJHMEUCIQDhYEXP%2FRIkI%2Few7UGBio6GiswfkaE9y7kiKIOG%2Bp%2FF8wIgL0O1lO7DR3zP5qGZ6VLBnb%2Fdki%2Bnv9%2B17%2Fuub%2BbJONQqlgMI5f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwwMzcyOTUxNDc2MzYiDCQo%2F0l2j2C2tmbzxirqAs3BubpbWbKmGi%2BD7bVYvZ5%2BRTxHJB%2F8hYYgV4gvIQpj%2B8M8Zkms%2FKGpvw9cz50D0TnAwovRvg8J7yNRk3uSzx5J8BKk5F0RHfKB9JkD5dWZVQYxPaCfnxPgz%2Ftr11VYwB54JnZKRJ4MseGZpsNS2ka2ykH7u0%2BvvFFE11Xmel%2BwD%2Bj3FKXD%2FTPCMnIYirRV0aRaamJ8vjvOZOcq1NCl1MI%2BT91h3%2FPL04Y6AR497d%2B0UH4mYLiTbOBFLMTwIhlK4sD6wATuLnPfgiVCeuAwUko%2FEYbtkSMzgMPxFNhLD%2BTh4YYC7EdtpaHRtbTTSqo0QBSfE%2FpPL72aEd4hye7wlpWkav4BbNAQofWPr6voilBvcv%2Bmeyrnd%2BpfbFzrS5FSfm2n0p4vwr%2BPSB8aklM7tAWpP9MB7VEw8%2FYnM7PifXDK8VI9oeueRVhQk3UMidg%2BKKCKCjqshB1v1SmE%2BbWUdor%2FVwPWzEf6k0MWMN2s9%2F0FOqYBE8alS%2BHfgHvZLvTizKxN%2F4Ny7KGzCi0xRdQDRAffdCAREntDFIVLuLFDU2sz2v8Va6ykUI4YOHWvUfe8APQHnb2EYYG4RFSU9V6QpsJ%2B33JAURFDUA3QJTjpbZibLK6ymmDWaN6wmjlbKonQRRoRlyQg0OmG7Da7ncGHt6llKz%2BWcz8ADqGnfbOxgVVtSPXnFgG7mHAq90T8TjkTkSin5o1InJRBfw%3D%3D']
//
//
//   ar.forEach(url => {
//     console.log('looping thru', url)
//     const link = document.createElement('a');
//     link.href = url
//     document.body.appendChild(link);
//     link.click();
//   })


};

const downloadFromSignedUrl = (fileNameUrlArray) => {
  console.log('from signed', fileNameUrlArray)
  fileNameUrlArray.forEach(({fileName, readUrl}) => {
    console.log('filename', fileName)
    console.log('readUrl', readUrl)
    fetch(readUrl)
        .then(response => {
          console.log(response)
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(response => response.blob())
        .then(blob => URL.createObjectURL(blob))
        .then(uril => {
          console.log(uril)
          let link = document.createElement("a");
          link.href = uril;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.log(error);
        });

  });
}

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      data: [],
      dataIsReturned : false
    };
  }

  loadDataFiles = () => {
    this.setState({
      dataIsReturned : false
    })
    fileListRequestHandler().then((res) => {
      if(res.success) {
        this.setState({
          data: res.data,
          dataIsReturned : true
        })
      }
    });
  }

  componentDidMount() {
    this.loadDataFiles();
  }

  start = () => {
    this.setState({loading: true});
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const {loading, selectedRowKeys, data, dataIsReturned} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div className="file-list">
          <div className="panel-header">
            <div className="title">
              <i className="icon fi flaticon-history"/>
              File List
            </div>
            <Search
                placeholder="Search"
                className="search-list"
                // loading
            />
            <div className="spacer"></div>
            <div className="selected-item-status">
              <p>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
              </p>
              {hasSelected && (
                  <Button
                      type="primary"
                      className="btn green-action-btn rounded download-btn"
                      onClick={this.start}
                      disabled={!hasSelected}
                      loading={loading}
                      scroll={{x: 'auto', y: 300}}>
                    <i className="icon fi flaticon-download"/> Download Selected
                  </Button>
              )}
            </div>
            <Button
                type="link"
                className="refresh-btn"
                onClick={this.loadDataFiles}
            >
              <i className="icon fi flaticon-refresh-1"/> Refresh
            </Button>
          </div>
          <div className="file-list-table-wrapper">
            {dataIsReturned ?
              <Table
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  scroll={{x: 'auto', y: '60vh'}}
              />
              : <Table loading={!dataIsReturned}/>}
          </div>
        </div>
    );
  }
}

export default FileList;
