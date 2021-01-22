import React, { useState, useEffect } from "react";
import {
    Typography,
    Theme,
    createStyles,
    makeStyles,
    Grid,
    Avatar,
    Tooltip,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    TableBody,
    Paper,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import UserEntity from "entities/userEntity";
import _ from "lodash";
import ToDoEntity from "entities/toDoEntity";
import { Add as AddIcon } from "@material-ui/icons";
import { Edit as EditIcon } from "@material-ui/icons";
import { Delete as DeleteIcon } from "@material-ui/icons";

/**
 * Styling
 */
const styles = (theme: Theme) =>
    createStyles({
        avatar: {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
        tableContainer: {
            marginTop: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        },
    });

const useStyles = makeStyles(styles);

/**
 * Types
 */
interface ParamTypes {
    userId: string;
}

function ToDoListPage(): React.ReactElement {
    const classes = useStyles();
    const history = useHistory();
    const { userId } = useParams<ParamTypes>();

    const [error, setErrors] = useState(undefined as string | Error | undefined);
    const [user, setUser] = useState(undefined as UserEntity);
    const [todos, setToDos] = useState(undefined as Array<ToDoEntity> | undefined);

    // Fetch User
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/users/${userId}`);

            setUser({} as UserEntity);
            if (response.status != 200) {
                setErrors(`Response Code: ${response.status}`);
            } else {
                response
                    .json()
                    .then((r) => setUser(r as UserEntity))
                    .catch((e) => {
                        setErrors(e);
                    });
            }
        }

        if (_.isNil(user)) {
            fetchData();
        }
    });

    // Fetch ToDos
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/todos/user/${user?.id}`);

            setErrors(undefined);
            setToDos(new Array<ToDoEntity>());
            if (response.status != 200) {
                setErrors(`Response Code: ${response.status}`);
            } else {
                response
                    .json()
                    .then((r) => r.map((x: unknown) => x as ToDoEntity))
                    .then((r) => setToDos(r))
                    .catch((e) => {
                        setErrors(e);
                    });
            }
        }

        if (_.isNil(todos) && !_.isNil(user?.id)) {
            fetchData();
        }
    });

    function onAddToDo() {
        console.log(`Add`);
        history.push(`/user/${user?.id}/todo`);
    }

    function onEditToDo(id: string) {
        console.log(`Edit: ${id}`);
        alert("Not Implemented");
    }

    function onDeleteToDo(id: string) {
        console.log(`Delete: ${id}`);
        alert("Not Implemented");
    }

    const element = (
        <>
            <Grid container>
                <Grid item xs={10}>
                    <Typography variant="h1">{`To Dos`}</Typography>
                </Grid>
                <Grid item container xs={2} justify="flex-end" alignItems="flex-end">
                    {!_.isNil(user) && !_.isEmpty(user) && (
                        <Tooltip title={`${user.firstName} ${user.lastName}`}>
                            <Avatar alt={`${user.firstName} ${user.lastName}`} className={classes.avatar}>
                                {user.firstName[0] + user.lastName[0]}
                            </Avatar>
                        </Tooltip>
                    )}
                </Grid>
            </Grid>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ToDoId</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>CreationDate</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="add" onClick={() => onAddToDo()}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!_.isNil(todos) &&
                            todos.map((row) => (
                                <TableRow key={row?.id}>
                                    <TableCell>{row?.id}</TableCell>
                                    <TableCell>{row?.content}</TableCell>
                                    <TableCell>{row?.creationDate}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit" onClick={() => onEditToDo(row?.id as string)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => onDeleteToDo(row?.id as string)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {error && <div>{error.toString()}</div>}
        </>
    );

    return element;
}

export default ToDoListPage;
