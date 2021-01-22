import React, { useState } from "react";
import { Container, TextField, Typography, Theme, createStyles, makeStyles, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import UserEntity from "entities/userEntity";

/**
 * Styling
 */
const styles = (theme: Theme) =>
    createStyles({
        content: {
            marginTop: theme.spacing(3),
        },
    });

const useStyles = makeStyles(styles);

function HomePage(): React.ReactElement {
    const classes = useStyles();
    const history = useHistory();

    const [error, setErrors] = useState(undefined as string | Error | undefined);
    const [email, setEmail] = useState(undefined as string | undefined);

    async function findUser(email: string): Promise<UserEntity> {
        if (_.isNil(email) || _.isEmpty(email)) {
            throw `Invalid email address ${email}.`;
        }

        const response = await fetch(`/api/users/email/${email}`);

        if (response.status != 200) {
            setErrors(`Response Code: ${response.status}`);
        } else {
            return response.json();
        }
    }

    function onNext() {
        setErrors(undefined);
        findUser(email as string)
            .then((u) => {
                if (!_.isNil(u)) {
                    history.push(`/user/${u.id}/todos`);
                } else {
                    setErrors("User not found.");
                }
            })
            .catch((e) => setErrors(e));
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setEmail(e.target.value);
    }

    const element = (
        <>
            <Typography variant="h1">To Do Service</Typography>
            <Container className={classes.content} maxWidth="xs">
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Please enter your email address.</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            label="Email Address"
                            fullWidth
                            onChange={(e) => onChange(e)}
                        ></TextField>
                    </Grid>
                    <Grid item container xs={12} justify="flex-end" alignItems="flex-end">
                        <Button variant="contained" color="primary" onClick={() => onNext()}>
                            Next
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            {error && <div>{error.toString()}</div>}
        </>
    );

    return element;
}

export default HomePage;
