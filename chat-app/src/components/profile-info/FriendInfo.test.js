import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import FriendInfo from "./FriendInfo";
import React from "react";

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

describe('FriendInfo component', () => {
    test("FriendInfo renders with active chat", () => {
        render(
            <FriendInfo
                user
                activeChat={activeChat}
            />)
        const { container } = render(<div className="info-container"/>)
        expect(container.firstChild.classList.contains('info-container')).toBe(true)
    })

    test("FriendInfo renders with active chat", () => {
        render(
            <FriendInfo
                user={user}
                activeChat={false}
            />)
        const { container } = render(<div className="info-container"/>)
        expect(container.firstChild.classList.contains('info-container')).toBe(true)
    })
})
