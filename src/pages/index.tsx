import React from 'react';

import { INGREDIENTS } from '../config';
import { DailyDozen } from '../DailyDozen';
import { Layout } from '../Layout';

export default function IndexPage() {
  return (
    <Layout>
      <DailyDozen ingredients={INGREDIENTS} />
    </Layout>
  );
}
