import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import List from "./List";
import React from "react";


const setNotifications = jest.fn();
const setConversations = jest.fn();
const defineActiveChat = jest.fn();
const setTeamActive = jest.fn();
const getAllUserConversations = jest.fn();
const getUsers = jest.fn();
const getConversationsOfActiveTeam = jest.fn();

const activeChat = {
    user_info: [
        {
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
            _id: "623dadbb720ac28fd2f7c38f"
        }
    ]
}

const allUsers = [
    {
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
]

const conversations = [
    {
        createdAt: "2022-03-29T11:17:04.597Z",
        important: true,
        members: ['623dadbb720ac28fd2f7c38f', '6242e5df720ac28fd2f7c3a2'],
        message:[
            {_id: '6242eab7720ac28fd2f7c414', conversationId: '6242eab0720ac28fd2f7c40f', sender: '623dadbb720ac28fd2f7c38f', text: 'Heelo', type: 'text'},
            {_id: '626674d312e95341e46dd730', conversationId: '6242eab0720ac28fd2f7c40f', sender: '623dadbb720ac28fd2f7c38f', text: 'сіаффавіфавфвіфіфвфівфівіфвіфвіфв', type: 'text'},
            {_id: '626674e212e95341e46dd736', conversationId: '6242eab0720ac28fd2f7c40f', sender: '623dadbb720ac28fd2f7c38f', text: 'івдлофілотіфлофлвдотфівлофтілофивдлофіивдлофіивдлофіивдлоіифвлдофіивдлфіоив', type: 'text'}
        ],
        updatedAt: "2022-04-25T10:15:15.299Z",
        user_info: [
            {_id: '623dadbb720ac28fd2f7c38f', name: 'Pavlo', surname: 'Sadivnychyy', nickname: 'Sadik@1998', email: 'test2@gmail.com'},
            {_id: '6242e5df720ac28fd2f7c3a2', name: 'Vadym', surname: 'Chernetskiy', nickname: 'Vadik', email: 'vadik@gmail.com'}
        ],
        __v: 0,
        _id: "6242eab0720ac28fd2f7c40f"
    }
]

const activeTeam = {
    conversations: ['6242eab0720ac28fd2f7c40f'],
    createdAt: "2022-03-29T11:18:33.391Z",
    name: "test",
    updatedAt: "2022-03-29T11:18:33.391Z",
    userId: "623dadbb720ac28fd2f7c38f",
    __v: 0,
    _id: "6242eb09720ac28fd2f7c434"
}

describe('List component', () => {
    test("List renders without data", () => {
        render(
            <List
                setNotifications={setNotifications}
                notifications
                setConversations={setConversations}
                activeUsers
                activeChat={activeChat}
                defineActiveChat={defineActiveChat}
                setTeamActive={setTeamActive}
                activeTeam
                allUsers={[]}
                getAllUserConversations={getAllUserConversations}
                getUsers={getUsers}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
                conversations={[]}
            />)
        const { container } = render(<ul className="chats-list-container"/>)
        expect(container.firstChild.classList.contains('chats-list-container')).toBe(true)
    })

    test("List renders with data", () => {
        render(
            <List
                setNotifications={setNotifications}
                notifications
                setConversations={setConversations}
                activeUsers={[]}
                activeChat={activeChat}
                defineActiveChat={defineActiveChat}
                setTeamActive={setTeamActive}
                activeTeam={activeTeam}
                allUsers={allUsers}
                getAllUserConversations={getAllUserConversations}
                getUsers={getUsers}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
                conversations={conversations}
            />)
        const { container } = render(<ul className="chats-list-container"/>)
        expect(container.firstChild.classList.contains('chats-list-container')).toBe(true)
    })
})
