import { Navigate } from "react-router-dom";


export default class Auth{

    LOGIN_URL = '/login'

    constructor(){
        this.data = null
        this.failed = false;
        this.setted_up = false;
        this._is_authenticated = false;

    }

    async check_validation(){

        console.log('making response');
        const response = await fetch('/api/me')
        console.log('response compleeted')
        let json = {}
        try{
            json = await response.json()
        }catch{}

        this.setted_up = true
        if (response.status !== 200){
            this.failed = true;
            return (this._is_authenticated = false)
        }

        this._is_authenticated = true;
        this.data = json.data;
    }

    is_authenticated(){
        return this._is_authenticated;
    }

    is_counsellor(){
        return (this.is_authenticated && this.data && this.data.get('is_counsellor'))
    }

    logout(){
        this.data = null;
        this._is_authenticated = false
    }

    load_login(json){
        this.data = json.data;
        this._is_authenticated = true;
        this.failed = false;
        this.setted_up = true;
    }


}