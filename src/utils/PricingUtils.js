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
    DESCRIPTION_VOLUME_TIERS,
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
    AGREEMENT_CODE_T,
    VOLUME_TIER_OPERATOR_BETWEEN,
    VOLUME_TIER_RANGE_END_ABOVE,
    VOLUME_TIER_RANGE_CONNECTOR_TO,
    VOLUME_TIER_RANGE_CONNECTOR_AND,
    CURRENCY_SYMBOL_USD,
    APPLICATION_LOCALE,
    SPLIT_STATUS_NO,
    SPLIT_STATUS_YES,
    DESCRIPTION_CUSTOMER_NET_PRICE
} from './Constants';
// TODO: change this
// export const formatBusinessUnit = ({ name, id }) =>  `${id} - ${name}`;
export const formatBusinessUnit = () => "067 - Philadelphia";

export const formatPrice = value => value > 0 ? `${CURRENCY_SYMBOL_USD}${value.toFixed(2)}`
    : `-${CURRENCY_SYMBOL_USD}${(-1 * value).toFixed(2)}`;

export const convertFactorToPercentage = factor => `${(factor * 100).toFixed(2)}%`;

// TODO: @sanjayaa are all the usages correct? And is this conversion correct?
export const getFormattedPercentageValue = factor => convertFactorToPercentage(factor - 1);

export const getReadableDiscountName = name => DISCOUNT_NAMES_MAP.get(name);

export const getPriceUnitBySplitFlag = ({ isSplit }) => isSplit ? PRICE_UNIT_SPLIT : PRICE_UNIT_CASE;

export const generateDateObject = dateString => new Date(`${dateString.slice(0, 4)} ${dateString.slice(4, 6)} ${dateString.slice(6, 8)}`);

export const generateReadableDate = dateString => generateDateObject(dateString)
    .toLocaleDateString(APPLICATION_LOCALE, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

export const generateValidityPeriod = (effectiveFrom, effectiveTo) =>
    `Valid ${generateReadableDate(effectiveFrom)} - ${generateReadableDate(effectiveTo)}`;

export const mapDiscountToDataRow = ({ name, amount, priceAdjustment, effectiveFrom, effectiveTo }, source) => ({
    description: getReadableDiscountName(name),
    adjustmentValue: getFormattedPercentageValue(amount),
    calculatedValue: formatPrice(priceAdjustment),
    validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
    source
});

export const mapAgreementToDataRow = ({ description, percentageAdjustment, priceAdjustment, effectiveFrom, effectiveTo }, source) => ({
    description,
    adjustmentValue: `${percentageAdjustment}`,
    calculatedValue: formatPrice(priceAdjustment),
    validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
    source
});

export const mapVolumeTierToTableRow = ({ eligibility: { operator, lowerBound, upperBound }, discounts }) => ({
    description: {
        rangeStart: lowerBound,
        rangeEnd: operator === VOLUME_TIER_OPERATOR_BETWEEN ? upperBound : VOLUME_TIER_RANGE_END_ABOVE,
        rangeConnector: operator === VOLUME_TIER_OPERATOR_BETWEEN ? VOLUME_TIER_RANGE_CONNECTOR_TO : VOLUME_TIER_RANGE_CONNECTOR_AND
    },
    adjustmentValue: getFormattedPercentageValue(discounts[0].amount),
    calculatedValue: formatPrice(discounts[0].priceAdjustment),
    source: PRICE_SOURCE_DISCOUNT_SERVICE,
    isSelected: false // TODO: need to decide with the quantity
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

export const getSplitStatusBySplitFlag = ({ splitFlag }) => splitFlag === true ? SPLIT_STATUS_YES : SPLIT_STATUS_NO;

export const extractRequestInfo = ({ priceRequestDate, requestedQuantity, products }) => ({
    order: {
        priceRequestDate: generateReadableDate(priceRequestDate),
        splitStatus: getSplitStatusBySplitFlag(products[0]),
        requestedQuantity
    }
});

export const prepareLocalSegmentPriceInfo = ({ discounts, rounding: { calculatedAmount }, grossPrice }) => {
    const headerRow = {
        description: DESCRIPTION_LOCAL_SEGMENT_REF_PRICE,
        calculatedValue: formatPrice(grossPrice)
    };
    console.log('discounts');
    console.log(discounts);

    const refPriceDiscountRows = discounts.filter(discount => discount.type === DISCOUNT_TYPE_REF_PRICE)
        .map(discount => mapDiscountToDataRow(discount, PRICE_SOURCE_DISCOUNT_SERVICE));

    const roundingValueRow = {
        description: DESCRIPTION_ROUNDING,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(calculatedAmount),
        source: PRICE_SOURCE_SYSTEM
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
        description: DESCRIPTION_DISCOUNT_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(customerPrequalifiedPrice)
    };

    const appliedAgreements = agreements.filter(agreement => isApplyToPriceOrBaseAgreement(agreement))
        .map(agreement => mapAgreementToDataRow(agreement, PRICE_SOURCE_SUS));

    return [headerRow, ...appliedAgreements];
};

export const isOfflineAgreement = ({ applicationCode }) => applicationCode === AGREEMENT_CODE_L || applicationCode === AGREEMENT_CODE_T;

export const prepareOrderUnitPriceInfo = ({ agreements, netPrice }) => {
    const headerRow = {
        description: DESCRIPTION_ORDER_NET_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(netPrice)
    };

    const offlineAgreements = agreements.filter(agreement => isOfflineAgreement(agreement))
        .map(agreement => mapAgreementToDataRow(agreement, PRICE_SOURCE_SUS));

    return [headerRow, ...offlineAgreements]
};

export const prepareCustomerNetPriceInfo = ({ netPrice }) => {
    const headerRow = {
        description: DESCRIPTION_CUSTOMER_NET_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(netPrice)
    };

    return [headerRow]
};

export const prepareVolumePricingHeaderInfo = ({ discounts }) => {
    return {
        description: DESCRIPTION_VOLUME_TIERS,
        validityPeriod: generateValidityPeriod(discounts[0].effectiveFrom, discounts[0].effectiveTo)
    };
};

export const prepareVolumePricingInfo = ({ volumePricingTiers }) => ({
    volumePricingTiers: volumePricingTiers.map(tier => mapVolumeTierToTableRow(tier)),
    volumePricingHeaderRow: volumePricingTiers.length > 0
        ? prepareVolumePricingHeaderInfo(volumePricingTiers[0])
        : null
});
