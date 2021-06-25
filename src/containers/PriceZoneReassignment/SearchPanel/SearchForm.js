import React, {useContext, useState, useEffect} from 'react';
import {Form, Input, Select, Radio} from 'antd';

import {UserDetailContext} from '../../UserDetailContext';
import {PZRContext} from '../PZRContext';

import {getBusinessUnits, getAttributeGroups} from '../PZRHelper';
import {PZRFetchSearchResults} from '../PZRSearchHandler';
import {getBffUrlConfig} from '../../../utils/Configs';

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
    const { userDetails: { allowedBussinessUnitMap = new Map()}} = userDetailContext.userDetailsData;
    const pZRContext = useContext(PZRContext);
    const [form] = Form.useForm();

    const handleGetAttributeGroupResponse = (response) => {
        return response.json().then((respBody) => {
            console.log(respBody);
            if (!respBody || !respBody.attribute_groups) {
                //TODO Handle failure here
            } else {
                setAttributeGroups(getAttributeGroups(respBody.attribute_groups));
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

    const handleChangeCustomer = (event) => {
        setCustomerTextBoxValue(event.target.value);
    };

    const handleChangeCustomerGroup = (event) => {
        setCustomerGroupTextBoxValue(event.target.value);
    };

    const onSubmit = (values) => {
        console.log(values);
        pZRContext.setResponse(null);
        const opcoId = ((values.opco).split('-'))[0];
        const attributeGroupDetails = (values.attributeGroup).split('-');
        const searchParams = {
            site: values.opco,
            opcoId,
            attributeGroupId: attributeGroupDetails[0],
            customer: values.customer ? values.customer : null,
            customerGroup: values.customerGroup ? values.customerGroup : null,
            attributeGroup: attributeGroupDetails[1]
        };
        pZRContext.setSearchParams(searchParams);
        PZRFetchSearchResults(searchParams, pZRContext);
    };

    useEffect(() => {
        getAttributeGroupDataFromBff(); //TODO: Handle failure
    }, []);

    return (
        <div>
            <>
                <div className="panel-header">
                    <i className="icon fi flaticon-list"/>
                    Search
                </div>
                <div className="search-form">
                    <Form
                        name="nest-messages"
                        form={form}
                        validateMessages={validateMessages}
                        onFinish={(value) => onSubmit(value)}
                    >
                        <Form.Item
                            name="opco"
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
                                {getBusinessUnits(allowedBussinessUnitMap)}
                            </Select>
                        </Form.Item>
                        <div className="pz-customer-groupbox">
                            <div className="pz-radio">
                                <Radio.Group
                                    defaultValue={2}>
                                    <Radio value={1} onClick={() => {
                                        setCustomerChecked(true);
                                        setCustomerGroupTextBoxValue('');
                                    }}></Radio>
                                    <Radio value={2} onClick={() => {
                                        setCustomerChecked(false);
                                        setCustomerTextBoxValue('');
                                    }}></Radio>
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
                                <Form.Item name="customer">
                                    <>
                                        <Input disabled={!isCustomerChecked} value={customerTextboxValue}
                                               onChange={handleChangeCustomer}/>
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
                                        <Input disabled={isCustomerChecked} value={customerGroupTextboxValue}
                                               onChange={handleChangeCustomerGroup}/>
                                    </>
                                </Form.Item>
                            </Form.Item>
                        </div>
                        <Form.Item
                            name="attributeGroup"
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
