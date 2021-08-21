import { makeStyles } from "@material-ui/core/styles"

export default makeStyles((theme) => ({
    mainContainer: {
        [theme.breakpoints.down('sm')]: {
            flexDirection="column-reverse",
        },
    },
}));