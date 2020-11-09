import React, { useContext } from 'react';
import moment from 'moment';
import {
 Form, Input, Checkbox, Select, InputNumber, DatePicker
} from 'antd';
import { PriceValidationContext } from '../PriceValidationContext';
import { UserDetailContext } from '../../UserDetailContext';
import { getBusinessUnits } from '../PricingHelper';
import {getBffUrlConfig} from '../../../utils/Configs';
import b from '../../../constants/BusinessUnits';

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

const initialValues = {quantity: 1, date: moment(), split: false};

const formRequestBody = (requestData) => JSON.stringify({
        businessUnitNumber: requestData.site,
        customerAccount: requestData.customer,
        priceRequestDate: requestData.date.format('YYYYMMDD'),
        requestedQuantity: requestData.quantity,
        product:
            {
                supc: `${requestData.supc}`,
                splitFlag: !!requestData.split
            }

    });

const SearchForm = () => {
    const priceValidationContext = useContext(PriceValidationContext);
    const userDetailContext = useContext(UserDetailContext);
    const { userDetails: { businessUnitMap = new Map() } } = userDetailContext.userDetailsData;

    const handleResponse = (response) => response.json()
            .then((json) => {
              if (response.ok) {
                return { success: true, data: json };
              }
              return { success: false, data: json };
            });

  const priceRequestHandler = (requestData) => {
      fetch(getBffUrlConfig().priceDataEndpoint, {
          method: 'POST',
          body: formRequestBody(requestData),
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          credentials: 'include'
      })
          .then(handleResponse)
          .then((resp) => {
              if (resp.success) {
                  priceValidationContext.setPriceData(resp.data);
              } else {
                  priceValidationContext.setErrorData(resp.data);
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

  return (
    <>
      <div className="panel-header">
        <i className="icon fi flaticon-list"/>
        Search
      </div>
      <div className="search-form">
        <Form
            name="nest-messages"
            onFinish={onSubmit}
            validateMessages={validateMessages}
            initialValues={initialValues}
        >
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
              filterOption={(inputValue, option) => {
                if (inputValue && option.children) {
                  // unless the backslash is escaped, this will end up with a syntax error
                  const pattern = inputValue.replace(/\\/g, '').toLowerCase();
                  if (inputValue.length !== pattern.length || inputValue.match(/[^A-Za-z0-9 -]/)) {
                    return false;
                  }
                  return option.children.join('').toLowerCase().match(pattern);
                }
                return true;
              }}
              showSearch
            >
              {getBusinessUnits(b)}
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
            <Input/>
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
            <Input/>
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
            <InputNumber
                min={1}
                formatter={(value) => (value && !isNaN(value) ? Math.round(value) : value)}
            />
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
