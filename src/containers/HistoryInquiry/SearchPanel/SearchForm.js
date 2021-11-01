import React, {useContext} from 'react';
import {Checkbox, DatePicker, Form, Input, Select} from 'antd';
import {getBusinessUnits} from '../../PriceValidation/PricingHelper';
import {UserDetailContext} from '../../UserDetailContext';
import {getBffUrlConfig} from '../../../utils/Configs';
import {
    disabledDate,
    formRequestBody,
    rangeConfig,
    setHistoryInquiryInitialValues,
    validateMessages
} from '../HistoryInquiryHelper';
import {
    CORRELATION_ID_HEADER,
    DEFAULT_REQUEST_HEADER,
    EMPTY_STRING,
    HISTORY_INQUIRY_REQUEST,
    NOT_APPLICABLE_LABEL
} from '../../../constants/Constants';
import {HistoryInquiryContext} from '../HistoryInquiryContext';
import {RequestContext} from '../../RequestContext';

const {RangePicker} = DatePicker;

export const manipulateSites = (inputText, option) => {
    if (inputText && option.children) {
        // unless the backslash is escaped, this will end up with a syntax error
        const modifiedInput = inputText.replace(/\\/g, EMPTY_STRING).toLowerCase();
        if (inputText.length !== modifiedInput.length || inputText.match(/[^A-Za-z0-9 -]/)) {
            return false;
        }
        return option.children.join(EMPTY_STRING).toLowerCase().match(modifiedInput);
    }
    return true;
};

const SearchForm = () => {
    const [form] = Form.useForm();
    const historyInquiryContext = useContext(HistoryInquiryContext);
    const userDetailContext = useContext(UserDetailContext);
    const requestContext = useContext(RequestContext);
    const {userDetails: {businessUnitMap = new Map()}} = userDetailContext.userDetailsData;
    const bUnitMap = getBusinessUnits(businessUnitMap);
    const initialValues = setHistoryInquiryInitialValues(requestContext);

    const handleResponse = (response) => {
        const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
        return response.json().then((json) => {
            if (response.ok) {
                return {
                    success: true,
                    data: json,
                    headers: {[CORRELATION_ID_HEADER]: correlationId},
                };
            }
            return {
                success: false,
                data: json,
                headers: {[CORRELATION_ID_HEADER]: correlationId},
            };
        });
  };

  const historyInquiryRequestHandler = (requestData) => {
      const requestContextData = {requestData, HISTORY_INQUIRY_REQUEST};
      requestContext.setRequestData(requestContextData);
      fetch(getBffUrlConfig().historyInquiryEndpoint, {
          method: 'POST',
          body: formRequestBody(requestData),
          headers: DEFAULT_REQUEST_HEADER,
          credentials: 'include',
      })
          .then(handleResponse)
          .then((resp) => {
              if (resp.success) {
                  historyInquiryContext.setHistoryInquiryData({
                      ...resp.data,
                      correlationId: resp.headers[CORRELATION_ID_HEADER],
                  });
              } else {
                  historyInquiryContext.setErrorData({
                      ...resp.data,
            correlationId: resp.headers[CORRELATION_ID_HEADER],
          });
        }

        return null;
      })
      .catch((e) => {
        historyInquiryContext.setErrorData(e);
      });
  };

    const onReset = () => {
        form.setFieldsValue({
            site: EMPTY_STRING,
            supc: EMPTY_STRING,
            customer: EMPTY_STRING,
            split: false
        });
    };

  const onSubmit = (values) => {
    historyInquiryContext.setIsLoading(true);
    historyInquiryContext.setResponse(null);
    return historyInquiryRequestHandler(values);
  };

  return (
      <>
          <div className="panel-header">
              <i className="icon fi flaticon-list"/>
              Search
          </div>

          <div className="search-form">
              <Form
                  form={form}
                  name="nest-messages"
                  onFinish={onSubmit}
                  validateMessages={validateMessages}
                  initialValues={initialValues}
                  onReset={onReset}
              >
                  <Form.Item name="reset" className="history-reset-base" label="&nbsp;">
                      <div className="history-reset-base">
                          <button
                              type="reset"
                              className="search-refresh-btn refresh-outlined-btn history-refresh-button">
                              <i className="icon fi flaticon-refresh history-refresh-icon"/> CLEAR
                          </button>
                      </div>
                  </Form.Item>
                  <Form.Item
                      name="site"
                      label="Site"
                      rules={[
                          {
                              required: true,
                          },
                      ]}
                  >
                      <Select
                          placeholder="Select Site"
                          dropdownMatchSelectWidth={false}
                          filterOption={manipulateSites}
                          showSearch
            >
              {bUnitMap}
            </Select>
          </Form.Item>
          <Form.Item
              name="customer"
              label="Customer"
              type="search"
              rules={[
                  {
                      pattern: '^[a-zA-Z0-9]+$',
                      message: 'Not a valid Customer ID',
                  },
                  {
                      required: true,
                  },
                  {
                      max: 14,
                      message: 'Should be 14 characters max',
                  },
              ]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item
            name="supc"
            label="Item #"
            rules={[
                {
                    pattern: '^[0-9]+$',
                    message: 'Not a valid Item ID',
                },
                {
                    required: true,
                },
                {
                    max: 9,
                    message: 'Should be 9 characters max',
                },
            ]}
          >
            <Input allowClear/>
          </Form.Item>

          {/* new date fields */}

          <Form.Item
              name="rangeDate"
              label="Date"
              {...rangeConfig}
              rules={[
                {
                  required: false,
                },
              ]}>
              <RangePicker className="history-custom-range" dropdownClassName="history-custom-range-drop"
                 disabledDate={disabledDate}
              allowclear/>
          </Form.Item>
          <Form.Item name="split" label="Split" valuePropName="checked">
            <Checkbox/>
          </Form.Item>
          <Form.Item className="search-btn-wrapper">
            <button
                type="primary"
                htmlType="submit"
                className="search-btn outlined-btn history-search-button"
            >
              Search
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SearchForm;
