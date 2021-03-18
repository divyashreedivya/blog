import axios from 'axios';

const API_URL = 'http://localhost:8082/api/users/';

class AuthService{
    login(email,password){
        return axios
            .post(API_URL+'login',{
                email,password
            })
            .then(resp =>{
                if(resp.data.token){
                    console.log(resp.data.token);
                    localStorage.setItem("user",JSON.stringify(resp.data));
                }
                return resp.data;
            });
    }

    logout(){
        localStorage.removeItem("user");
    }

    register(email,password){
        return axios.post(API_URL+'signup',{
            email,password
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("user")).token;
    }
}

export default new AuthService();

