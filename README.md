# Saxo Dataworkbench: Fork of LinkedIn Datahub
- [Introduction](#introduction)
- [Branches](#branches)
- [Workflows](#workflows)

## Introduction
This project repository hosts the fork of LinkedIn Datahub(https://github.com/linkedin/datahub) for Saxo's DataWorkbench Implementation.

## Branches
- master: reflection of upstream branch, datahub/master
- automation: host automation workflows to keep master branch, in sync with datahub/master

## Workflows
- sync-repo 
  ### Parameters:
  - source_repo: "https://github.com/linkedin/datahub"
  - source_branch: "master"
  - destination_branch: "master"
  - github_token: personal access token, stored in repository's secret as PAT
  - sync_tags: "true"
