import React from "react";
import { Form, Input, Checkbox, Select, InputNumber, DatePicker } from "antd";
import businessUnits from "../../../constants/BusinessUnits";

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

function getBusinessUnits() {
  const businessUnitOptions = [];
  businessUnits.forEach((businessUnit => {
    businessUnitOptions.push(
        <Option value={businessUnit.id}>{businessUnit.id} - {businessUnit.name}</Option>
    )
  }));

  return businessUnitOptions;
}

function SearchForm() {
  const onFinish = (values) => {
    console.log(values);
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
            onFinish={onFinish}
            validateMessages={validateMessages}
            initialValues={{quantity:1}}
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
                      required: true,
                  },
                  {
                      whitespace: true,
                      message: "Customer cannot be empty"
                  },
              ]}>
            <Input/>
          </Form.Item>
          <Form.Item
              name="itemnum"
              label="Item #"
              rules={[
                  {
                      type: "number",
                      message : "Not a valid number"
                  },
                  {
                    required: true
                  }
              ]}
          >
            <InputNumber/>
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
            <InputNumber defaultValue="1"/>
          </Form.Item>

          <Form.Item name="split" label="Split">
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
}

export default SearchForm;
