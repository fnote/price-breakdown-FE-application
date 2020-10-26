/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 10/26/20. Mon 2020 15:00
 */

const extractNames = (bunit_name = '') => {
    const names = bunit_name.split('Sysco ');
    if (names.length === 2) {
        return { name: bunit_name, shortName: names[1] };
    }
    return { name: bunit_name, shortName: bunit_name };
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
    const businessUnit = businessUnits.get(businessUnitId);
    return (businessUnit) ? `${businessUnit.id} - ${businessUnit.name}` : businessUnitId;
};
