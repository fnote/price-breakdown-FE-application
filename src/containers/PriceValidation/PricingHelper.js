import React from "react";
import { Select } from "antd";
const { Option } = Select;

export const getBusinessUnits = (businessUnitsMap) => {
    const businessUnitOptions = [];
    businessUnitsMap.forEach((businessUnit => {
        businessUnitOptions.push(
            <Option value={businessUnit.id}>{businessUnit.id} - {businessUnit.shortName}</Option>
        )
    }));

    return businessUnitOptions;
};

