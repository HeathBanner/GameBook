import React, { createContext } from 'react';

import useTheme from '@material-ui/core/styles/useTheme';
import useMediaQuery from '@material-ui/core/useMediaQuery'

export const MediaContext = createContext();

export const MediaProvider = (props) => {

    const theme = useTheme();

    const xl = useMediaQuery(theme.breakpoints.up('lg'))
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <MediaContext.Provider value={{ xl, lg, md, sm, xs }} >
            { props.children }
        </MediaContext.Provider>
    );
};
