import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { getBusinessUnits } from '../PricingHelper';

configure({adapter: new Adapter()});

describe.only('formatBusinessUnit', () => {
    test('should return formatted business unit name for valid OpCo Id', () => {
        expect(getBusinessUnits([])).toEqual([]);
        const businessUnitsMap = [{
            id: '011',
            shortName: 'Louiville'
        }];
        const businessUnitList = getBusinessUnits(businessUnitsMap);
        expect(businessUnitList.length).toEqual(1);
        const props = mount(businessUnitList[0]).props();
        expect(props.value).toEqual('011');
        expect(props.children.join('')).toEqual('011 - Louiville');
    });
});
