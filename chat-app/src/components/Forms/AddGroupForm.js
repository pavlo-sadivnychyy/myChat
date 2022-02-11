import React, {
  getDispatch, useState, useEffect, useGlobal,
} from 'reactn';
import { Form, withFormik } from 'formik';
import {
  Button, Chip, InputLabel, MenuItem, OutlinedInput, Select, TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

function AddGroupForm({
  setFieldValue, values, handleChange, allUsers, getUsers,
}) {
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
  const [user] = useGlobal('user');

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Form className="form">
      <Grid container>
        <Grid item xs={8}>
          <InputLabel style={{ paddingBottom: '5px' }}>Members</InputLabel>
          <Select
            style={{ width: '97%', height: '40px' }}
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={values.participants}
            onChange={(event) => {
              const arr = [];
              allUsers.forEach((item) => {
                if (
                  event.target.value.includes(
                    item,
                  )
                ) {
                  arr.push(item);
                }
              });
              setFieldValue(
                'participants',
                arr,
              );
            }}
            input={<OutlinedInput />}
            MenuProps={MenuProps}
            size="small"
            renderValue={(selected) => (
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                }}
              >
                {selected.map((value) => (
                  <Chip
                      key={value}
                      label={`${value.name} ${value.surname}`}
                      style={{ margin: 2 }}
                    />
                ))}
              </div>
            )}
          >
            {allUsers.map((item) => (
              (item._id !== user._id) && (
                <MenuItem
                  key={item._id}
                  value={item}
                >
                  {item.name}
                  {' '}
                  {item.surname}
                </MenuItem>
              )
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel style={{ paddingBottom: '5px' }}>Name</InputLabel>
          <TextField style={{ width: '97%' }} value={values.name} onChange={handleChange} name="name" size="small" id="outlined-basic" variant="outlined" />
        </Grid>
      </Grid>

      <Button style={{ marginTop: '15px' }} type="submit">Create Group</Button>

    </Form>
  );
}

const CheckedAddGroupForm = withFormik({
  mapPropsToValues: (props) => ({
    participants: [],
    currentUser: props.user._id,
    name: '',
    closeModal: props.modal.close,
    updateGroups: props.getGroups,
  }),
  handleSubmit(values) {
    const members = values.participants.map((item) => item._id);
    members.push(values.currentUser);
    axios.post('/groups', { members, name: values.name })
      .then((res) => {
        if (res.status === 200) {
          values.closeModal();
          values.updateGroups();
          getDispatch().openSnackbar({
            open: true,
            msg: 'Group successfully created',
            color: 'success',
          });
        } else {
          getDispatch().openSnackbar({
            open: true,
            msg: "Couldn't create group",
            color: 'warning',
          });
        }
      }).catch((err) => {
        getDispatch().openSnackbar({
          open: true,
          msg: "Couldn't create group",
          color: 'warning',
        });
      });
  },
})(AddGroupForm);

export default CheckedAddGroupForm;
