import React, {useContext} from 'react';
import moment from 'moment';
import {Checkbox, DatePicker, Form, Input, Select} from 'antd';
import {PriceValidationContext} from '../PriceValidationContext';
import {UserDetailContext} from '../../UserDetailContext';
import {RequestContext} from '../../RequestContext';
import {getBusinessUnits, setInitialValues} from '../PricingHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import {formatNumberInput} from '../../../utils/CommonUtils';
import {
    CLOUD_PCI_DATE_FORMAT,
    CORRELATION_ID_HEADER,
    DEFAULT_REQUEST_HEADER,
    EMPTY_STRING,
    MAX_VALUE_ALLOWED_FOR_HAND_PRICE_INPUT,
    NOT_APPLICABLE_LABEL,
    ORDER_PRICE_TYPE_HAND,
    PRICE_VALIDATION_REQUEST
} from '../../../constants/Constants';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export const filterOption = (inputValue, option) => {
    if (inputValue && option.children) {
        // unless the backslash is escaped, this will end up with a syntax error
        const pattern = inputValue.replace(/\\/g, EMPTY_STRING).toLowerCase();
        if (inputValue.length !== pattern.length || inputValue.match(/[^A-Za-z0-9 -]/)) {
            return false;
        }
        return option.children.join(EMPTY_STRING).toLowerCase().match(pattern);
    }
    return true;
};

const formRequestBody = (requestData) => {
    const product = {
        supc: `${requestData.supc}`,
        splitFlag: !!requestData.split
    };

    if (requestData.handPrice) {
        const orderPriceNumericalValue = Number(requestData.handPrice);
        if (orderPriceNumericalValue > 0) {
        product.orderPrice = `${orderPriceNumericalValue}`;
        product.orderPriceType = ORDER_PRICE_TYPE_HAND;
      }
    }

    return JSON.stringify({
        businessUnitNumber: requestData.site,
        customerAccount: requestData.customer,
        priceRequestDate: requestData.date.format(CLOUD_PCI_DATE_FORMAT),
        requestedQuantity: requestData.quantity,
        product,
    });
};

const SearchForm = () => {
    const [form] = Form.useForm();
    const priceValidationContext = useContext(PriceValidationContext);
    const userDetailContext = useContext(UserDetailContext);
    const requestContext = useContext(RequestContext);
    const { userDetails: { businessUnitMap = new Map() } } = userDetailContext.userDetailsData;
    const bUnitMap = getBusinessUnits(businessUnitMap);
    const initialValues = setInitialValues(requestContext);
  const handleResponse = (response) => {
    const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
    return response.json().then((json) => {
      if (response.ok) {
        return { success: true, data: json, headers: { [CORRELATION_ID_HEADER]: correlationId } };
      }
      return { success: false, data: json, headers: { [CORRELATION_ID_HEADER]: correlationId } };
    });
  };

  const priceRequestHandler = (requestData) => {
      const requestBody = formRequestBody(requestData);
      const requestType = PRICE_VALIDATION_REQUEST;
      const requestContextData = {requestData, requestType};
      requestContext.setRequestData(requestContextData);
      fetch(getBffUrlConfig().priceDataEndpoint, {
          method: 'POST',
          body: requestBody,
          headers: DEFAULT_REQUEST_HEADER,
          credentials: 'include'
      })
          .then(handleResponse)
          .then((resp) => {
              if (resp.success) {
                priceValidationContext.setPriceData({ ...resp.data, correlationId: resp.headers[CORRELATION_ID_HEADER] });
              } else {
                priceValidationContext.setErrorData({ ...resp.data, correlationId: resp.headers[CORRELATION_ID_HEADER] });
              }

              return null;
          })
          .catch((e) => {
              priceValidationContext.setErrorData(e);
          });
  };

  const onSubmit = (values) => {
    priceValidationContext.setIsLoading(true);
    priceValidationContext.setResponse(null);
    return priceRequestHandler(values);
  };

    const onReset = () => {
        form.setFieldsValue({
            site: EMPTY_STRING,
            customer: EMPTY_STRING,
            supc: EMPTY_STRING,
            quantity: 1,
            date: moment(),
            split: false,
            handPrice: EMPTY_STRING,
        });
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
            {/* <Form.Item className="search-refresh-btn-wrapper">
                <button
                    type="reset"
                    className="search-refresh-btn refresh-outlined-btn" >
                    <i className="icon fi flaticon-refresh"/> clear
                </button>
            </Form.Item> */}

            <Form.Item name="reset" className="pv-reset-base" label="&nbsp;">
                <div className="pv-reset-base">
                    <button
                        type="reset"
                        className="search-refresh-btn refresh-outlined-btn pv-refresh-button">
                        <i className="icon fi flaticon-refresh pv-refresh-icon"/> CLEAR
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
                ]}>
                <Select
                    placeholder="Select Site"
                    dropdownMatchSelectWidth={false}
                    filterOption={filterOption}
                    showSearch
            >
              {bUnitMap}
            </Select>
          </Form.Item>
          <Form.Item
              name="customer"
              label="Customer"
              rules={[
                  {
                      pattern: '^[a-zA-Z0-9]+$',
                      message: 'Not a valid Customer ID'
                  },
                  {
                      required: true,
                  },
                  {
                      max: 14,
                      message: 'Should be 14 characters max'
                  }
              ]}>
            <Input allowClear/>
          </Form.Item>
          <Form.Item
              name="supc"
              label="Item #"
              rules={[
                  {
                      pattern: '^[0-9]+$',
                      message: 'Not a valid Item ID'
                  },
                  {
                      required: true,
                  },
                  {
                      max: 9,
                      message: 'Should be 9 characters max'
                  }
              ]}
          >
            <Input allowClear/>
          </Form.Item>
          <Form.Item
              name="date"
              label="Date"
              rules={[
                  {
                    required: true,
                  },
              ]}>
            <DatePicker/>
          </Form.Item>
          <Form.Item
              name="quantity"
              label="Quantity"
              normalize= {(value) => (value && !isNaN(value) ? Math.round(value) : value)}
              min="1"
              rules={[
                  () => ({
                      validator(rule, value) {
                          if (value && !isNaN(value) && value >= 1 && value <= 1000) {
                              return Promise.resolve();
                          }
                          return Promise.reject(new Error('Quantity must be a valid number between 1 and 1000'));
                      },
                  })
              ]}>
            <Input
                min={1}
            />
          </Form.Item>

            <Form.Item
                name="handPrice"
                label="Hand Price"
                normalize= {(value) => formatNumberInput(value)}
                rules={[
                    () => ({
                        validator(rule, value) {
                            if (value) {
                                if (!isNaN(value) && value >= 0) {
                                  if (value > MAX_VALUE_ALLOWED_FOR_HAND_PRICE_INPUT) {
                                    return Promise.reject(new Error(`Hand price must not be greater than ${MAX_VALUE_ALLOWED_FOR_HAND_PRICE_INPUT}`));
                                  }
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Hand price must be a valid non-negative number'));
                            }
                            return Promise.resolve();
                        },
                    })
                ]}
            >
                <Input/>
            </Form.Item>

          <Form.Item name="split" label="Split" valuePropName="checked">
            <Checkbox/>
          </Form.Item>
          <Form.Item className="search-btn-wrapper">
            <button
                type="primary"
                htmlType="submit"
                className="search-btn outlined-btn">
              Search
            </button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SearchForm;
