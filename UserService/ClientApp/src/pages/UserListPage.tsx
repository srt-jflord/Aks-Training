import React, { useState, useEffect } from "react";
import {
    Paper,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Theme,
    createStyles,
    makeStyles,
    IconButton,
} from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { Edit as EditIcon } from "@material-ui/icons";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import _ from "lodash";

/**
 * Styling
 */
const styles = (theme: Theme) =>
    createStyles({
        tableContainer: {
            marginTop: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        },
    });

const useStyles = makeStyles(styles);

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};

function UserListPage(): React.ReactElement {
    const classes = useStyles();
    const history = useHistory();
    const [error, setErrors] = useState(undefined as string | Error | undefined);
    const [users, setUsers] = useState(undefined as Array<User> | undefined);

    // Fetch Users
    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/users");

            if (response.status != 200) {
                setUsers(new Array<User>());
                setErrors(`Response Code: ${response.status}`);
            } else {
                response
                    .json()
                    .then((r) => r.map((x: unknown) => x as User))
                    .then((r) => setUsers(r))
                    .catch((e) => {
                        setUsers(new Array<User>());
                        setErrors(e);
                    });
            }
        }

        if (_.isNil(users)) {
            fetchData();
        }
    });

    function onAddUser() {
        history.push("/user");
    }

    function onEditUser(id: string) {
        console.log(`Edit: ${id}`);
        alert("Not Implemented");
    }

    function onDeleteUser(id: string) {
        console.log(`Delete: ${id}`);
        alert("Not Implemented");
    }

    const element = (
        <>
            <Typography variant="h1">User Service</Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>UserId</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="add" onClick={() => onAddUser()}>
                                    <AddIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!_.isNil(users) &&
                            (users ?? new Array<User>()).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.firstName}</TableCell>
                                    <TableCell>{row.lastName}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell align="right">
                                        <IconButton aria-label="edit" onClick={() => onEditUser(row.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => onDeleteUser(row.id)}>
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

export default UserListPage;
