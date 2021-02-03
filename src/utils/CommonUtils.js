/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 10/26/20. Mon 2020 15:00
 */

import {FILE_NAME_DISPLAY_LENGTH} from "../constants/Constants";

const BUSINESS_UNIT_NAME_SPLITTER = 'Sysco ';

const extractNames = (businessUnitName = '', splitter = BUSINESS_UNIT_NAME_SPLITTER) => {
    const names = businessUnitName.split(splitter);
    if (names.length === 2) {
        return { name: businessUnitName, shortName: names[1] };
    }
    return { name: businessUnitName, shortName: businessUnitName };
};

const mapBusinessUnit = ({ bunit_id, bunit_name }) => ({
    id: bunit_id,
    ...extractNames(bunit_name)
});

export const createBusinessUnitMap = ({ authorizedPricingTransformationEnabledBunitList }) => {
    if (authorizedPricingTransformationEnabledBunitList && authorizedPricingTransformationEnabledBunitList instanceof Array) {
        const mappedBusinessUnits = authorizedPricingTransformationEnabledBunitList.map(({ bunit_id, bunit_name }) => [
            bunit_id, mapBusinessUnit({ bunit_id, bunit_name })
        ]);
        return new Map(mappedBusinessUnits);
    }

    return new Map();
};

export const formatBusinessUnit = (businessUnitId, businessUnits) => {
    const businessUnit = businessUnits.get(businessUnitId);
    return (businessUnit) ? `${businessUnit.id} - ${businessUnit.name}` : businessUnitId;
};

export const formatNumberInput = (value) => {
    const formatterRegex = /^-?\d+(?:\.\d{0,3})?/;

    if (value && !isNaN(value)) {
        const strVal = `${value}`;
        const matcherResult = strVal.match(formatterRegex);
        if (matcherResult) {
            return matcherResult[0];
        }
    }
    return value;
};

export const getDisplayFileName = (fileName) => {
    return (fileName.length > FILE_NAME_DISPLAY_LENGTH) ? fileName.substr(0, FILE_NAME_DISPLAY_LENGTH - 1) + '...' : fileName;
}
