import React, { useCallback, useMemo, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { message } from 'antd';
import { getServerConfigVar } from './getServerConfig';
import { Message } from './Message';
import { useEntityData } from '../entity/shared/EntityContext';

export default function DataQuality() {
    const { entityData } = useEntityData();
    const serverConfig: any = useReactiveVar(getServerConfigVar);
    const [loading, setLoading] = useState(false);
    const { environment } = serverConfig;
    const datasetName = entityData?.name;
    let origin = '';
    if (entityData) {
        // eslint-disable-next-line @typescript-eslint/dot-notation
        origin = entityData['origin'];
    }
    let { dqBaseUrl, dqDashboardId, dqDashboardTitle } = serverConfig;
    if (environment === 'UAT' && origin === 'DEV') {
        dqBaseUrl = serverConfig.dqDevBaseUrl;
        dqDashboardId = serverConfig.dqDevDashboardId;
        dqDashboardTitle = serverConfig.dqDevDashboardTitle;
    }

    const getDqUrl = () => {
        return (
            `${dqBaseUrl}/app/dashboards#/view/${dqDashboardId}?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-30d,to:now))` +
            `&_a=(filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),` +
            `query:(language:kuery,query:'dataset_name%20:%20%22${datasetName}%22%20'),timeRestore:!t,title:'${dqDashboardTitle}',viewMode:view)`
        );
    };

    const fetchConfigValues = useCallback(() => {
        setLoading(true);
        fetch('/config')
            .then(async (response) => {
                if (!response.ok) {
                    const data = await response.json();
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                response.json().then((data) => {
                    getServerConfigVar(data.config);
                });
                return Promise.resolve();
            })
            .catch((error) => {
                message.error(`Failed to fetch config! ${error}`);
            })
            .finally(() => setLoading(false));
    }, []);

    useMemo(() => {
        if (Object.keys(serverConfig).length === 0) {
            fetchConfigValues();
        }
    }, [fetchConfigValues, serverConfig]);

    return (
        <div>
            {loading && <Message type="loading" content="Loading..." />}
            {!loading && (
                <h4>
                    Click{' '}
                    <a href={getDqUrl()} target="_blank" rel="noreferrer">
                        here
                    </a>{' '}
                    to view quality metrics on Kibana dashboard. You can change the time period for which you want to
                    view the metrics on the dashboard
                </h4>
            )}
        </div>
    );
}
