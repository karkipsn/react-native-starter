import * as React from 'react';
import renderer from 'react-test-renderer';

import { MonoText, BoldText, RoundLabelText } from '../../customComponents/StyledText';

it(`Text renders correctly`, () => {

  const tree = renderer.create(<MonoText>Snapshot test!</MonoText>).toJSON();
  expect(tree).toMatchSnapshot();

  const boldTree = renderer.create(<BoldText > Bold Text</BoldText>).toJSON();
  expect(boldTree).toMatchSnapshot();

  const roundText = renderer.create(<RoundLabelText>Round Text</RoundLabelText>).toJSON();
  expect(roundText).toMatchSnapshot();
});
