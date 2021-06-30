import React, {useContext, useState, useEffect} from 'react';
import {Form, Input, Select, Radio, notification} from 'antd';

import {UserDetailContext} from '../../UserDetailContext';
import {PZRContext} from '../PZRContext';

import {getBusinessUnits, getAttributeGroups} from '../PZRUtils/PZRHelper';
import {PZRFetchSearchResults} from '../PZRUtils/PZRSearchHandler';
import {getBffUrlConfig} from '../../../utils/Configs';
import {CORRELATION_ID_HEADER, NOT_APPLICABLE_LABEL} from '../../../constants/Constants';
import { HTTP_INTERNAL_SERVER_ERROR } from '../../../constants/Errors';

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
    const isCustomerCheckedInitState = false;
    const customerTextboxValueInitState = '';
    const customerGroupTextboxValueInitState = '';

    const [isCustomerChecked, setCustomerChecked] = useState(isCustomerCheckedInitState);
    const [customerTextboxValue, setCustomerTextBoxValue] = useState(customerTextboxValueInitState);
    const [customerGroupTextboxValue, setCustomerGroupTextBoxValue] = useState(customerGroupTextboxValueInitState);
    const [attributeGroups, setAttributeGroups] = useState('');
    const userDetailContext = useContext(UserDetailContext);
    const { userDetails: { allowedBussinessUnitMap = new Map()}} = userDetailContext.userDetailsData;
    const pZRContext = useContext(PZRContext);
    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, description, msg) => {
        notification[type]({
            message: msg,
            description,
        });
    };

    const handleGetAttributeGroupResponse = (response) => {
        const correlationId = response.headers.get(CORRELATION_ID_HEADER) || NOT_APPLICABLE_LABEL;
        return response.json().then((json) => {
            if (response.ok) {
                return {success: true, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}};
            }
            return {success: false, data: json, headers: {[CORRELATION_ID_HEADER]: correlationId}, httpStatus: response.status};
        });
    };

    const getAttributeGroupDataFromBff = () => fetch(getBffUrlConfig().priceZoneReassignmentGetItemAttributeUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }).then(handleGetAttributeGroupResponse)
    .then((resp) => {
        if (resp.success) {
            setAttributeGroups(getAttributeGroups(resp.data.attribute_groups));
            pZRContext.setErrorData(null);
        } else {
            pZRContext.setErrorData({...resp.data, correlationId: resp.headers[CORRELATION_ID_HEADER], httpStatus: resp.httpStatus});
        }
        return null;
    }).catch((e) => {
        pZRContext.setErrorData(e);
    });

    const handleChangeCustomer = (event) => {
        setCustomerTextBoxValue(event.target.value);
    };

    const handleChangeCustomerGroup = (event) => {
        setCustomerGroupTextBoxValue(event.target.value);
    };

    const onReset = () => {
        form.resetFields();
    };

    const restSearchForm = () => {
        form.resetFields();
        setCustomerGroupTextBoxValue(customerGroupTextboxValueInitState);
        setCustomerTextBoxValue(customerTextboxValueInitState);
        setCustomerChecked(isCustomerCheckedInitState);
    };

    const onSubmit = (values) => {
        console.log(values);
        pZRContext.setSearchResults(null);
        const customer = isCustomerChecked ? values.customer : null;
        const customerGroup = !isCustomerChecked ? values.customerGroup : null;
        const opcoId = ((values.opco).split('-'))[0];
        const attributeGroupDetails = (values.attributeGroup).split('-');
        const searchParams = {
            site: values.opco,
            opcoId,
            attributeGroupId: attributeGroupDetails[0],
            customer: customer ? values.customer : null,
            customerGroup: customerGroup ? values.customerGroup : null,
            attributeGroup: attributeGroupDetails[1]
        };
        pZRContext.setSearchLoading(true);
        pZRContext.setSearchParams(searchParams);
        pZRContext.setSearchResetFunc({resetForm: restSearchForm});
        PZRFetchSearchResults(searchParams, pZRContext);
    };

    useEffect(() => {
        getAttributeGroupDataFromBff(); // TODO: Handle failure
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
