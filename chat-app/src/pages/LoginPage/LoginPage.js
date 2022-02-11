import React from "react";
import {useFormik} from "formik";
import './LoginPage.scss'
import {useHistory} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";
import {getDispatch, setGlobal} from "reactn";
import CustomInput from "../../components/CustomInput";
import {FormHelperText} from "@material-ui/core";
import {loginSchema} from "../../validation";




function LoginPage(){
    const history = useHistory();
    const [, setCookie] = useCookies(['jwt']);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async values => {
            await axios.post("/auth/login", values)
                .then((res) => {
                        if(res.status === 200){
                            setGlobal({
                                user: res.data.user
                            })
                            setCookie("jwt", res.data.accessToken, {
                                maxAge: 28800, // expire after 8 hrs
                            });
                            history.push('/messages')
                        }
                        if(res.status === 404) {
                            getDispatch().openSnackbar({
                                open: true,
                                msg: "User not found",
                                color: "warning",
                            });
                        }
                    }
                )
                .catch((err) => {
                    getDispatch().openSnackbar({
                        open: true,
                        msg: "User not found",
                        color: "warning",
                    });
                });
        },
        validationSchema: loginSchema
    });



    return(
        <div className="login">
            <div className='modal'>
                <form onSubmit={formik.handleSubmit}>
                    <div className="header">
                        <h1>Log In</h1>
                    </div>
                    <CustomInput
                        label='Email'
                        id="email"
                        name="email"
                        type="text"
                        placeholder="Type your email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={
                            formik.errors.email &&
                            formik.touched.email
                        }
                    />
                    {formik.errors.email &&
                        formik.touched.email && (
                            <FormHelperText
                                style={{
                                    margin: '0 0 0 5px',
                                    fontSize: "11px",
                                    color: "#f44336",
                                }}>
                                {formik.errors.email}
                            </FormHelperText>
                        )}
                    <br/>

                    <CustomInput
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Type your password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={
                            formik.errors.password &&
                            formik.touched.password
                        }
                    />
                    {formik.errors.password &&
                        formik.touched.password && (
                            <FormHelperText
                                style={{
                                    margin: '0 0 0 5px',
                                    fontSize: "11px",
                                    color: "#f44336",
                                }}>
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    <br/>
                    <div className="register">
                        <p onClick={() => history.push('/registration')}>Створити акаунт -></p>
                    </div>
                    <div className="button-submit">
                        <button type="submit">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default LoginPage;