import { useRef, useState } from "react";

import '../assets/css/ModalComponent.css'

export default function ModalComponent({modal}) {

    console.log('modal is: ', modal);

    const type = useRef({
        info: {
            logo: 'info',
            styles: {
                backgroundColor: '#D1D8C5',
            }
        },
        success: {
            logo: 'check_circle',
            styles: {
                backgroundColor: '#9DDE8B',
            }
        },
        error: {
            logo: 'warning',
            styles: {
                backgroundColor: '#EE4E4E',
            }
        }
    }).current;


    modal.activate_toast();
    modal.activate_modal();
    const toast = modal.get_toast();
    const modal_el = modal.get_modal();

    console.log('toast: ', toast);
    console.log('modal: ', modal_el);
    return (

        <div className="modal">


            {modal_el && (
                <div className="modal__blocker">

                    <div className="modal__blocker-wrapper">

                        <div className="modal__blocker__header">
                            <h1 className="modal__blocker__header-text">
                                {
                                    modal_el.header.charAt(0).toUpperCase() + 
                                    modal_el.header.slice(1)
                                }
                            </h1>

                            <span className="material-symbols-outlined modal__blocker__header-close"
                            onClick={() => {
                                modal.deactivate_modal()
                            }}>
                                close
                            </span>
                        </div>

                        <div className="modal__blocker__content" style={type[modal_el.type].styles}>
                            <span className="material-symbols-outlined modal__blocker-logo">
                                {type[modal_el.type].logo}
                            </span>

                            <p className="modal__blocker-text">
                                {modal_el.message}
                            </p>
                        </div>

                        {
                            modal_el.controllers.length > 0 && (

                            <div className="modal__blocker__controller">
                                {
                                    modal_el.controllers.map(controller => {
                                        return (

                                            <a href="/" 
                                            className="modal__blocker__button"
                                            style={type[controller.type].styles}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (controller.func){
                                                    controller.func()
                                                }
                                            }}
                                            >
                                                {controller.text}
                                            </a>
                                        )
                                    })
                                }
                            </div>

                            )
                        }

                    </div>

                </div>
            )}

            {toast && (

                <div className={'modal__toast ' + 
                    (!toast ? 'modal--dead' : '') 
                }
                style={
                    type[toast.type].styles
                }>


                    <span className="material-symbols-outlined modal__toast-logo">
                        {type[toast.type].logo}
                    </span>

                    <p className="modal__toast-text">
                        {toast && toast.message}
                    </p>

                    <span className="material-symbols-outlined modal__toast-cancel"
                    onClick={() => {
                        modal.deactivate_toast()
                    }}>
                        cancel
                    </span>

                </div>                
            )
            
            }


        </div>

    )

}