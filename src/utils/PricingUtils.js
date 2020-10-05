/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 9/30/20. Wed 2020 18:45
 */

import {
    PRICE_UNIT_CASE,
    PRICE_UNIT_SPLIT,
    DESCRIPTION_LOCAL_SEGMENT_REF_PRICE,
    DESCRIPTION_STRIKE_THROUGH_PRICE,
    DESCRIPTION_DISCOUNT_PRICE,
    DESCRIPTION_ORDER_NET_PRICE,
    DESCRIPTION_ROUNDING,
    DISCOUNT_TYPE_REF_PRICE,
    DISCOUNT_TYPE_PREQUALIFIED,
    DISCOUNT_CASE_VOLUME,
    DISCOUNT_NAMES_MAP,
    PRICE_SOURCE_DISCOUNT_SERVICE,
    PRICE_SOURCE_SYSTEM,
    PRICE_SOURCE_SUS,
    EMPTY_ADJUSTMENT_VALUE_INDICATOR,
    AGREEMENT_CODE_P,
    AGREEMENT_CODE_B,
    AGREEMENT_CODE_L,
    AGREEMENT_CODE_T
} from './Constants';
// TODO: change this
// export const formatBusinessUnit = ({ name, id }) =>  `${id} - ${name}`;
export const formatBusinessUnit = () => "067 - Philadelphia";

export const formatPrice = value => `$${value}`;

export const getReadableDiscountName = name => DISCOUNT_NAMES_MAP.get(name);

export const getPriceUnitBySplitFlag = ({ isSplit }) => isSplit ? PRICE_UNIT_SPLIT : PRICE_UNIT_CASE;

export const generateDateObject = dateString => new Date(`${dateString.slice(0, 4)} ${dateString.slice(4, 6)} ${dateString.slice(6, 8)}`);

export const generateReadableDate = dateString => generateDateObject(dateString).toLocaleDateString(undefined, {
   day: 'numeric',
   month: 'short',
   year: 'numeric'
});

export const generateValidityPeriod = (effectiveFrom, effectiveTo) => `Valid ${generateReadableDate(effectiveFrom)} - ${generateReadableDate(effectiveTo)}`;

export const mapDiscountToDataRow = ({ name, amount, priceAdjustment, effectiveFrom, effectiveTo }, source) => ({
    description: getReadableDiscountName(name),
    adjustmentValue: amount,
    calculatedValue: formatPrice(priceAdjustment),
    validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
    source
});

export const mapAgreementToDataRow = ({ description, percentageAdjustment, priceAdjustment, effectiveFrom, effectiveTo }, source) => ({
    description,
    adjustmentValue: percentageAdjustment,
    calculatedValue: formatPrice(priceAdjustment),
    validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
    source
});

export const extractPricePoints = ({ grossPrice,  customerReferencePrice, customerPrequalifiedPrice, unitPrice, netPrice }) => ({
    pricePoints: {
        grossPrice,
        customerReferencePrice,
        customerPrequalifiedPrice,
        unitPrice,
        netPrice
    }
});

export const extractItemInfo = ({ id, name, brand, pack, size, stockIndicator, catchWeightIndicator, averageWeight }) => ({
   item: {
       id, name, brand, pack, size, stockIndicator, catchWeightIndicator, averageWeight
   }
});

export const extractSiteInfo = ({ customerAccount, customerName, customerType, priceZone }, businessUnit) => ({
    site: {
        site: formatBusinessUnit(businessUnit),
        customerAccount,
        customerName: 'Mikes Seafood and Grill',
        customerType,
        priceZone
    }
});

export const prepareLocalSegmentPriceInfo = ({ discounts, rounding: { calculatedAmount }, grossPrice }) => {
    const headerRow = {
        description: DESCRIPTION_LOCAL_SEGMENT_REF_PRICE,
        calculatedValue: formatPrice(grossPrice)
    };

    const refPriceDiscountRows = discounts.filter(discount => discount.type === DISCOUNT_TYPE_REF_PRICE)
        .map(discount => mapDiscountToDataRow(discount, PRICE_SOURCE_DISCOUNT_SERVICE));

    const roundingValueRow = {
        description: DESCRIPTION_ROUNDING,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(calculatedAmount), source: PRICE_SOURCE_SYSTEM
    };

    return [headerRow, ...refPriceDiscountRows, roundingValueRow];

};

export const prepareStrikeThroughPriceInfo = ({ discounts, customerReferencePrice }) => {
    const headerRow = {
        description: DESCRIPTION_STRIKE_THROUGH_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(customerReferencePrice)
    };

    const preQualifiedDiscounts = discounts.filter(discount => discount.type === DISCOUNT_TYPE_PREQUALIFIED && discount.name !== DISCOUNT_CASE_VOLUME)
        .map(discount => mapDiscountToDataRow(discount, PRICE_SOURCE_DISCOUNT_SERVICE));

    return [headerRow, ...preQualifiedDiscounts];
};

export const isApplyToPriceOrBaseAgreement = ({ applicationCode }) => applicationCode === AGREEMENT_CODE_P || applicationCode === AGREEMENT_CODE_B;

export const prepareDiscountPriceInfo = ({ agreements, customerPrequalifiedPrice }) => {
    const headerRow = {
        description: DESCRIPTION_DISCOUNT_PRICE, calculatedValue: formatPrice(customerPrequalifiedPrice)
    };

    const appliedAgreements = agreements.filter(agreement => isApplyToPriceOrBaseAgreement(agreement))
        .map(agreement => mapAgreementToDataRow(agreement, PRICE_SOURCE_SUS));

    return [headerRow, ...appliedAgreements];
};

export const isOfflineAgreement = ({ applicationCode }) => applicationCode === AGREEMENT_CODE_L || applicationCode === AGREEMENT_CODE_T;

export const prepareNetPriceInfo = ({ agreements }) => {
    const headerRow = {
        description: DESCRIPTION_ORDER_NET_PRICE, calculatedValue: ''
    };

    const offlineAgreements = agreements.filter(agreement => isOfflineAgreement(agreement))
        .map(agreement => mapAgreementToDataRow(agreement, PRICE_SOURCE_SUS));

    return [headerRow, ...offlineAgreements]
};


