import React, {
  getDispatch, useEffect, useGlobal, useState,
} from 'reactn';
import { Form, withFormik } from 'formik';
import {
  Button, Chip, InputLabel, MenuItem, OutlinedInput, Select, TextField,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

function AddTeamForm({ setFieldValue, values, handleChange }) {
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

  const [conversations, setConversations] = useState([]);
  const [user] = useGlobal('user');

  const [data, setData] = useState([]);

  useEffect(async () => {
    await axios.get(`/conversations/${user._id}`)
      .then((res) => {
        setConversations(res.data);
      });
    values.currentUser = user._id;
  }, [user]);

  useEffect(async () => {
    for (let i = 0; i < conversations.length; i++) {
      const friendId = conversations[i].members.find((item) => item !== user._id);
      await axios.get(`/users/${friendId}`)
        .then((res) => setData((prev) => [...prev, { name: res.data?.name, surname: res.data?.surname, conversationId: conversations[i]._id }]));
    }
  }, [conversations]);

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
            value={values.conversations}
            onChange={(event) => {
              const arr = [];
              data.forEach((item) => {
                if (
                  event.target.value.includes(
                    item,
                  )
                ) {
                  arr.push(item);
                }
              });
              setFieldValue(
                'conversations',
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
                      key={value._id}
                      label={`${value.name} ${value.surname}`}
                      style={{ margin: 2 }}
                    />
                ))}
              </div>
            )}
          >
            {data.map((item) => (
              <MenuItem
                key={item._id}
                value={item}
              >
                {item.name}
                {' '}
                {item.surname}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={4}>
          <InputLabel style={{ paddingBottom: '5px' }}>Name</InputLabel>
          <TextField style={{ width: '97%' }} value={values.name} onChange={handleChange} name="name" size="small" id="outlined-basic" variant="outlined" />
        </Grid>
      </Grid>

      <Button style={{ marginTop: '15px' }} type="submit">Create Team</Button>

    </Form>
  );
}

const CheckedAddTeamForm = withFormik({
  mapPropsToValues: (props) => ({
    conversations: [],
    name: '',
    currentUser: null,
    closeModal: props.modal.close,
    updateTeams: props.getTeams,
  }),

  handleSubmit(values) {
    const conversations = values.conversations.map((item) => item.conversationId);
    const payload = { conversationId: conversations, name: values.name, userId: values.currentUser };
    axios.post('/teams', payload)
      .then((res) => {
        if (res.status === 200) {
          values.closeModal();
          values.updateTeams();
          getDispatch().openSnackbar({
            open: true,
            msg: 'Team successfully created',
            color: 'success',
          });
        } else {
          getDispatch().openSnackbar({
            open: true,
            msg: "Couldn't create team",
            color: 'warning',
          });
        }
      }).catch((err) => {
        getDispatch().openSnackbar({
          open: true,
          msg: "Couldn't create team",
          color: 'warning',
        });
      });
  },
})(AddTeamForm);

export default CheckedAddTeamForm;
