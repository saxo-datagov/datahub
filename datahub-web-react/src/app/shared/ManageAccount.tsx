import React from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useTheme } from 'styled-components';
import defaultAvatar from '../../images/default_avatar.png';
import { EntityType } from '../../types.generated';
import { useEntityRegistry } from '../useEntityRegistry';

interface Props {
    urn: string;
    pictureLink?: string;
}

const defaultProps = {
    pictureLink: undefined,
};

export const ManageAccount = ({ urn: _urn, pictureLink: _pictureLink }: Props) => {
    const entityRegistry = useEntityRegistry();
    const themeConfig = useTheme();

    const menu = (
        <Menu>
            {themeConfig.content.menu.items.map((value) => {
                return (
                    <Menu.Item key={value.label}>
                        <a href={value.path || ''} target={value.shouldOpenInNewTab ? '_blank' : ''} rel="noreferrer">
                            <div tabIndex={0} role="button">
                                {value.label}
                            </div>
                        </a>
                    </Menu.Item>
                );
            })}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <Link to={`/${entityRegistry.getPathName(EntityType.CorpUser)}/${_urn}`}>
                <Avatar
                    style={{
                        marginRight: '15px',
                        color: '#f56a00',
                        backgroundColor: '#fde3cf',
                    }}
                    src={_pictureLink || defaultAvatar}
                />
            </Link>
        </Dropdown>
    );
};

ManageAccount.defaultProps = defaultProps;
