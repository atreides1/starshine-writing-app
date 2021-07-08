import { makeStyles} from '@material-ui/core';

const drawerWidth = 240;

const customStyles = makeStyles((theme) => {
    return {
        root: {
            display: 'flex',
            padding: 20,
        },
        logo: {
            flexGrow: 1,
        },
        tab: {
            listStyle: "none",
            cursor: "pointer"
        },
        field: {
            marginTop: 20,
            marginBottom: 20,
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        appBar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar 
    }
})

export default customStyles;