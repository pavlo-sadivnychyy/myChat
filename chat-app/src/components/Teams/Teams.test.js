import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import Teams from "./Teams";


const teams = [
    {
        _id: 1,
        name: "Test1",
        conversations: [
            {key: 1}
        ]
    },
    {
        _id: 2,
        name: "Test2",
        conversations: [
            {key: 2}
        ]
    },
    {
        _id: 3,
        name: "Test3",
        conversations: [
            {key: 3}
        ]
    },
    {
        _id: 4,
        name: "Test4",
        conversations: [
            {key: 4}
        ]
    }
]

const setTeams = jest.fn();
const getConversationsOfActiveTeam = jest.fn();
const setTeamActive = jest.fn();
const getTeams = jest.fn()


describe('Teams component', () => {
    test("Teams renders", () => {
        render(
            <Teams
                getTeams={getTeams}
                teams={teams}
                setTeams={setTeams}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
                setTeamActive={setTeamActive}
                activeTeam
            />)
        expect(screen.getByRole("list")).toBeInTheDocument();
    })

    test("Teams renders without data", () => {
        render(
            <Teams
                getTeams={getTeams}
                teams={[]}
                setTeams={setTeams}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
                setTeamActive={setTeamActive}
                activeTeam
            />)
        expect(screen.getByRole("list")).toBeInTheDocument();
    })

    test("Define active team by click", () => {
        render(
            <Teams
                getTeams={getTeams}
                teams={teams}
                setTeams={setTeams}
                getConversationsOfActiveTeam={getConversationsOfActiveTeam}
                setTeamActive={setTeamActive}
                activeTeam
            />)

        userEvent.click(screen.getByText("#Test4"));
        expect(setTeamActive).toHaveBeenCalledTimes(1);
        expect(getConversationsOfActiveTeam).toHaveBeenCalledTimes(1);
    })
})
