import React, { useContext, ChangeEvent } from 'react';

import { ControlArea } from '../ControlArea';
import { Layout } from '../Layout';
import { Context as OptionsContext, Unit } from '../UserOptions';
import { Select } from '../ds/Select';

function Settings() {
  const [options, updateOptions] = useContext(OptionsContext);

  if (!options) {
    return null;
  }

  return (
    <ControlArea>
      <div className="pa3">
        <label className="dark-gray f5 sans-serif">Units</label>
        <Select
          className="mt2"
          value={options.unit}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            const unit = event.target.value as Unit;
            updateOptions({ unit });
          }}
        >
          <option value={Unit.Imperial}>Imperial</option>
          <option value={Unit.Metric}>Metric</option>
        </Select>
      </div>
    </ControlArea>
  );
}

export default function SettingsPage() {
  return (
    <Layout>
      <Settings />
    </Layout>
  );
}
