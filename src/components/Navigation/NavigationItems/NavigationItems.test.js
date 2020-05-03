import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems/>', () => {
    let warapper;
    beforeEach(() => {
        warapper = shallow(<NavigationItems />);
    })
    it('should return two <NavigationItems/> element if not authenticated ', () => {
        expect(warapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should return three <NavigationItems/> element if not authenticated ', () => {
        //warapper = shallow(<NavigationItems isAuthenticated />);
        warapper.setProps({isAuthenticated:true})
        expect(warapper.find(NavigationItem)).toHaveLength(3);
    });
})