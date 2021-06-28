import React from "react";
import { Form, Input, Checkbox, Select, Radio, DatePicker } from "antd";

export default function SearchForm() {
  return (
    <div>
      <>
        <div className="panel-header">
          <i className="icon fi flaticon-list" />
          Search
        </div>
        <div className="search-form">
          <Form name="nest-messages">
            <Form.Item
              name="OpCo"
              label="OpCo"
              className="pz-linebreak pz-linebreak-item-group"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Site"
                dropdownMatchSelectWidth={false}
                showSearch
              ></Select>
            </Form.Item>
            <div className="pz-customer-groupbox">
              <div className="pz-radio">
                <Radio.Group>
                  <Radio value={1}></Radio>
                  <Radio value={2}></Radio>
                </Radio.Group>
              </div>
              <Form.Item name="customer" label="Customer"   className="pz-linebreak pz-linebreak-item-group">
                <Input />
              </Form.Item>

                <Form.Item
                  name="customerGroup"
                  label="Customer group"
                  className="pz-linebreak pz-linebreak-item-group"
                >
                  <Input />
                </Form.Item>

            </div>
            <Form.Item
              name="Itemgroup"
              label="Attribute group"
              className="pz-linebreak pz-linebreak-item-group"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select item group"
                dropdownMatchSelectWidth={false}
                showSearch
              ></Select>
            </Form.Item>
            <Form.Item className="search-btn-wrapper">
              <button
                type="primary"
                htmlType="submit"
                className="search-btn outlined-btn"
              >
                Search
              </button>
            </Form.Item>
          </Form>
        </div>
      </>
    </div>
  );
}
