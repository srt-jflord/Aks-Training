import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { theme } from "./styles/theme";
import { Paper, Container, Theme, createStyles, makeStyles, CssBaseline, ThemeProvider } from "@material-ui/core";
import HomePage from "pages/HomePage";
import ToDoListPage from "pages/ToDoListPage";
import ToDoPage from "pages/ToDoPage";

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
                                <Route path="/user/:userId/todos">
                                    <ToDoListPage />
                                </Route>
                                <Route path="/user/:userId/todo/:todoId?">
                                    <ToDoPage />
                                </Route>
                                <Route path="/">
                                    <HomePage />
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
