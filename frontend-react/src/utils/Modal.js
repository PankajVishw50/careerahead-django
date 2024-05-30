

export default class Modal{
    POPUP_CLOSE_TIME = 3000

    constructor(forceUpdate){

        this.forceUpdate = forceUpdate;

        // Modal
        this.modals = []
        this.current_modal = null;
        this.current_modal_timeout = null;

        // Toast  
        this.toasts = []
        this.current_toast = null;
        this.current_toast_timeout = null;

    
    }

    check_location_toasts(){
        const _params = new URLSearchParams(window.location.search)

        if (!_params.get('toast')){
            return false
        }

        this.toast(
            _params.get('toast'),
            _params.get('type') ?? 'info'
        )
    }



    toast(message, type, ms=this.POPUP_CLOSE_TIME, activate=true){

        this.toasts.push({
            message,
            type,
            ms
        });

        if (activate){
            this.activate_toast();
        }
        

    }

    modal(header, message, type, controllers=[], timeout=false, activate=true){
        console.log('modal added');
        this.modals.push({
            header,
            message,
            type,
            controllers,
            timeout,
        });

        if (activate){
            this.activate_modal();
        }
    }

    activate_toast(){
        console.log('started activate toast');
        if (this.toasts.length > 0 && !this.current_toast){
            console.log('inside condition');
            
            this.current_toast = this.toasts.shift();
            console.log('current toast is: ', this.current_toast)
            
            this.current_toast_timeout = setTimeout(() => {
                console.log('\n\n\\nTimeout Executed\n\n')
                this.deactivate_toast();
            }, this.current_toast.ms);

            this.update_ui();
        }

        console.log(this.current_toast);
        return this.current_toast
    }

    activate_modal(){
        if (this.modals.length > 0 && !this.current_modal){
            this.current_modal = this.modals.shift();

            if (this.current_modal.timeout){
                this.current_modal_timeout = setTimeout(() => {
                    console.log('timeout ran');
                    this.deactivate_modal();
                }, this.current_modal.timeout);
            }

            this.update_ui();
        }

        return this.current_modal;

    }

    get_toast(){
        return this.current_toast
    }

    get_modal(){
        return this.current_modal
    }

    update_ui(){
        console.log('inside update ui');
        this.forceUpdate(prevData => prevData + 1);
    }

    deactivate_toast(){
        if (!this.current_toast){
            return false;
        }

        console.log('in deactivate toast');

        clearTimeout(this.current_toast_timeout)
        this.current_toast = null;
        this.current_toast_timeout = null;
        const toast = this.activate_toast();
        console.log('got this toast: ', toast)

        if (!toast){
            this.update_ui();
        }
    }

    deactivate_modal(){
        if (!this.current_modal){
            return false;
        }

        clearTimeout(this.current_modal_timeout);
        this.current_modal = null;
        this.current_modal_timeout = null;
        const modal = this.activate_modal();

        if (!modal){
            this.update_ui();
        }

    }

    
}