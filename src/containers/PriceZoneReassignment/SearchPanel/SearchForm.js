import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { getBusinessUnits } from '../PriceZoneReassignmentHelper';
import { UserDetailContext } from '../../UserDetailContext';
import { getBffUrlConfig } from '../../../utils/Configs';
import { PZRContext } from '../PZRContext';
import {
  CORRELATION_ID_HEADER,
  NOT_APPLICABLE_LABEL,
} from '../../../constants/Constants';

const { Option } = Select;

const formRequestBody = (includeCustomer, requestData) => {
  if (includeCustomer) {
    return JSON.stringify({
      businessUnitNumber: requestData.OpCo,
      itemAttributeGroupId: (requestData.Itemgroup).toString(),
      customerAccount: requestData.customer,
      offset: 0,
      limit: 10,
      });
  } 
  return JSON.stringify({
  businessUnitNumber: requestData.OpCo,
  itemAttributeGroupId: (requestData.Itemgroup).toString(),
  customerGroupId: requestData.customerGroup,
  offset: 0,
  limit: 10,
  });
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}!',
  },
};

const SearchForm = () => {
  const [isCustomerChecked, setCustomerChecked] = useState(false);
  const [customerTextboxValue, setCustomerTextBoxValue] = useState('');
  const [customerGroupTextboxValue, setCustomerGroupTextBoxValue] = useState('');
  const [attributeGroups, setAttributeGroups] = useState('');
  const userDetailContext = useContext(UserDetailContext);
  const { userDetails: { businessUnitMap = new Map() } } = userDetailContext.userDetailsData;
  const pZRContext = useContext(PZRContext);
  const [form] = Form.useForm();

  const handleResponse = (response) => {
    const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
    return response.json().then((json) => {
      if (response.ok) {
        return { success: true, data: json, headers: { [CORRELATION_ID_HEADER]: correlationId } };
      }
      return { success: false, data: json, headers: { [CORRELATION_ID_HEADER]: correlationId } };
    });
  };

  const handleGetAttributeGroupResponse = (response) => {
    const attrributeGroupList = [];
    return response.json().then((json) => {
      const responseData = json.attribute_groups;
      if (response.ok && responseData) {
        responseData.forEach((attributeGroup) => {
          attrributeGroupList.push(
            <Option key={attributeGroup.id} value={attributeGroup.id}>{attributeGroup.name}</Option>
          );
        });
        setAttributeGroups(attrributeGroupList);
      }
    });
  };

  const getAttributeGroupDataFromBff = () => fetch(getBffUrlConfig().priceZoneReassignmentGetItemAttributeUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  }).then(handleGetAttributeGroupResponse);

  const priceZoneReassignmentRequestHandler = (includeCustomer, requestData) => {
    fetch(getBffUrlConfig().priceZoneReassignmentSearchUrl, {
      method: 'POST',
      body: formRequestBody(includeCustomer, requestData),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
      .then(handleResponse)
      .then((resp) => {
        if (resp.success) {
          pZRContext.setSearchResults({ ...resp.data, correlationId: resp.headers[CORRELATION_ID_HEADER] });
        } else {
          pZRContext.setErrorData({ ...resp.data, correlationId: resp.headers[CORRELATION_ID_HEADER] });
        }
        return null;
      })
      .catch((e) => {
        pZRContext.setErrorData(e);
      });
  };

  const handleChangeCustomer = (event) => {
    setCustomerTextBoxValue(event.target.value);
  };

  const handleChangeCustomerGroup = (event) => {
    setCustomerGroupTextBoxValue(event.target.value);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onSubmit = (includeCustomer, values) => {
    pZRContext.setLoading(true);
    pZRContext.setResponse(null);
    if (includeCustomer) {
      pZRContext.setSearchParams({
        searchParams: {
          site: values.OpCo,
          opcoId: '',
          attributeGroupId: '',
          customer: values.customer,
          customerGroup: '',
          attributeGroup: (values.Itemgroup).toString()
        }
      });
    } else {
      pZRContext.setSearchParams({
        searchParams: {
          site: values.OpCo,
          opcoId: '',
          attributeGroupId: '',
          customer: '',
          customerGroup: values.customerGroup,
          attributeGroup: (values.Itemgroup).toString()
        }
      });
    }
    priceZoneReassignmentRequestHandler(includeCustomer, values);
    setCustomerGroupTextBoxValue('');
    setCustomerTextBoxValue('');
    onReset();
  };

  useEffect(() => {
    getAttributeGroupDataFromBff();
  }, []);

  return (
    <div>
      <>
        <div className="panel-header">
          <i className="icon fi flaticon-list" />
          Search
        </div>
        <div className="search-form">
          <Form
            name="nest-messages"
            form={form}
            validateMessages={validateMessages}
            onFinish={(value) => onSubmit(isCustomerChecked, value)}
          >
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
                {getBusinessUnits(businessUnitMap)}
              </Select>
            </Form.Item>
            <div className="pz-customer-groupbox">
              <div className="pz-radio">
                <Radio.Group 
                  defaultValue={2}>
                  <Radio value={1} onClick={() => {
                    setCustomerChecked(true);
                    setCustomerGroupTextBoxValue('');
                  }} ></Radio>
                  <Radio value={2} onClick={() => {
                    setCustomerChecked(false);
                    setCustomerTextBoxValue('');
                  }} ></Radio>
                </Radio.Group>
              </div>
              <Form.Item
                name="customer"
                label="Customer"
                className="pz-linebreak pz-linebreak-item-group"
                rules={[
                  {
                      pattern: '^[a-zA-Z0-9]+$',
                      message: 'Not a valid Customer ID'
                  },
                  {
                    required: isCustomerChecked === true,
                    message: 'Customer or Customer Group is required!'
                  },
                  {
                      max: 14,
                      message: 'Should be 14 characters max'
                  }]} 
              >
                <Form.Item name="customer" >
                  <>
                    <Input disabled={!isCustomerChecked} value={customerTextboxValue} onChange={handleChangeCustomer} />
                  </>
                </Form.Item>
              </Form.Item>
              <Form.Item
                name="customerGroup"
                label="Customer group"
                className="pz-linebreak pz-linebreak-item-group"
                rules={[
                  {
                      pattern: '^[a-zA-Z0-9]+$',
                      message: 'Not a valid Customer Group ID'
                  },
                  {
                    required: isCustomerChecked === false,
                    message: 'Customer or Customer Group is required!'
                  },
                  {
                      max: 15,
                      message: 'Should be 15 characters max'
                  }]} 
                >
                <Form.Item name="customerGroup">
                  <>
                    <Input disabled={isCustomerChecked} value={customerGroupTextboxValue} onChange={handleChangeCustomerGroup} />
                  </>
                </Form.Item>
              </Form.Item>
            </div>
            <Form.Item
              name="Itemgroup"
              label="Attribute group"
              className="pz-linebreak pz-linebreak-item-group"
              rules={[{required: true}]}
            >
              <Select
                dropdownMatchSelectWidth={false}
                optionFilterProp="children"
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                showSearch
              >
                {attributeGroups}
              </Select>
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
};

export default SearchForm;
