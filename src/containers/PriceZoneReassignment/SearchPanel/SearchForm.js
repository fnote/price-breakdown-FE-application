// Core
import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Radio, Select} from 'antd';
// Contexts
import {UserDetailContext} from '../../UserDetailContext';
import {PZRContext} from '../PZRContext';
// Handlers
import {fetchSearchResults} from '../handlers/PZRSearchHandler';
import {fetchAttributeGroups} from '../handlers/PZRAttributeGroupHandler';
// Constants, Configs and Helper functions
import {extractOpCoId, getBusinessUnits} from '../helper/PZRHelper';

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!', // NOSONAR
    types: {
        number: '${label} is not a valid number!', // NOSONAR
    },
    number: {
        range: '${label} must be between ${min} and ${max}!', // NOSONAR
    },
};

const SearchForm = () => {
    // Constants
    const isCustomerCheckedInitState = false;
    const customerTextboxValueInitState = '';
    const customerGroupTextboxValueInitState = '';
    // Context access
    const userDetailContext = useContext(UserDetailContext);
    const pZRContext = useContext(PZRContext);
    // States
    const [isCustomerChecked, setCustomerChecked] = useState(isCustomerCheckedInitState);
    const [customerTextboxValue, setCustomerTextBoxValue] = useState(customerTextboxValueInitState);
    const [customerGroupTextboxValue, setCustomerGroupTextBoxValue] = useState(customerGroupTextboxValueInitState);
    const [attributeGroups, setAttributeGroups] = useState('');
    const [isSearchDisabled, setSearchDisabled] = useState(true);

    const {userDetails: {activeBusinessUnitMap = new Map()}} = userDetailContext.userDetailsData;
    const [form] = Form.useForm();

    const handleChangeCustomer = (event) => {
        setCustomerTextBoxValue(event.target.value);
    };

    const handleChangeCustomerGroup = (event) => {
        setCustomerGroupTextBoxValue(event.target.value);
    };

    const restSearchForm = () => {
        form.resetFields();
        setCustomerGroupTextBoxValue(customerGroupTextboxValueInitState);
        setCustomerTextBoxValue(customerTextboxValueInitState);
        setCustomerChecked(isCustomerCheckedInitState);
    };

    const onSubmit = (values) => {
        pZRContext.setSearchResults(null);
        const customer = isCustomerChecked ? values.customer : null;
        const customerGroup = !isCustomerChecked ? values.customerGroup : null;
        const opcoId = extractOpCoId(values.site);
        const attributeGroupMap = attributeGroups.attributeGroupMap;
        const searchParams = {
            site: values.site,
            opcoId,
            attributeGroupId: values.attributeGroup,
            customer,
            customerGroup,
            attributeGroup: attributeGroupMap.get(values.attributeGroup),
        };
        pZRContext.setSearchLoading(true);
        pZRContext.setSearchParams(searchParams);
        pZRContext.setSearchResetFunc({resetForm: restSearchForm});
        fetchSearchResults(searchParams, pZRContext);
    };

    const getAttributeGroupsFromSeed = () => fetchAttributeGroups({
        userDetailContext,
        setAttributeGroups,
        setSearchDisabled
    });

    const onReset = () => {
        form.setFieldsValue({
            site: '',
            customer: '',
            customerGroup: '',
            attributeGroup: ''
        });
    };

    useEffect(() => {
        if (attributeGroups === '') {
            getAttributeGroupsFromSeed();
        }
    }, [getAttributeGroupsFromSeed]);

    return (
        <div className={pZRContext.isOnReviewPage ? 'pz-disabled' : ''}>
            <div className="panel-header">
                <i className="icon fi flaticon-list"/>
                Search
            </div>
            <div className="search-form pz-search-form">
                <Form
                    name="nest-messages"
                    form={form}
                    validateMessages={validateMessages}
                    onFinish={(value) => onSubmit(value)}
                    onReset={onReset}
                >
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
                        className="pz-linebreak pz-linebreak-item-group"
                        rules={[{required: true}]}
                    >
                        <Select
                            placeholder="Select Site"
                            dropdownMatchSelectWidth={false}
                            filterOption={(inputValue, option) => {
                                if (inputValue && option.children) {
                                    // unless the backslash is escaped, this will end up with a syntax error
                                    const pattern = inputValue.replace(/\\/g, '').toLowerCase();
                                    return (inputValue.length !== pattern.length || inputValue.match(/[^A-Za-z0-9 -]/) ? false
                                        : option.children.join('').toLowerCase().match(pattern));
                                }
                                return true;
                            }}
                            showSearch
                        >
                            {getBusinessUnits(activeBusinessUnitMap)}
                        </Select>
                    </Form.Item>
                    <div className="pz-customer-groupbox">
                        <div className="pz-radio">
                            <Radio.Group
                                value={isCustomerChecked ? 1 : 2}>
                                <Radio id="customer-radio-button" value={1} onClick={() => {
                                    setCustomerChecked(true);
                                    setCustomerGroupTextBoxValue('');
                                    form.resetFields(['customerGroup']);
                                }}/>
                                <Radio id="customer-group-radio-button" value={2} onClick={() => {
                                    setCustomerChecked(false);
                                    setCustomerTextBoxValue('');
                                    form.resetFields(['customer']);
                                }}/>
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
                                <Input disabled={!isCustomerChecked}
                                       value={customerTextboxValue} onChange={handleChangeCustomer}
                                       allowClear/>
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
                                <Input allowClear id="customer-group-text-box" disabled={isCustomerChecked}
                                       value={customerGroupTextboxValue} onChange={handleChangeCustomerGroup}/>
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
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            showSearch
                        >
                            {attributeGroups.attributeGroups}
                        </Select>
                    </Form.Item>
                    <Form.Item className="search-btn-wrapper">
                        <button
                            id="search-button"
                            type="primary"
                            className={isSearchDisabled ? 'search-btn outlined-btn pz-disabled' : 'search-btn outlined-btn '}
                            disabled={isSearchDisabled}
                        >
                            Search
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default SearchForm;
