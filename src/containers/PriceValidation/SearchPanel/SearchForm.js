import React, { useContext } from "react";
import moment from 'moment';
import { Form, Input, Checkbox, Select, InputNumber, DatePicker } from "antd";
import businessUnits from "../../../constants/BusinessUnits";
import { PriceValidationContext } from '../PriceValidationContext'
import temp from './../../../reducers/temp'
import {getBffUrlConfig} from "../../../utils/Configs";

const { Option } = Select;
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const getBusinessUnits = () => {
  const businessUnitOptions = [];
  businessUnits.forEach((businessUnit => {
    businessUnitOptions.push(
        <Option value={businessUnit.id}>{businessUnit.id} - {businessUnit.shortName}</Option>
    )
  }));

  return businessUnitOptions;
};

const formRequestBody = (requestData) => {
    return JSON.stringify({
        businessUnitNumber: requestData.site,
        customerAccount: requestData.customer,
        priceRequestDate: requestData.date.format("YYYYMMDD"),
        requestedQuantity: requestData.quantity,
        product:
            {
                supc: `${requestData.supc}`,
                splitFlag: !!requestData.split
            }

    });
};

const SearchForm = () => {
    const priceValidationContext = useContext(PriceValidationContext);

    const onSubmit = (values) => {
        priceValidationContext.setIsLoading(true);
        priceValidationContext.setResponse(null);
        // priceValidationContext.setPriceData({ ...priceValidationContext.priceData, error: null, requestParams: values, response: null });
        console.log(values);
        return priceRequestHandler(values);
  };

    const handleResponse = (response) => {
        return response.json()
            .then((json) => {
                if (response.ok) {
                    return {success: true, data: json};
                } else {
                    return {success: false, data: json}
                }
            })
    };

    // TODO: @sanjayaa remove temp response usage
  const priceRequestHandler = (requestData) => {
      fetch(getBffUrlConfig().priceDataEndpoint, {
          method: 'POST',
          body: formRequestBody(requestData),
          headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'no-cors'
      })
          .then(handleResponse)
          .then( resp => {
              if (resp.success) {
                  console.log("Response body", resp.data);
                  priceValidationContext.setPriceData(resp.data);
                  // priceValidationContext.setPriceData(temp);
              } else {
                  //
                  console.error("Found error", resp);
                  priceValidationContext.setErrorData(resp.data);
                  // priceValidationContext.setPriceData(temp);
              }

              return null;
          })
          .catch((e) => {
              console.error("Found error 2", e);
              priceValidationContext.setErrorData(e);
              // priceValidationContext.setPriceData(temp);
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
            name="nest-messages"
            onFinish={onSubmit}
            validateMessages={validateMessages}
            initialValues={{quantity:10, site:'019', supc: '3183792', customer: '622548', date: moment(), split: false}}
        >
          <Form.Item
              name="site"
              label="Site"
              rules={[
                {
                  required: true,
                },
              ]}>
            <Select placeholder="Select Site">
              {getBusinessUnits()}
            </Select>
          </Form.Item>
          <Form.Item
              name="customer"
              label="Customer"
              rules={[
                  {
                      pattern: '^[a-zA-Z0-9]+$',
                      message: "Not a valid Customer ID"
                  },
                  {
                      required: true,
                  },
              ]}>
            <Input/>
          </Form.Item>
          <Form.Item
              name="supc"
              label="Item #"
              rules={[
                  {
                      pattern: '^[0-9]+$',
                      message: "Not a valid Item ID"
                  },
                  {
                      required: true,
                  },
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
              rules={[
                  () => ({
                      validator(rule, value) {
                          if (value && !isNaN(value) && 1 <= value && value <= 1000) {
                              return Promise.resolve();
                          }
                          return Promise.reject('Quantity must be a valid number between 1 and 1000');
                      },
                  })
              ]}>
            <InputNumber
                formatter={(value) => {
                    return isNaN(value) ? value : Math.round(value);
                }}
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
