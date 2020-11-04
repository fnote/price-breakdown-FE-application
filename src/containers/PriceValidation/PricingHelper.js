import React from "react";
import { Select } from "antd";
const { Option } = Select;

export const getBusinessUnits = (businessUnitsMap) => {
    const businessUnitOptions = [];
    if (businessUnitsMap) {
        businessUnitsMap.forEach((businessUnit => {
            businessUnitOptions.push(
                <Option key={businessUnit.id} value={businessUnit.id}>{businessUnit.id} - {businessUnit.shortName}</Option>
            )
        }));
    }

    return businessUnitOptions;
};

