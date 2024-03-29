import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Rating, RatingToText } from 'appConstants';

import { Values } from './types';
import { validation } from './validation';

import cssCommon from 'styles/common.module.css';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

        select: {
            minWidth: '300px'
        },

        date: {
            minWidth: '300px'
        },

        grid: {
            marginTop: '24px'
        },
        title: {
            fontWeight: 'bold',
        }
    }),
);

interface Props {
    onChange: (arg: {
        values: Values;
        isValid: boolean;
    }) => void;

    initialValues?: any;
}

function ProductForm({ onChange, initialValues }: Props) {
    const classes = useStyles();
    const [values, setValues] = React.useState<Values>(initialValues || {
        product: '',
        date: null,
        rating: '',
        wasUsed: '',
    });

    const handleDateChange = (date: Date | null) => {
        setValues(oldValues => ({
            ...oldValues,
            date,
        }));
    };
    const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const { name, value } = event.target;

        setValues(oldValues => ({
            ...oldValues,
            [name as string]: value,
        }));
    };

    React.useEffect(() => {
        onChange({
            values,
            isValid: validation(values),
        })
    }, [values, onChange]);

    return (
        <>
            <Typography variant="h6" gutterBottom className={classes.title}>
                PLEASE TELL US WHICH PRODUCT YOU'RE PURCHASED
            </Typography>

            <Grid container direction="column" spacing={5} className={classes.grid}>
                <Grid item xs={12}>
                    <div className={cssCommon.signFormField}>Which product did you purchase ?</div>

                    <InputLabel htmlFor="product-name"/>
                    <Select
                        className={classes.select}
                        value={values.product}
                        onChange={handleChange}
                        inputProps={{
                            name: 'product',
                            id: 'product-name',
                        }}
                    >
                        <MenuItem value="Product 1">Product 1</MenuItem>
                        <MenuItem value="Product 2">Product 2</MenuItem>
                        <MenuItem value="Product 3">Product 3</MenuItem>
                    </Select>
                </Grid>

                <Grid item xs={12}>
                    <div className={cssCommon.signFormField}>Date Purchased </div>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        name="date"
                        value={values.date}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        maxDate={new Date()}
                        minDate={new Date('2019-06-01')}
                        autoOk
                    />
                    </MuiPickersUtilsProvider>
                </Grid>

                <Grid item xs={12}>
                    <RadioGroup aria-label="rating" value={values.rating.toString()} onChange={handleChange}>
                        <FormControlLabel value={Rating.VERY_SATISFIED} control={<Radio />} name="rating" label={RatingToText(Rating.VERY_SATISFIED)} />
                        <FormControlLabel value={Rating.SOMEWHAT_SATISFIED} control={<Radio />} name="rating" label={RatingToText(Rating.SOMEWHAT_SATISFIED)} />
                        <FormControlLabel value={Rating.NEITHER_SATISFIED_NOR_DISSATISFIED} name="rating" control={<Radio />} label={RatingToText(Rating.NEITHER_SATISFIED_NOR_DISSATISFIED)} />
                        <FormControlLabel value={Rating.SOMEWHAT_DISSATISFIED} control={<Radio />} name="rating" label={RatingToText(Rating.SOMEWHAT_DISSATISFIED)} />
                        <FormControlLabel value={Rating.VERY_DISSATISFIED} control={<Radio />} name="rating" label={RatingToText(Rating.VERY_DISSATISFIED)} />
                    </RadioGroup>
                </Grid>

                <Grid item xs={12}>
                    <div className={cssCommon.signFormField}>Have you been using this product for at least 7 days ?</div>

                    <RadioGroup aria-label="have using" value={values.wasUsed} onChange={handleChange}>
                        <FormControlLabel value="Yes" control={<Radio />} name="wasUsed" label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} name="wasUsed" label="No" />
                    </RadioGroup>
                </Grid>

            </Grid>
        </>
    );
}

export default ProductForm;
