import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Theme, createStyles, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import _ from "lodash";

/**
 * Styling
 */
const styles = (theme: Theme) =>
    createStyles({
        body: {
            marginTop: theme.spacing(1),
        },
        box: {
            margin: theme.spacing(1),
        },
    });

const useStyles = makeStyles(styles);

/**
 * Types
 */
type FormField = {
    value: string;
    error: string | undefined;
    label: string;
    isRequired: boolean;
};

type FormData = {
    firstName: FormField;
    lastName: FormField;
    email: FormField;
};

/**
 * Defaults
 */
const defaultFormData = {
    firstName: {
        value: "",
        error: "",
        label: "First Name",
        isRequired: true,
    },
    lastName: {
        value: "",
        error: "",
        label: "Last Name",
        isRequired: true,
    },
    email: {
        value: "",
        error: "",
        label: "Email",
        isRequired: true,
    },
} as FormData;

function UserProfilePage(): React.ReactElement {
    const classes = useStyles();
    const history = useHistory();
    const [error, setErrors] = useState(undefined as string | Error | undefined);
    const [formData, setFormData] = useState(defaultFormData);

    function navigateBack() {
        if (history.length > 0) {
            history.goBack();
        } else {
            history.push("/");
        }
    }

    async function postDataAsync(data: FormData) {
        // Clear error state
        setErrors(undefined);

        const user = {
            firstName: data?.firstName?.value,
            lastName: data?.lastName?.value,
            email: data?.email?.value,
        };

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        };
        const response = await fetch("/api/users", requestOptions);

        if (response.status >= 200 && response.status <= 299) {
            navigateBack();
        } else {
            setErrors(`Response Code: ${response.status}`);
        }
    }

    function validate() {
        const next = { ...formData };
        let isValid = true;

        Object.keys(next).forEach((key) => {
            const formField = next[key as keyof FormData] as FormField;

            if (formField.isRequired && _.isEmpty(formField.value)) {
                formField.error = `${formField.label} is a required field.`;
                isValid = false;
            } else {
                formField.error = undefined;
            }
        });

        setFormData(next);

        return isValid;
    }

    function onAdd() {
        const isValid = validate();
        if (isValid) {
            postDataAsync(formData);
        }
    }

    function onCancel() {
        navigateBack();
    }

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const next = { ...formData };

        next[e.target.id as keyof FormData].value = e.target.value as string;

        setFormData(next);
    }

    const element = (
        <div id="Container">
            <Typography id={"Title"} variant="h1">
                User
            </Typography>
            <form id="Form">
                <Grid id="FormGrid" container={true} spacing={3} className={classes.body}>
                    {Object.keys(formData).map((key) => {
                        const formField = formData[key as keyof FormData] as FormField;
                        return (
                            <Grid key={key} id={`FormGridItem-${key}`} item={true} xs={12}>
                                <TextField
                                    id={key}
                                    label={formField.label}
                                    required={formField.isRequired}
                                    error={!_.isEmpty(formField.error)}
                                    helperText={formField.error}
                                    fullWidth
                                    onChange={(e) => onChange(e)}
                                />
                            </Grid>
                        );
                    })}
                    <Grid item xs={12} container={true} justify="flex-end" alignItems="flex-end">
                        <Button className={classes.box} variant="contained" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button className={classes.box} variant="contained" color="primary" onClick={onAdd}>
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {error && <div>{error.toString()}</div>}
        </div>
    );

    return element;
}

export default UserProfilePage;
