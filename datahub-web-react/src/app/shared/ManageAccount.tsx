import React from 'react';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { EntityType } from '../../types.generated';
import { useEntityRegistry } from '../useEntityRegistry';
import CustomAvatar from './avatar/CustomAvatar';

const MenuItem = styled(Menu.Item)`
    && {
        margin-top: 2px;
    }
    & > a:visited,
    & > a:active,
    & > a:focus {
        clear: both;
        border: none;
        outline: 0;
    }
`;

const DownArrow = styled(CaretDownOutlined)`
    vertical-align: -5px;
    font-size: 16px;
    color: #fff;
`;

interface Props {
    urn: string;
    pictureLink?: string;
    name?: string;
}

const defaultProps = {
    pictureLink: undefined,
};

export const ManageAccount = ({ urn: _urn, pictureLink: _pictureLink, name }: Props) => {
    const entityRegistry = useEntityRegistry();
    const themeConfig = useTheme();
    const menu = (
        <Menu>
            {themeConfig.content.menu.items.map((value) => {
                if (value.isRoute) {
                    return (
                        <Menu.Item key={value.label}>
                            <Link to={value.path}>
                                <div tabIndex={0} role="button">
                                    {value.label}
                                </div>
                            </Link>
                        </Menu.Item>
                    );
                }
                return (
                    <MenuItem key={value.label}>
                        <a
                            href={value.path || ''}
                            target={value.shouldOpenInNewTab ? '_blank' : ''}
                            rel="noopener noreferrer"
                            tabIndex={0}
                        >
                            {value.label}
                        </a>
                    </MenuItem>
                );
            })}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <Link to={`/${entityRegistry.getPathName(EntityType.CorpUser)}/${_urn}`}>
                <CustomAvatar photoUrl={_pictureLink} style={{ marginRight: 5 }} name={name} />
                <DownArrow />
            </Link>
        </Dropdown>
    );
};

ManageAccount.defaultProps = defaultProps;
