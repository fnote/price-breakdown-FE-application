/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 10/26/20. Mon 2020 15:00
 */

 import b from '../constants/BusinessUnits';
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

export const createBusinessUnitMap = ({ authorizedBunitList }) => {
    if (authorizedBunitList && authorizedBunitList instanceof Array) {
        const mappedBusinessUnits = authorizedBunitList.map(({ bunit_id, bunit_name }) => [
            bunit_id, mapBusinessUnit({ bunit_id, bunit_name })
        ]);
        return new Map(mappedBusinessUnits);
    }

    return new Map();
};

export const formatBusinessUnit = (businessUnitId, businessUnits) => {
    const businessUnit = b.get(businessUnitId);
    return (businessUnit) ? `${businessUnit.id} - ${businessUnit.name}` : businessUnitId;
};
