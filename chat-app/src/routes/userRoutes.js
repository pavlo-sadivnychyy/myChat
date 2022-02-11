
import MessagePage from "../pages/MessagePage/MessegePage";

const userRoutes = [
    {
        path: "/messages",
        component: MessagePage,
    },
    { redirect: true, path: "/", to: "/messages"},
];

export default userRoutes;