import React from 'react';
import { useFormik } from 'formik';
import '../LoginPage/LoginPage.scss';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './RegistrationPage.scss';
import { FormHelperText } from '@material-ui/core';
import { registrationSchema } from '../../validation';
import CustomInput from '../../components/CustomInput';

function RegistrationPage() {
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      nickname: '',
      email: '',
      password: '',
      phone_number: '',
      dob: '',
      gender: '',
      languages: '',
      file: null,
    },
    onSubmit: (values) => {
      const fd = new FormData();
      fd.append('name', values.name);
      fd.append('surname', values.surname);
      fd.append('nickname', values.nickname);
      fd.append('email', values.email);
      fd.append('password', values.password);
      fd.append('phone_number', values.phone_number);
      fd.append('dob', values.dob);
      fd.append('gender', values.gender);
      fd.append('languages', values.languages);
      fd.append('file', values.file, values.file.name);

      axios.post('/users', fd, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (res.status === 200) {
            history.push('/login');
          }
        });
    },
    validationSchema: registrationSchema,
  });

  return (
    <div className="registration">
      <div className="modal">
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="header">
            <h1>Registration</h1>
          </div>
          <div className="data-container">
            <div>
              <CustomInput
                label="Name"
                id="name"
                name="name"
                type="text"
                placeholder="Type your name"
                onChange={formik.handleChange}
                value={formik.values.name}
                error={
                                    formik.errors.name
                                    && formik.touched.name
                                }
              />
              {formik.errors.name
                                && formik.touched.name && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.name}
                                </FormHelperText>
              )}

            </div>

            <div>
              <CustomInput
                label="Surname"
                id="surname"
                name="surname"
                type="text"
                placeholder="Type your surname"
                onChange={formik.handleChange}
                value={formik.values.surname}
                error={
                                    formik.errors.surname
                                    && formik.touched.surname
                                }
              />
              {formik.errors.surname
                                && formik.touched.surname && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.surname}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Nickname"
                id="nickname"
                name="nickname"
                type="text"
                placeholder="Type your nickname"
                onChange={formik.handleChange}
                value={formik.values.nickname}
                error={
                                    formik.errors.nickname
                                    && formik.touched.nickname
                                }
              />
              {formik.errors.nickname
                                && formik.touched.nickname && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.nickname}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Email"
                id="email"
                name="email"
                type="text"
                placeholder="Type your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={
                                    formik.errors.email
                                    && formik.touched.email
                                }
              />
              {formik.errors.email
                                && formik.touched.email && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.email}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="Type your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={
                                    formik.errors.password
                                    && formik.touched.password
                                }
              />
              {formik.errors.password
                                && formik.touched.password && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.password}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Phone number"
                id="phone_number"
                name="phone_number"
                type="text"
                placeholder="Type your phone number"
                onChange={formik.handleChange}
                value={formik.values.phone_number}
                error={
                                    formik.errors.phone_number
                                    && formik.touched.phone_number
                                }
              />
              {formik.errors.phone_number
                                && formik.touched.phone_number && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.phone_number}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Date of birth"
                id="dob"
                name="dob"
                type="text"
                placeholder="Type your date of birth"
                onChange={formik.handleChange}
                value={formik.values.dob}
                error={
                                    formik.errors.dob
                                    && formik.touched.dob
                                }
              />
              {formik.errors.dob
                                && formik.touched.dob && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.dob}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Gender"
                id="gender"
                name="gender"
                type="text"
                placeholder="Type your gender"
                onChange={formik.handleChange}
                value={formik.values.gender}
                error={
                                    formik.errors.gender
                                    && formik.touched.gender
                                }
              />
              {formik.errors.gender
                                && formik.touched.gender && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.gender}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Languages"
                id="languages"
                name="languages"
                type="text"
                placeholder="Type your languages"
                onChange={formik.handleChange}
                value={formik.values.languages}
                error={
                                    formik.errors.languages
                                    && formik.touched.languages
                                }
              />
              {formik.errors.languages
                                && formik.touched.languages && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.languages}
                                </FormHelperText>
              )}
            </div>
            <div>
              <CustomInput
                label="Image"
                id="file"
                name="file"
                type="file"
                placeholder="Type your languages"
                onChange={(event) => formik.setFieldValue('file', event.currentTarget.files[0])}
                error={
                                    formik.errors.file
                                    && formik.touched.file
                                }
              />
              {formik.errors.file
                                && formik.touched.file && (
                                <FormHelperText
                                  style={{
                                    margin: '0 0 0 5px',
                                    fontSize: '11px',
                                    color: '#f44336',
                                  }}
                                >
                                  {formik.errors.file}
                                </FormHelperText>
              )}
            </div>
            {/* <div> */}

            {/*    /!*<Button*!/ */}
            {/*    /!*    variant="contained"*!/ */}
            {/*    /!*    component="label"*!/ */}
            {/*    /!*>*!/ */}
            {/*    /!*    Upload File*!/ */}
            {/*        <input */}
            {/*            id="file" */}
            {/*            name="file" */}
            {/*            type="file" */}
            {/*            placeholder="Type your languages" */}
            {/*            onChange={(event) => { */}
            {/*                formik.setFieldValue("file", event.currentTarget.files[0]); */}
            {/*            }} */}
            {/*            value={formik.values.image} */}
            {/*            // hidden */}
            {/*        /> */}
            {/*    /!*</Button>*!/ */}

            {/*    /!*<label htmlFor='image'>Languages</label><br/>*!/ */}
            {/*    /!*<input*!/ */}
            {/*    /!*    id="image"*!/ */}
            {/*    /!*    name="image"*!/ */}
            {/*    /!*    type="file"*!/ */}
            {/*    /!*    placeholder="Type your languages"*!/ */}
            {/*    /!*    onChange={(event) => {*!/ */}
            {/*    /!*        setFieldValue("file", event.currentTarget.files[0]);*!/ */}
            {/*    /!*    }}*!/ */}
            {/*    /!*    value={formik.values.image}*!/ */}
            {/*    /! *//* /}
                        {/*</div> */}

          </div>
          <br />
          <div className="button-submit">
            <button type="submit">REGISTER</button>
          </div>

        </form>
      </div>
    </div>
  );
}
export default RegistrationPage;
