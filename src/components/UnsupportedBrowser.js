import React from 'react';
import { Result, List , Row, Col} from 'antd';
import {
    SUPPORTED_WEB_BROWSERS,
    UNSUPPORTED_WEB_BROWSER
} from '../constants/Constants';

function _getSupportedBrowserList(browsers){
    const supportedBrowserList = []
    Object.entries(browsers).map(([key, value], i) =>{
        supportedBrowserList.push(
            key + " (Version "+value+" or newer)"
        );
    });
    return supportedBrowserList;
}

function _renderBrowserList(supportedBrowserList){
    return(
        <div>
            <List
                header = {UNSUPPORTED_WEB_BROWSER.infoMessage}
                bordered
                dataSource={supportedBrowserList}
                renderItem={item => (
                    <List.Item style={{ justifyContent: 'center', alignItems: 'center'}}>
                        {item}
                    </List.Item>
                )}
            />
        </div>
    )
}

function UnsupportedBrowser(props) {
    const {browserName, browserVersion, fullBrowserVersion} = props;
    const subtitle = "Your "+browserName+" web browser (version "+fullBrowserVersion+") is not compatible with Cloud PCI.";

    const supportedBrowsers = _renderBrowserList(_getSupportedBrowserList(SUPPORTED_WEB_BROWSERS));

    return (
            <Row style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'95%'}}>
                <Col>
                    <Result
                        status="warning"
                        title={UNSUPPORTED_WEB_BROWSER.headerMessage}
                        subTitle={subtitle}
                    />
                    {supportedBrowsers}
                </Col>
            </Row>
    );
}

export default UnsupportedBrowser;
