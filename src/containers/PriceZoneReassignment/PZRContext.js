import React, {useState} from 'react';

const initialSearchParams = {
    site: '043-Houston',
    opcoId: '043',
    customer: null,
    customerGroup: '31223',
    attributeGroup: 'Milk',
    attributeGroupId: '12'
};

const itemPriceZones = [
    {
        supc: '1000001',
        customer_account: '100001',
        product_name: 'Sysco MILK',
        customer_name: 'Bills Diary shop',
        price_zone: 3,
        existent_price_zones: [1, 2, 3, 4, 5],
        effective_from_date: '20210530',
        source: 'WTP model',
    },
    {
        supc: '1000002',
        customer_account: '100002',
        product_name: 'Sysco MILK',
        customer_name: 'Bills Diary shop',
        price_zone: 2,
        existent_price_ones: [1, 2, 3, 4, 5],
        effective_from_date: '20210530',
        source: 'WTP model',
    },
    {
        supc: '1000021',
        customer_account: '100005',
        product_name: 'Sysco MILK',
        customer_name: 'Bills Diary shop',
        price_zone: 3,
        existent_price_zones: [1, 2, 3, 4, 5],
        effective_from_date: '20210530',
        source: 'WTP model',
    },
];

export const PZRContext = React.createContext({
    isLoading: false,
    setLoading: () => {
    },
    searchParams: {...initialSearchParams},
    searchResults: {
        total_records: 20,
        offset: 1,
        limit: 20,
        data: {
            business_unit_number: '020',
            customer_group: '1662',
            item_attribute_group: 'MILK',
            item_attribute_group_id: '1234',
            item_price_zones: itemPriceZones,
        },
    }
});

const PZRContextProvider = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({...initialSearchParams});
    const [searchResults, setSearchResults] = useState({
        total_records: 40,
        offset: 1,
        limit: 20,
        data: {
            business_unit_number: '020',
            customer_group: '1662',
            item_attribute_group: 'MILK',
            item_attribute_group_id: '1234',
            item_price_zones: itemPriceZones,
        },
    });

    return (
        <PZRContext.Provider value={{
            isLoading,
            setLoading,
            searchParams,
            searchResults,
            setSearchResults

        }}>
            {props.children}
        </PZRContext.Provider>
    );
};

export default PZRContextProvider;
