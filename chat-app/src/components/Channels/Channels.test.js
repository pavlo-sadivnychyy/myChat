import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Channels from "./Channels";


const setTeams = jest.fn()
const setGroups = jest.fn()
const setConversations = jest.fn()
const getUsers = jest.fn()
const defineActiveChat = jest.fn()
const setTeamActive = jest.fn()
const getConversationsOfActiveTeam = jest.fn();
const getGroups = jest.fn()
const getTeams = jest.fn()


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

const groups = [
    {
        createdAt: "2022-03-29T11:17:41.327Z",
        members:[
        "6242e5df720ac28fd2f7c3a2",
        "6242e877720ac28fd2f7c3e0",
        "623dadbb720ac28fd2f7c38f"
        ],
        name: "broth",
        updatedAt: "2022-03-29T11:17:41.327Z",
        user_info:[
            {_id: '623dadbb720ac28fd2f7c38f', name: 'Pavlo', surname: 'Sadivnychyy', nickname: 'Sadik@1998', email: 'test2@gmail.com'},
            {_id: '6242e5df720ac28fd2f7c3a2', name: 'Vadym', surname: 'Chernetskiy', nickname: 'Vadik', email: 'vadik@gmail.com'}
        ],
        __v: 0,
        _id: "6242ead5720ac28fd2f7c422"
    },
]

const teams = [
    {
        conversations: ['6242eab0720ac28fd2f7c40f'],
        createdAt: "2022-03-29T11:18:33.391Z",
        name: "test",
        updatedAt: "2022-03-29T11:18:33.391Z",
        userId: "623dadbb720ac28fd2f7c38f",
        __v: 0,
        _id: "6242eb09720ac28fd2f7c434"
    }
]


describe('Channels component', () => {
    test("Channels renders without data", () => {
        render(
            <Channels
                getGroups={getGroups}
                getTeams={getTeams}
                user={user}
                activeChat
                activeTeam
                setTeams={setTeams}
                setGroups={setGroups}
                setConversations={setConversations}
                getUsers={getUsers}
                allUsers
                defineActiveChat={defineActiveChat}
                setTeamActive={setTeamActive}
                groups={[]}
                teams={[]}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
            />)
        const { container } = render(<div className="chat-list-container"/>)
        expect(container.firstChild.classList.contains('chat-list-container')).toBe(true)
    })


    test("Channels renders with data", () => {
        render(
            <Channels
                getGroups={getGroups}
                getTeams={getTeams}
                user={user}
                activeChat
                activeTeam
                setTeams={setTeams}
                setGroups={setGroups}
                setConversations={setConversations}
                getUsers={getUsers}
                allUsers
                defineActiveChat={defineActiveChat}
                setTeamActive={setTeamActive}
                groups={groups}
                teams={teams}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
            />)
        const { container } = render(<div className="chat-list-container"/>)
        expect(container.firstChild.classList.contains('chat-list-container')).toBe(true)
    })
})
