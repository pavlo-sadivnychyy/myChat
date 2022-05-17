import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import Groups from "./Groups";

const groups = [
    {
        _id: 1,
        name: "Test1"
    },
    {
        _id: 2,
        name: "Test2"
    },
    {
        _id: 3,
        name: "Test3"
    },
    {
        _id: 4,
        name: "Test4"
    }
]

const user = {
    createdAt: "2022-03-25T11:55:39.857Z",
    dob: "12/07/1998",
    email: "test2@gmail.com",
    file: "uploads/2022-03-25T11:55:39.847Z1 (1).jpeg",
    gender: "Female",
    languages: "English, Ukrainian",
    name: "Pavlo",
    nickname: "Sadik@1998",
    password: "12345678",
    phone_number: "0682152189",
    surname: "Sadivnychyy",
    updatedAt: "2022-03-25T11:55:39.857Z",
    __v: 0,
    _id: "623dadbb720ac28fd2f7c38f",
}

const setGroups = jest.fn();
const getGroups = jest.fn();
const defineActiveChat = jest.fn();
const getUsers = jest.fn();


describe('Groups component', () => {
    test("Groups renders", () => {
        render(
            <Groups
            user={user}
            getGroups={getGroups}
            groups={groups}
            setGroups={setGroups}
            defineActiveChat={defineActiveChat}
            allUsers
            getUsers={getUsers}
            activeChat
        />)
        expect(screen.getByRole("list")).toBeInTheDocument();
    })

    test("Groups renders without data", () => {
        render(
            <Groups
                user={user}
                getGroups={getGroups}
                groups={[]}
                setGroups={setGroups}
                defineActiveChat={defineActiveChat}
                allUsers
                getUsers={getUsers}
                activeChat
            />)
        expect(screen.getByRole("list")).toBeInTheDocument();
    })

    test("Define active chat by click", () => {
        render(
            <Groups
                user={user}
                getGroups={getGroups}
                groups={groups}
                setGroups={setGroups}
                defineActiveChat={defineActiveChat}
                allUsers
                getUsers={getUsers}
                activeChat
            />)

        userEvent.click(screen.getByText("#Test4"));
        expect(defineActiveChat).toHaveBeenCalledTimes(1);
    })
})
