import {fireEvent, getByRole, getByText, getByTitle, render, screen, waitFor} from "@testing-library/react";
import Groups from "../Groups";
import Chat from "./Chat";
import React from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import {configure, mount, shallow} from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {Formik} from "formik";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";


const setMessages = jest.fn();
const setCurrentPage = jest.fn();
const updateMessages = jest.fn();
const onSubmit = jest.fn();


describe("Chat component", () => {
    configure({adapter: new Adapter()});
    test("Chat component without data", async () => {
        const form = mount(
            <Chat
            setMessages={setMessages}
            setCurrentPage={setCurrentPage}
            socket
            updateMessages={updateMessages}
            currentUser
            messages={[]}
            activeChat
        />);
        const messageInput = form.find("input[name='message']");
            messageInput.simulate('change', {
                persist: () => {},
                target: {
                    name: 'message',
                    value: 'test'
                }
            });
        await waitFor(() =>
            expect(messageInput.html()).toMatch('test')
        )
    })
})
