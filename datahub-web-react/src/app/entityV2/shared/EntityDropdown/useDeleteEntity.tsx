import { Modal, message } from 'antd';
import { useState } from 'react';

import analytics, { EventType } from '@app/analytics';
import { useHandleDeleteDomain } from '@app/entityV2/shared/EntityDropdown/useHandleDeleteDomain';
import { useGlossaryEntityData } from '@app/entityV2/shared/GlossaryEntityContext';
import { removeTermFromGlossaryNode } from '@app/glossaryV2/cacheUtils';
import { getParentNodeToUpdate, updateGlossarySidebar } from '@app/glossaryV2/utils';
import { getDeleteEntityMutation } from '@app/shared/deleteUtils';
import { useEntityRegistry } from '@app/useEntityRegistry';

import { EntityType } from '@types';

/**
 * Performs the flow for deleting an entity of a given type.
 *
 * @param urn the type of the entity to delete
 * @param type the type of the entity to delete
 * @param name the name of the entity to delete
 */
function useDeleteEntity(
    urn: string,
    type: EntityType,
    entityData: any,
    onDelete?: () => void,
    hideMessage?: boolean,
    skipWait?: boolean,
) {
    const [hasBeenDeleted, setHasBeenDeleted] = useState(false);
    const entityRegistry = useEntityRegistry();
    const { isInGlossaryContext, urnsToUpdate, setUrnsToUpdate } = useGlossaryEntityData();
    const { handleDeleteDomain } = useHandleDeleteDomain({ entityData, urn });

    const [deleteEntity, { client }] = getDeleteEntityMutation(type)() ?? [undefined, { client: undefined }];

    function handleDeleteEntity() {
        deleteEntity?.({ variables: { urn } })
            .then(() => {
                analytics.event({
                    type: EventType.DeleteEntityEvent,
                    entityUrn: urn,
                    entityType: type,
                });
                if (!hideMessage && !skipWait) {
                    message.loading({
                        content: 'Deleting...',
                        duration: 2,
                    });
                }

                if (type === EntityType.Domain) {
                    handleDeleteDomain();
                }

                setTimeout(
                    () => {
                        setHasBeenDeleted(true);
                        onDelete?.();
                        if (isInGlossaryContext) {
                            const parentNodeToUpdate = getParentNodeToUpdate(entityData, type);
                            updateGlossarySidebar([parentNodeToUpdate], urnsToUpdate, setUrnsToUpdate);
                            if (client) {
                                removeTermFromGlossaryNode(client, parentNodeToUpdate, urn);
                            }
                        }
                        if (!hideMessage) {
                            message.success({
                                content: `Deleted ${entityRegistry.getEntityName(type)}!`,
                                duration: 2,
                            });
                        }
                    },
                    skipWait ? 0 : 2000,
                );
            })
            .catch((e) => {
                message.destroy();
                message.error({ content: `Failed to delete: \n ${e.message || ''}`, duration: 3 });
            });
    }

    function onDeleteEntity() {
        Modal.confirm({
            title: `Delete ${
                (entityData && entityRegistry.getDisplayName(type, entityData)) || entityRegistry.getEntityName(type)
            }`,
            content: `Are you sure you want to remove this ${entityRegistry.getEntityName(type)}?`,
            onOk() {
                handleDeleteEntity();
            },
            onCancel() {},
            okText: 'Yes',
            maskClosable: true,
            closable: true,
        });
    }

    return { onDeleteEntity, hasBeenDeleted };
}

export default useDeleteEntity;
