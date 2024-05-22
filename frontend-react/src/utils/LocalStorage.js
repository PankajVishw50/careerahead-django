
export default class LocalStorage{

    static get_data(property_name, default_value=null){

        const value = localStorage.getItem(property_name)

        if (!value && default_value){
            return default_value
        }

        return value
    }

    static set_data(property_name, value){

        return localStorage.setItem(property_name, value)

    }


}