import React from "reactn";
import {Form, withFormik} from "formik";
import {Button, Chip, InputLabel, MenuItem, OutlinedInput, Select, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const AddGroupForm = ({setFieldValue, values, handleChange}) => {

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    return (
        <Form className='form' >
            <Grid container>
                <Grid item xs={8}>
                    <InputLabel style={{paddingBottom: '5px'}}>Members</InputLabel>
                    <Select
                        style={{width: '97%', height: '40px'}}
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={values.participants}
                        onChange={(event) => {
                            const arr = [];
                            setFieldValue(
                                "participants",
                                arr
                            );
                        }}
                        input={<OutlinedInput/>}
                        MenuProps={MenuProps}
                        size="small"
                        renderValue={(selected) => (
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                }}>
                                    <Chip/>
                            </div>
                        )}
                    >
                                <MenuItem>
                                    Pavlo Sadivnychyy
                                </MenuItem>
                            )
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel style={{paddingBottom: '5px'}}>Name</InputLabel>
                    <TextField style={{width: '97%'}} value={values.name} onChange={handleChange} name="name" size="small" id="outlined-basic"  variant="outlined" />
                </Grid>
            </Grid>


            <Button style={{marginTop: '15px'}} type='submit'>Create Group</Button>



        </Form>
    );
};

const CheckedAddGroupForm = withFormik({
    mapPropsToValues: (props) => ({
    participants: [],
    name: '',
    closeModal: props.modal.close,
    }),
    handleSubmit(values) {

    },
})(AddGroupForm);

export default CheckedAddGroupForm;
