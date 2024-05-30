

export default class Location{

    constructor(){
        this.location = window.location
        this.params = new URLSearchParams(this.location.search)
    }

    static not_navigate_if_same(navigate, url){
        return window.location.pathname === url ? false : navigate(url)
    }

}

