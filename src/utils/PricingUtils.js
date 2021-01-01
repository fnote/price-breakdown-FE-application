/**
 * @author Tharuka Jayalath
 * (C) 2020, Sysco Corporation
 * Created: 9/30/20. Wed 2020 18:45
 */

import {
    AGREEMENT_CODE_B,
    AGREEMENT_CODE_L,
    AGREEMENT_CODE_P,
    AGREEMENT_CODE_T,
    APPLICATION_LOCALE,
    CURRENCY_SYMBOL_USD,
    DESCRIPTION_CUSTOMER_NET_PRICE,
    DESCRIPTION_DISCOUNT_PRICE,
    DESCRIPTION_LOCAL_SEGMENT_REF_PRICE,
    DESCRIPTION_ORDER_NET_PRICE,
    DESCRIPTION_ROUNDING,
    DESCRIPTION_CUSTOMER_REFERENCE_PRICE,
    DESCRIPTION_VOLUME_TIERS,
    DISCOUNT_CASE_VOLUME,
    DISCOUNT_NAMES_MAP,
    DISCOUNT_TYPE_PREQUALIFIED,
    DISCOUNT_TYPE_REF_PRICE,
    EMPTY_ADJUSTMENT_VALUE_INDICATOR,
    PRICE_SOURCE_DISCOUNT_SERVICE,
    PRICE_SOURCE_SUS,
    PRICE_SOURCE_SYSTEM,
    PRICE_UNIT_CASE,
    PRICE_UNIT_SPLIT,
    PRICE_UNIT_POUND,
    SPLIT_STATUS_NO,
    SPLIT_STATUS_YES,
    VOLUME_TIER_OPERATOR_BETWEEN,
    VOLUME_TIER_RANGE_CONNECTOR_AND,
    VOLUME_TIER_RANGE_CONNECTOR_TO,
    VOLUME_TIER_RANGE_CONNECTOR_EMPTY,
    VOLUME_TIER_RANGE_END_ABOVE,
    VOLUME_TIER_RANGE_END_EMPTY,
    PRICE_FRACTION_DIGITS_TWO,
    PRICE_FRACTION_DIGITS_THREE,
    PERCENTAGE_FRACTION_DIGITS,
    DESCRIPTION_EXCEPTION,
    AVAILABLE_PRICE_ZONES,
    NOT_APPLICABLE_LABEL,
    PRICE_SOURCE_PA_ID,
    FRACTION_DIGITS_CHANGING_MARGIN_VALUE, DESCRIPTION_PRICE_RULE, PERCENTAGE_SIGN,
} from '../constants/Constants';

const getFractionDigits = ({ perWeightFlag, useFixedFractionDigits, digits }) => {
    if (useFixedFractionDigits) {
        return digits;
    }
    return perWeightFlag ? PRICE_FRACTION_DIGITS_THREE : PRICE_FRACTION_DIGITS_TWO;
};
/**
 * Formats a given number into a String with decimal representation. To be used for displaying currency with currency symbol
 * */
export const formatPrice = (value, { perWeightFlag = false, useFixedFractionDigits = false, digits = PRICE_FRACTION_DIGITS_TWO }) => (value >= 0
    ? `${CURRENCY_SYMBOL_USD}${value.toFixed(getFractionDigits({ perWeightFlag, useFixedFractionDigits, digits }))}`
    : `-${CURRENCY_SYMBOL_USD}${(-1 * value).toFixed(getFractionDigits({ perWeightFlag, useFixedFractionDigits, digits }))}`);

/**
 * Formats a given number into a String with decimal representation. To be used for displaying currency without currency symbol
 * */
export const formatPriceWithoutCurrency = (
    value, { perWeightFlag = false, useFixedFractionDigits = false, digits = PRICE_FRACTION_DIGITS_TWO }
    ) => `${value.toFixed(getFractionDigits({ perWeightFlag, useFixedFractionDigits, digits }))}`;

export const convertFactorToPercentage = (factor) => `${(factor * 100).toFixed(PERCENTAGE_FRACTION_DIGITS)}%`;

export const getFormattedPercentageValue = (factor) => convertFactorToPercentage(factor - 1);

