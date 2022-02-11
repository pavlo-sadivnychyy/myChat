import axios from 'axios'
import {getDispatch} from "reactn";

async function getAllConversations(){
    await axios.get('/conversations/' + userId)
        .then((res) => {
            if(res.status === 200){
                return res.data;
            }else{
                getDispatch().openSnackbar({
                    open: true,
                    msg: "Conversations not found",
                    color: "warning",
                });
            }
        }).catch((err) => {
            getDispatch().openSnackbar({
                open: true,
                msg: "Conversations not found",
                color: "warning",
            });
        });

}

async function getImportantConversations(userId){
    await axios.get('/conversations/important/' + userId)
        .then((res) => {
            if(res.status === 200){
                return res.data;
            }else{
                getDispatch().openSnackbar({
                    open: true,
                    msg: "Conversations not found",
                    color: "warning",
                });
            }
        }).catch((err) => {
            getDispatch().openSnackbar({
                open: true,
                msg: "Conversations not found",
                color: "warning",
            });
        });
}

async function getConversationById(convId){
    await axios.get('conversations/byId/' + convId)
        .then((res) => {
            if(res.status === 200){
                return res.data;
            }else{
                getDispatch().openSnackbar({
                    open: true,
                    msg: "Conversations not found",
                    color: "warning",
                });
            }
        }).catch((err) => {
            getDispatch().openSnackbar({
                open: true,
                msg: "Conversations not found",
                color: "warning",
            });
        });
}

async function getConversationByMembers(members){
    await axios.get('conversations/byId/', members)
        .then((res) => {
            if(res.status === 200){
                return res.data;
            }else{
                getDispatch().openSnackbar({
                    open: true,
                    msg: "Conversations not found",
                    color: "warning",
                });
            }
        }).catch((err) => {
            getDispatch().openSnackbar({
                open: true,
                msg: "Conversations not found",
                color: "warning",
            });
        });
}
