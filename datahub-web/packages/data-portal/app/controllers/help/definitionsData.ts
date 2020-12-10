export default [
  { term: 'Dataset​', definition: 'Dataset for which we want to see the metadata details.' },
  { term: 'People​', definition: 'Users in the system​' },
  {
    term: 'Business Term',
    definition: 'External definition of a column in dataset. Usually referenced from standards like FIBO or ISO​'
  },
  { term: 'Entitity​', definition: 'Dataset, People, Business Terms are classified as entities in the system​' },
  {
    term: 'Origin​',
    definition:
      'It is one of the filter options which comes in the search results. It means environment e.g. Dev, Test​'
  },
  {
    term: 'Platform​',
    definition:
      'It is one of the filter options which comes in the search results. It means source of the dataset e.g. Kafka, Hive​'
  },
  {
    term: 'Schema​',
    definition: 'This is seen in a datset details page. It details about the columns in the dataset​'
  },
  {
    term: 'Status​',
    definition:
      'This is seen in a datset details page. It is a flag which will show that the dataset is depricated and is not supposed to be referred​'
  },
  {
    term: 'Ownership​',
    definition:
      'This is seen in a datset details page. It provides details about the owners of the dataset.​<br/> DATA OWNER - Business Owner <br/>  PRODUCER - Technical Owner​ <br/> STAKEHOLDER - Data Steward​'
  },
  {
    term: 'Relationship​',
    definition: 'This is seen in a datset details page. This explains the lineage of the dataset​'
  },
  {
    term: 'Properties​',
    definition:
      'This is seen in a datset details page. This shows custom properties like informationClassification for a dataset​'
  },
  {
    term: 'Docs​',
    definition: 'This is seen in a datset details page. Reference of a link or a document can be provided here​'
  }
];