export const getReadableDiscountName = (name) => DISCOUNT_NAMES_MAP.get(name);

export const getPriceUnit = ({ splitFlag, perWeightFlag }) => {
    if (perWeightFlag) {
        return PRICE_UNIT_POUND;
    }
    return splitFlag ? PRICE_UNIT_SPLIT : PRICE_UNIT_CASE;
};

export const generateDateObject = (dateString) => new Date(dateString.slice(0, 4), dateString.slice(4, 6) - 1, dateString.slice(6, 8));

export const generateReadableDate = (dateString) => generateDateObject(dateString)
    .toLocaleDateString(APPLICATION_LOCALE, {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

export const generateValidityPeriod = (effectiveFrom, effectiveTo) => `Valid ${generateReadableDate(effectiveFrom)} - ${generateReadableDate(effectiveTo)}`;

export const mapDiscountToDataRow = ({
    id, name, amount, priceAdjustment, effectiveFrom, effectiveTo
}, source, { perWeightFlag, useFixedFractionDigits }) => ({
    id,
    description: getReadableDiscountName(name),
    adjustmentValue: getFormattedPercentageValue(amount),
    calculatedValue: formatPrice(priceAdjustment, { perWeightFlag, useFixedFractionDigits }),
    validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
    source
});

export const mapAgreementToDataRow = ({
    id, description, percentageAdjustment, priceAdjustment, effectiveFrom, effectiveTo
}, source, { perWeightFlag }) => {
    const formattedPriceAdjustment = formatPrice(priceAdjustment, { perWeightFlag });
    return {
        id,
        description,
        adjustmentValue: percentageAdjustment ? `${percentageAdjustment}` : formattedPriceAdjustment,
        calculatedValue: formattedPriceAdjustment,
        validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
        source
    };
};

const calculateExceptionAdjustment = (exceptionPrice, customerPrequalifiedPrice) => exceptionPrice - customerPrequalifiedPrice;

export const mapExceptionToDataRow = ({
    id, price, effectiveFrom, effectiveTo
}, customerPrequalifiedPrice, { perWeightFlag }) => {
    const formattedCalculatedAdjustment = formatPrice(calculateExceptionAdjustment(price, customerPrequalifiedPrice), { perWeightFlag });
    return {
        id,
        description: DESCRIPTION_EXCEPTION,
        adjustmentValue: formatPrice(price, { perWeightFlag }),
        calculatedValue: formattedCalculatedAdjustment,
        validityPeriod: generateValidityPeriod(effectiveFrom, effectiveTo),
    };
};

const getRangeEndValue = (operator, lowerBound, upperBound) => {
    if (operator === VOLUME_TIER_OPERATOR_BETWEEN) {
        if (lowerBound === upperBound) {
            return VOLUME_TIER_RANGE_END_EMPTY;
        }
        return upperBound;
    }
    return VOLUME_TIER_RANGE_END_ABOVE;
};

const getRangeConnectorValue = (operator, lowerBound, upperBound) => {
    if (operator === VOLUME_TIER_OPERATOR_BETWEEN) {
        if (lowerBound === upperBound) {
            return VOLUME_TIER_RANGE_CONNECTOR_EMPTY;
        }
        return VOLUME_TIER_RANGE_CONNECTOR_TO;
    }
    return VOLUME_TIER_RANGE_CONNECTOR_AND;
};

export const mapVolumeTierToTableRow = ({ eligibility: {operator, lowerBound, upperBound}, discounts, isApplicable }, { perWeightFlag }) => ({
    description: {
        rangeStart: lowerBound,
        rangeEnd: getRangeEndValue(operator, lowerBound, upperBound),
        rangeConnector: getRangeConnectorValue(operator, lowerBound, upperBound)
    },
    adjustmentValue: getFormattedPercentageValue(discounts[0].amount),
    calculatedValue: formatPrice(discounts[0].priceAdjustment, { perWeightFlag }),
    source: PRICE_SOURCE_DISCOUNT_SERVICE,
    isSelected: !!isApplicable
});

export const extractPricePoints = ({
    grossPrice, customerReferencePrice, customerPrequalifiedPrice, unitPrice, netPrice
}) => ({
    grossPrice,
    customerReferencePrice,
    customerPrequalifiedPrice,
    unitPrice,
    netPrice
});

export const extractItemInfo = ({
    id, name, brand, pack, size, stockIndicator, catchWeightIndicator, averageWeight
}) => ({
    id, name, brand, pack, size, stockIndicator, catchWeightIndicator, averageWeight
});

export const getValidatedPriceZone = (priceZoneId) => (AVAILABLE_PRICE_ZONES.includes(priceZoneId) ? priceZoneId : NOT_APPLICABLE_LABEL);

export const extractSiteInfo = ({
    customerAccount, customerName, customerType, businessUnitNumber, product: { priceZoneId }
}) => ({
    businessUnitNumber,
    customerAccount,
    customerName,
    customerType,
    priceZone: getValidatedPriceZone(priceZoneId)
});

export const getSplitStatusBySplitFlag = (splitFlag) => (splitFlag === true ? SPLIT_STATUS_YES : SPLIT_STATUS_NO);

export const extractRequestInfo = ({ priceRequestDate, product: { splitFlag, quantity }}) => ({
    priceRequestDate: generateReadableDate(priceRequestDate),
    splitStatus: getSplitStatusBySplitFlag(splitFlag),
    quantity
});

/**
 * Decides whether to use a fixed number of fraction digits for a value
 * Returns true only when the item is priced through Price Advisor component and
 * the item is catch weight item and its gross price value is greater than or equal to $10
 */
export const isFixedFractionDigits = (perWeightFlag, priceSource, customerReferencePrice) => (perWeightFlag
    && priceSource === PRICE_SOURCE_PA_ID && customerReferencePrice >= FRACTION_DIGITS_CHANGING_MARGIN_VALUE);

export const prepareLocalSegmentPriceInfo = ({
 discounts, referencePriceRoundingAdjustment, grossPrice, perWeightFlag, priceSource
}) => {
    const headerRow = {
        description: DESCRIPTION_LOCAL_SEGMENT_REF_PRICE,
        calculatedValue: formatPrice(grossPrice, { perWeightFlag })
    };

    const refPriceDiscountRows = discounts.filter((discount) => discount.type === DISCOUNT_TYPE_REF_PRICE)
        .map((discount) => mapDiscountToDataRow(discount, PRICE_SOURCE_DISCOUNT_SERVICE,
            { perWeightFlag }));

    const dataRows = [headerRow, ...refPriceDiscountRows];

    if (priceSource === PRICE_SOURCE_PA_ID) {
        const roundingValueRow = {
            description: DESCRIPTION_ROUNDING,
            adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
            calculatedValue: formatPrice(referencePriceRoundingAdjustment,
                { perWeightFlag }),
            source: PRICE_SOURCE_SYSTEM
        };
        dataRows.push(roundingValueRow);
    }

    return dataRows;
};

export const prepareStrikeThroughPriceInfo = ({
    discounts, customerReferencePrice, perWeightFlag, priceSource
}) => {
    const headerRow = {
        description: DESCRIPTION_CUSTOMER_REFERENCE_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(customerReferencePrice,
            { perWeightFlag, useFixedFractionDigits: isFixedFractionDigits(perWeightFlag, priceSource, customerReferencePrice) })
    };

    const preQualifiedDiscounts = discounts
        .filter((discount) => discount.type === DISCOUNT_TYPE_PREQUALIFIED && discount.name !== DISCOUNT_CASE_VOLUME)
        .map((discount) => mapDiscountToDataRow(discount, PRICE_SOURCE_DISCOUNT_SERVICE, { perWeightFlag }));

    return [headerRow, ...preQualifiedDiscounts];
};

export const isApplyToPriceOrBaseAgreement = ({applicationCode}) => applicationCode === AGREEMENT_CODE_P || applicationCode === AGREEMENT_CODE_B;

export const prepareDiscountPriceInfo = ({
 agreements, customerPrequalifiedPrice, exception, perWeightFlag
}) => {
    const headerRow = {
        description: DESCRIPTION_DISCOUNT_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(customerPrequalifiedPrice, { perWeightFlag })
    };

    let appliedAgreementsOrException = agreements.filter((agreement) => isApplyToPriceOrBaseAgreement(agreement))
        .map((agreement) => mapAgreementToDataRow(agreement, PRICE_SOURCE_SUS, { perWeightFlag }));
    appliedAgreementsOrException = appliedAgreementsOrException || [];

    if (exception) {
        const exceptionRow = mapExceptionToDataRow(exception, customerPrequalifiedPrice, { perWeightFlag });

        if (exceptionRow) {
            appliedAgreementsOrException.push(exceptionRow);
        }
    }

    return [headerRow, ...appliedAgreementsOrException];
};

export const isOfflineAgreement = ({applicationCode}) => applicationCode === AGREEMENT_CODE_L || applicationCode === AGREEMENT_CODE_T;

export const prepareOrderUnitPriceInfo = ({agreements, unitPrice, perWeightFlag}) => {
    const headerRow = {
        description: DESCRIPTION_ORDER_NET_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(unitPrice, { perWeightFlag })
    };

    const offlineAgreements = agreements.filter((agreement) => isOfflineAgreement(agreement))
        .map((agreement) => mapAgreementToDataRow(agreement, PRICE_SOURCE_SUS, { perWeightFlag }));

    return [headerRow, ...offlineAgreements];
};

export const prepareCustomerNetPriceInfo = ({ netPrice, perWeightFlag }) => {
    const headerRow = {
        description: DESCRIPTION_CUSTOMER_NET_PRICE,
        adjustmentValue: EMPTY_ADJUSTMENT_VALUE_INDICATOR,
        calculatedValue: formatPrice(netPrice, { perWeightFlag })
    };

    return [headerRow];
};

export const prepareVolumePricingHeaderInfo = ({ discounts }) => ({
        id: discounts[0].id,
        description: DESCRIPTION_VOLUME_TIERS,
        validityPeriod: generateValidityPeriod(discounts[0].effectiveFrom, discounts[0].effectiveTo)
    });

export const prepareVolumePricingTiers = ({ volumePricingTiers, perWeightFlag }) => volumePricingTiers
    .map((tier) => mapVolumeTierToTableRow(tier, { perWeightFlag }));

export const prepareVolumePricingHeaderRow = ({volumePricingTiers}) => (volumePricingTiers.length > 0
        ? prepareVolumePricingHeaderInfo(volumePricingTiers[0])
        : null);

export const prepareVolumePricingInfo = ({ volumePricingTiers, perWeightFlag }) => ({
    volumePricingTiers: volumePricingTiers.map((tier) => mapVolumeTierToTableRow(tier, { perWeightFlag })),
    volumePricingHeaderRow: volumePricingTiers.length > 0
        ? prepareVolumePricingHeaderInfo(volumePricingTiers[0])
        : null
});


export const formatFactorDetails = (priceRule) => (priceRule.factorCalcMethod === 'MGN' || priceRule.factorCalcMethod === 'MKP'
    ? `${priceRule.factorSign}${priceRule.factorValue}${PERCENTAGE_SIGN}`
    : `${priceRule.factorSign}${CURRENCY_SYMBOL_USD}${priceRule.factorValue}`);


export const prepareDefaultPriceRuleSection = ({ priceRule }) => {
    //price rule related details
    const headerRow = {
        description: DESCRIPTION_PRICE_RULE + ': ' + priceRule.name,
        adjustmentValue: '',
        calculatedValue: ''
    };

    //base value details
    const baseValueDetails = {
        description: priceRule.baseValueName ,
        adjustmentValue: priceRule.baseValue,
        calculatedValue: ''
    };

    //factor related details
    const factorDetails = {
        description: priceRule.factorCalcMethod ,
        adjustmentValue: formatFactorDetails(priceRule),
        calculatedValue: ''
    };

    //if factor value is 0 do not show the factor related details
    if(priceRule.factorValue === 0 || priceRule.factorValue === ""){
        return [headerRow , baseValueDetails];
    }else {
        return [headerRow, baseValueDetails, factorDetails];
    }
};
