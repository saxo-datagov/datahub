import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | tables/dynamic-record', function(hooks) {
  setupRenderingTest(hooks);

  const mockData = [
    {
      colA: 'col a text row 1',
      colB: 'col b text row 1'
    },
    {
      colA: 'col a text row 2',
      colB: 'col b text row 2'
    }
  ];

  test('it renders', async function(assert) {
    this.setProperties({ records: mockData });
    await render(hbs`
      <Tables::DynamicRecord
        @records={{this.records}}
      />
    `);

    assert.dom().containsText('ColA');
    assert.dom().containsText('ColB');
    assert.dom().containsText('col a text row 1');
    assert.dom().containsText('col a text row 2');
  });
});
