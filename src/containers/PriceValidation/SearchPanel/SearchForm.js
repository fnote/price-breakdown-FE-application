import React from "react";
import { Form, Input, Checkbox, Select, InputNumber, DatePicker } from "antd";

const { Option } = Select;
const validateMessages = {
  required: "${label} is required!",
  types: {
    number: "${label} is not a validate number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function SearchForm() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <div className="panel-header">
        <i className="icon fi flaticon-list" />
        Search
      </div>
      <div className="search-form">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}>
          <Form.Item
            name="site"
            label="Site"
            rules={[
              {
                required: true,
              },
            ]}>
            <Select placeholder="Select Site">
              <Option value="067 - Philadelphia">067 - Philadelphia</Option>
              <Option value="054 - New York">054 - New York</Option>
            </Select>
          </Form.Item>
          <Form.Item name="customer" label="Customer">
            <Input />
          </Form.Item>
          <Form.Item name="itemnum" label="Item #">
            <Input />
          </Form.Item>
          <Form.Item name="date" label="Date">
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="quantity"
            label="Quantity"
            rules={[
              {
                type: "number",
                min: 1,
                max: 1000,
              },
            ]}>
            <InputNumber defaultValue="1" />
          </Form.Item>

          <Form.Item name="split" label="Split">
            <Checkbox />
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
