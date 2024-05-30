
import { useMemo, useState } from 'react'
import '../assets/css/Appoint.css'
import { useOutletContext } from 'react-router-dom';

export default function Appoint({counsellor}){
    const {modal} = useOutletContext();

    const cur_date = new Date();
    const then_date = new Date()
    then_date.setDate(cur_date.getDate() + 30)

    console.log('cur date is: ', cur_date, get_date_string(cur_date))
    console.log('then date is: ', then_date)

    const [formData, setFormData] = useState({
        note: 'mfewl fewlkf welfjw elfkwje flkwej flwe fjwekfj ewl;fkwje lf',
        fromDate: '2024-05-28',
        toDate: '2024-06-03',
        fromTime: '10:00',
        toTime: '12:00',
    });


    function handle_change({currentTarget}){
        setFormData(prevData => {
            return {
                ...prevData,
                [currentTarget.getAttribute('name')]: currentTarget.value,
            }
        });
    }

    async function handle_submit(e){
        e.preventDefault();

        console.log('here')

        modal.modal(
            `Request for Contact to ${counsellor.username}`,
            `Remeber once you accepted we will generate an request to gain contact from ${counsellor.username} and your contact details would be sent to him. Once accepted you would also get there contacts details.`,
            'info',
            [
                {
                    text: 'Request Contact',
                    type: 'success',
                    func: async (e) => {
                        modal.deactivate_modal();

                        const response = await fetch(`/api/counsellor/${counsellor.id}/appoint`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(formData)
                        });
                        let json = {};

                        try{
                            json = await response.json();
                        }catch{}

                        if (response.status !== 200 || !json.created){
                            return modal.toast(
                                'failed to initiate contact request. Try again',
                                'error',
                            );
                        }

                        return modal.toast(
                            'Request generated. Once accpeted by other side we will contact you',
                            'success',
                        )

                    }
                }
            ]
        );

    }

    function get_date_string(date){
        return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    }



    return (
        <div className="appointment">

            <div className="appointment__header">
                <h1 className="appointment__header-text">
                    Book an Appointment 
                </h1>
            </div>

            <div className="appointment__form">
                <form action="#" className='form'
                onSubmit={handle_submit}
                >

                    <fieldset className="form__element">
                        <label htmlFor="note" className="form__label form__label-area">Note</label>

                        <textarea name="note" id="note" className="form__input form__input-area"
                        placeholder='explain yourself ...' required
                        rows={10}
                        minLength={25}
                        value={formData.note}
                        onChange={handle_change}
                        >
                        </textarea>
                    </fieldset>

                    <fieldset className="form__element">
                        <label htmlFor="note" className="form__label form__label-area">Preferred Date</label>

                        <div className="form__input-area form__input__container">
                            <div className="form__input__date">
                                <div className="form__input__date-input">
                                    <input type="date"
                                    min={get_date_string(cur_date)}
                                    max={
                                        formData.toDate ??
                                        get_date_string(then_date)
                                    }
                                    name='fromDate'
                                    value={formData.fromDate}
                                    onChange={handle_change}
                                    required
                                    />
                                </div>

                                <div className="form__input__date-label">
                                    <span className="form__input__date-text">
                                        From
                                    </span>
                                </div>

                            </div>

                            <div className="form__input__date">
                                <div className="form__input__date-input">
                                    <input type="date"
                                    min={
                                        formData.fromDate ? formData.fromDate : 
                                        get_date_string(cur_date)
                                    }
                                    max={get_date_string(then_date)}
                                    name='toDate'
                                    value={formData.toDate}
                                    onChange={handle_change}
                                    required
                                    />
                                </div>

                                <div className="form__input__date-label">
                                    <span className="form__input__date-text">
                                        To
                                    </span>
                                </div>

                            </div>


                        </div>
                    </fieldset>

                    <fieldset className="form__element">
                        <label htmlFor="note" className="form__label form__label-area">Preferred Time</label>

                        <div className="form__input-area form__input__container">
                            <div className="form__input__date">
                                <div className="form__input__date-input">
                                    <input type="time"
                                    min='2024-05-20'
                                    max='2024-06-10'
                                    name='fromTime'
                                    value={formData.fromTime}
                                    onChange={handle_change}
                                    required
                                    />
                                </div>

                                <div className="form__input__date-label">
                                    <span className="form__input__date-text">
                                        From
                                    </span>
                                </div>

                            </div>

                            <div className="form__input__date">
                                <div className="form__input__date-input">
                                    <input type="time"
                                    min='2024-05-20'
                                    max='2024-06-10'
                                    name='toTime'
                                    value={formData.toTime}
                                    onChange={handle_change}
                                    required
                                    />
                                </div>

                                <div className="form__input__date-label">
                                    <span className="form__input__date-text">
                                        To
                                    </span>
                                </div>

                            </div>


                        </div>
                    </fieldset>


            <div className="appointment__tips">
                <div className="appointment__tips__logo">
                    <span className="material-symbols-outlined">
                        info
                    </span>
                </div>

                <div className="appointment__tips__text">
                    <p className="appointment__tips__text-el">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Et ullam dignissimos quos aperiam dolore voluptate. 
                    </p>
                </div>
            </div>

                    <div className="form__action">

                        <button className="form__save" type='submit'>
                            Contact
                        </button>

                        <div className="form__charge">
                            <span className="material-symbols-outlined form__charge-logo">
                                attach_money
                            </span>
                            <span className="form__charge-amount">9324</span>
                            <span className="form__charge-tip">
                                (estimated amount)
                            </span>
                        </div>

                    </div>

                </form>
            </div>



        </div>
    )
}