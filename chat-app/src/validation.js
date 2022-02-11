import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
    name: Yup.string().required("Name Required"),
    surname: Yup.string().required("Surname Required"),
    nickname: Yup.string().required("Nickname Required"),
    email: Yup.string().email("Please enter a valid email").required("Email is Required"),
    password: Yup.string().required("Password Required"),
    phone_number: Yup.string().required("Phone number Required"),
    dob: Yup.string().required("DOB Required"),
    gender: Yup.string().required("Gender Required"),
    languages: Yup.string().required("Languages Required"),
    file: Yup.string().nullable()
});

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid email").required("Email is Required"),
    password: Yup.string().required("Password Required"),
})
const messageSchema = Yup.object().shape({
    message: Yup.string().required()
})

export {
    registrationSchema,
    loginSchema,
    messageSchema
};
