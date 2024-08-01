import React from 'react';

import { queue } from '__mocks__/data';
import QueueView from './QueueView';

export default {
  component: AdminPage,
  title: 'AdminPage',
  args: {
    match: {
      params: {
        queueId: 'xxx-xxx',
      },
    },
  },
  parameters: {
    state: {
      selectedQueue: { ...queue },
    },
  },
};

const Template = (args) => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <QueueView {...args} />
);

export const Default = Template.bind({});
