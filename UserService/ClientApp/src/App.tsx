import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "./styles/theme";

import { Paper, Container, Theme, createStyles, makeStyles, CssBaseline, ThemeProvider } from "@material-ui/core";
import UserProfilePage from "./pages/UserProfilePage";
import UserListPage from "./pages/UserListPage";

/**
 * Styling
 */
const styles = (theme: Theme) =>
    createStyles({
        paper: {
            margin: theme.spacing(3),
            padding: theme.spacing(3),
        },
    });

const useStyles = makeStyles(styles);

function App(): React.ReactElement {
    const classes = useStyles();

    const element = (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container id="Container" maxWidth="lg">
                <Paper id="Paper" className={classes.paper}>
                    <Router>
                        <div>
                            <Switch>
                                <Route path="/user">
                                    <UserProfilePage />
                                </Route>
                                <Route path="/users">
                                    <UserListPage />
                                </Route>
                                <Route path="/">
                                    <UserListPage />
                                </Route>
                            </Switch>
                        </div>
                    </Router>
                </Paper>
            </Container>
        </ThemeProvider>
    );

    return element;
}

export default App;
