import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => {
    return ({
        root: {
            margin: '0',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '90%',
                margin: '2rem auto'
            },
            [theme.breakpoints.up('md')]: {
                width: '70%'
            },
            [theme.breakpoints.up('lg')]: {
                width: '60%'
            },
            [theme.breakpoints.up('xl')]: {
                width: '50%'
            }
        }
    });
});
