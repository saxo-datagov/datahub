import Controller from '@ember/controller';
import definitions from './definitionsData';
import { augmentWithHtmlComment } from '@datahub/entities/utils/api/columns';

interface IDefinitionColumn {
  [key: string]: string;
}
export default class DefinitionsController extends Controller {
  records: Array<IDefinitionColumn> = [];

  init(): void {
    super.init();
    this.task();
  }

  task(): void {
    this.records = definitions.map(entry => {
      entry.definition = augmentWithHtmlComment({
        comment: entry.definition,
        commentHtml: entry.definition
      }).commentHtml;
      return entry;
    });
  }
}
