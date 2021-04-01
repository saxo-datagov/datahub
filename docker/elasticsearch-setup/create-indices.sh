#!/bin/sh

set -e

function create_index {
	echo -e '\ncreating' $1
  jq -n \
    --slurpfile settings index/$2 \
    --slurpfile mappings index/$3 \
    '.settings=$settings[0] | .mappings=$mappings[0]' > /tmp/data

  curl -XPUT $ELASTICSEARCH_HOST:$ELASTICSEARCH_PORT/$1 -H 'Content-Type: application/json' --data @/tmp/data
}

create_index chartdocument chart/settings.json chart/mappings.json
create_index corpuserinfodocument corp-user/settings.json corp-user/mappings.json
create_index dashboarddocument dashboard/settings.json dashboard/mappings.json
create_index datajobdocument datajob/settings.json datajob/mappings.json
create_index dataflowdocument dataflow/settings.json dataflow/mappings.json
create_index dataprocessdocument data-process/settings.json data-process/mappings.json
create_index datasetdocument dataset/settings.json dataset/mappings.json
create_index mlmodeldocument ml-model/settings.json ml-model/mappings.json
create_index tagdocument tags/settings.json tags/mappings.json
create_index glossaryterminfodocument glossary/term/settings.json glossary/term/mappings.json
create_index glossarynodeinfodocument glossary/node/settings.json glossary/node/mappings.json

