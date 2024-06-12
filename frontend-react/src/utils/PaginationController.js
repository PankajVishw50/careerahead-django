
export default class PaginationController{

    constructor(url, data_callback, forceUpdate, page=[], size=[]){
        this.url = url;
        this.data_callback = data_callback;
        this.page = page[0]
        this.setPage = page[1]
        this.size = size[0]
        this.setSize = size[1]
        this.forceUpdate = forceUpdate;
        this.data = [];
        this.next = true;

    }

    setup(url, page, size){
        this.page = page[0]
        this.setPage = page[1]

        this.size = size[0]
        this.setSize = size[1]

        this.url = url; 
    }

    async fetch_data(page, size, data=null){

        let _data = data

        if (!_data){
            _data = {page, size}
        }

        const response = await fetch(this.url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(_data)
        });
        let json = {}

        try{
            json = await response.json()

            if (response.status !== 200){
                throw new Error('Request failed: server responded with statusCode (' + response.status + ')');
            }
        }catch(e) {
            return {
                'failed': e
            }
        }
        
        return {
            response, json,
            failed: false,
        }
    }

    async nav(direction=0, data=null){
        console.log('nav: ', this)

        // Same page
        if (direction === 0){
            this.forceUpdate(prevData => prevData + 1);
        }

        // Prev page
        if (direction === -1){
            if (this.page <= 1){
                return false;
            }

            return this.setPage(prevData => prevData - 1)
        }

        // Next page
        if (direction === 1){
            const range = PaginationController.get_range(this.page+1, this.size)
            console.log('range: ', range);
            if (this.data.length > range[0]){
                return this.setPage(prevData => prevData + 1)
            }
            
            console.log('result: ', (this.data.length <= range[0] && !(this.next)))
            console.log(this.next)
            if (this.data.length <= range[0] && !this.next){
                return false;
            }

            const request = await this.fetch_data(this.page+1, this.size, data)
            
            if (request.failed){
                return false;
            }


            this.setPage(prevData => {
                console.log('set page just changed to this: ', prevData + 1)
                return prevData + 1
            });
            this.next = request.json.next;
            this.data_callback(request)

            return true;
        }



    }

    update_data(data){
        this.data = data
    }

    static get_range(page, size){
        return [(page-1)*size, page*size]
    }


}