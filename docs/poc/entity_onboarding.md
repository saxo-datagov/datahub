## Entity Onboarding

Followed the [doc](../how/entity-onboarding.md) for the new entity onboarding in LDH.

1. Created Business term entity [models](../rfc/active/business_glossary/README.md) in different modules as specified in the above document.
    - If by mistake you want to change your model structure then delete generated folders inside gms/api and
      rebuild the changed modules. Otherwise, API compatibility issues can arise.
3. Completed all steps in [doc](../how/entity-onboarding.md)
2. Onboard the entity by running metadata-ingestion-examples(with example-bootstrap.json) gradle task
3. If conversion into the schema got failed then mae event would not be raised again for same entity. Change the entity urn for debugging again.


###### Get business term with 
```
curl 'http://localhost:8080/businessTerms/($params:(),domain:market9,name:name)' -H 'X-RestLi-Protocol-Version:2.0.0' -s | jq
```
###### Get all business terms with
```
curl 'http://localhost:8080/businessTerms/' -H 'X-RestLi-Protocol-Version:2.0.0' -s | jq
```
###### Search business term
```
curl "http://localhost:8080/businessTerms?q=search&input=name&start=0&count=10" -X GET -H 'X-RestLi-Protocol-Version: 2.0.0' -H 'X-RestLi-Method: finder' | jq
```
###### Auto-complete business term
```
curl "http://localhost:8080/businessTerms?action=autocomplete" -d '{"query": "defin", "field": "definition", "limit": 10, "filter": {"criteria": []}}' -X POST -H 'X-RestLi-Protocol-Version: 2.0.0' | jq
```

##### Graph results
```
http://localhost:7474/browser/
```

#### Debugging
If you want to make changes in gms, mae, mce and see the results instantly then you can use /docker/dev.sh script for running your built jars.
You will have to build jar everytime you make any change to the module and run the script again.

If you want to make changes(or debug) in one module (say gms) then remove gms docker service from docker/docker-compose.yml,
start the services by /docker/dev.sh

Start your single module through gradle task.In this way you can restart single module(gms) through gradle without re-starting other modules. 
  