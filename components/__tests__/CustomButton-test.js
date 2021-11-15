import * as React from 'react';
import renderer from 'react-test-renderer';
import { CustomButton, Button } from '../../customComponents/CustomButton';


it(`Button renders correctly`, () => {
    
    const handlePress = () => {}
  
    const customTree = renderer.create(<CustomButton  textTitle="Text" backgroundColor='red' >Button</CustomButton>).toJSON();
    expect(customTree).toMatchSnapshot();

    const tree = renderer.create(<Button title="Text Button" radius={22}> </Button>).toJSON();
    expect(tree).toMatchSnapshot();

});