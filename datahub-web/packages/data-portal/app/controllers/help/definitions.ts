import Controller from '@ember/controller';
import TablesSimpleRecord from '@datahub/shared/components/tables/simple-record';
import { INachoTableConfigs } from '@nacho-ui/table/types/nacho-table';
import definitions from './definitionsData';

export default class DefinitionsController extends Controller {
  entries: TablesSimpleRecord['entries'] = definitions;

  tableConfigs: INachoTableConfigs<string> = {
    headers: [{ title: 'Term' }, { title: 'Definition' }],
    useBlocks: { body: true, header: false },
    labels: ['term', 'definition']
  };
}
