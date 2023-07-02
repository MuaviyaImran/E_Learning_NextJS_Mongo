
import { userEvent, within } from '@storybook/testing-library';

import { Main } from './Main';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/Main',
  component: Main,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;

export const MainWithReactComponent = {
  args: {
    children: <div>Children node</div>,
  },
};

export const MainWithString = {
  args: {
    children: 'String',
  },
};

// More on interaction testing: https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing
export const MainWithHomeLink = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('link', {
      name: /Home/i,
    });

    await userEvent.click(loginButton);
  },
};
