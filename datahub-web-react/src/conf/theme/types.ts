export type Theme = {
    styles: {
        'border-radius-base': string;
        'layout-header-background': string;
        'layout-header-color': string;
        'layout-body-background': string;
        'component-background': string;
        'body-background': string;
        'border-color-base': string;
        'text-color': string;
        'text-color-secondary': string;
        'heading-color': string;
        'background-color-light': string;
        'divider-color': string;
        'disabled-color': string;
        'steps-nav-arrow-color': string;
        'homepage-background-upper-fade': string;
        'homepage-background-lower-fade': string;
        'box-shadow': string;
        'box-shadow-hover': string;
        'preview-page'?: {
            logo?: {
                enable: boolean;
                style: { [key: string]: string };
            };
            description?: {
                enable: boolean;
                noDescriptionText: string;
                style: { [key: string]: string };
            };
        };
        pagination?: {
            defaultCurrent: number;
            defaultPageSize: number;
            hideOnSinglePage: number;
            pageSizeOptions: Array<number>;
            responsive: boolean;
            showQuickJumper: boolean;
            showSizeChange: boolean;
            showTitle: boolean;
            showTotal: boolean;
        };
    };
    assets: {
        logoUrl: string;
    };
    content: {
        title: string;
        homepage: {
            homepageMessage: string;
        };
        search: {
            searchbarMessage: string;
        };
        menu: {
            items: {
                label: string;
                path: string;
                shouldOpenInNewTab: boolean;
            }[];
        };
    };
};
