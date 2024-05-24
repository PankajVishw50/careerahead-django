import {useNavigate, useOutletContext} from 'react-router-dom'
import {v4 as uuid4} from 'uuid'
import { useEffect, useState } from 'react'

import '../assets/css/SetupPage.css'

export default function SetupPage(){
    const {auth} = useOutletContext()
    const [uuid, setUUID] = useState(Array(4).fill(null))
    const [activeAvatar, setActiveAvatar] = useState(null)
    const navigate = useNavigate()

    // const [categories, setCategories] = useState([
    //     { category: "Marriage Counselor", selected: false },
    //     { category: "Family Therapist", selected: true },
    //     { category: "Career Counselor", selected: false },
    //     { category: "Mental Health Counselor", selected: false },
    //     { category: "Substance Abuse Counselor", selected: false },
    //     { category: "School Counselor", selected: false     },
    //     { category: "Grief Counselor", selected: false },
    //     { category: "Financial Counselor", selected: false },
    //     { category: "Relationship Counselor", selected: false },
    //     { category: "Child Counselor", selected: false },
    //     { category: "Crisis Counselor", selected: false },
    //     { category: "Trauma Counselor", selected: false },
    //     { category: "Rehabilitation Counselor", selected: false },
    //     { category: "Art Therapist", selected: false },
    //     { category: "Music Therapist", selected: false },
    //     { category: "Pet Therapist", selected: false },
    //     { category: "Eating Disorder Counselor", selected: false },
    //     { category: "Sex Therapist", selected: false },
    //     { category: "Domestic Violence Counselor", selected: false },
    //     { category: "Geriatric Counselor", selected: false },
    //     { category: "Spiritual Counselor", selected: false },
    //     { category: "Disability Counselor", selected: false },
    //     { category: "Pre-Marital Counselor", selected: false },
    //     { category: "Couples Counselor", selected: false },
    //     { category: "Adolescent Counselor", selected: false },
    //     { category: "Anger Management Counselor", selected: false },
    //     { category: "Self-Esteem Counselor", selected: false },
    //     { category: "Career Assessment Counselor", selected: false },
    //     { category: "Holistic Counselor", selected: false },
    //     { category: "Group Therapist", selected: false }
    // ]);
    
    const [categories, setCategories] = useState()

    function fill_uuids(){
        setUUID(prevValue => {
            console.log('running with: ', prevValue)
            return prevValue.map(() => uuid4())
        })
    }

    async function save_profile(){
        if (!activeAvatar){
            return alert("please select an avatar first")
        }

        const selected_categories = categories.filter(value => {
            return value.selected  
        }).map(value => value.id)

        if (selected_categories.length < 3){
            return alert('please select 3 or more interested categories')
        }

        const data = {
            avatar: activeAvatar,
            types: selected_categories
        }

        // post to url
        const response = await fetch('/auth/setup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let json = {}

        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200){
            return alert('something went wrong, try again')
        }

        if (json && json.updated){
            auth.load_login(json.data)
            return navigate('/profile') 
        }


    }

    useEffect(() => {
        
        // FETCh types
        (async() => {
            const response = await fetch('/api/counsellor/types')
            let json = {}
            
            try{
                json = await response.json()
            }catch{
                return 
            }
            
            if (response.status !== 200){
                return false
            }
            
            if (json && json.data){
                setCategories(
                    json.data.map(value => {
                        return {
                            ...value,
                            selected: false,
                        }
                    })
                )
            }
            
            fill_uuids()
        })()


    }, [])

    console.log("uuids are: ", uuid)

    console.log(uuid4())

    return (

        <div className="setup-container">

            <div className="header">
                <h2 className='header__text'>
                    <span className="header__text-span">Setup</span> Profile
                </h2>

            </div>

            <div className="avatar">


                {
                    uuid.map((value, index) => {
                        return (
                            <div 
                            index={index}
                            className={
                                activeAvatar && value === activeAvatar ?  
                                'avatar__frame avatar__frame--active' : 
                                'avatar__frame'
                            }
                            onClick={(e) => {
                                console.log('clicked', activeAvatar)
                                console.log(uuid)
                                console.log(uuid[0])
                                console.log(e.currentTarget.getAttribute('index'))
                                setActiveAvatar(uuid[e.currentTarget.getAttribute('index')])
                            }}
                            >
                                <img 
                                className='avatar__img'
                                src={'/avatar/' + value} 
                                alt='avatar' 
                                height='100px' width='100px'/>
                            </div>
                        )
                        
                    })
                }


            </div>

            <div className="categories-wrapper">

                <div className="categories">
                    {
                        categories && categories.map((category, index) => {
                            
                            return (
                                <div className={
                                    category.selected ?
                                    'categories__category categories__category--selected' :
                                    'categories__category'
                                }
                                index={index}
                                key={index}
                                onClick={(e) => {
                                    const {currentTarget} = e
                                    const index = currentTarget.getAttribute('index') * 1
                                    console.log('onclick chal gya: ', index)
                                    setCategories(prevCategory => {
                                        const arr = prevCategory.map((el, _index) => {
                                            const data = {
                                                ...el,
                                            }
                                            if (_index === index){
                                                console.log('yes equal', el)
                                                data.selected = !(el.selected)
                                                console.log(el);
                                            }
                                            return data
                                        })
                                        return arr
                                    })
                                    console.log(categories)
                                }}
                                >
                                    <span className="categories__text">
                                        {category.type}
                                    </span>
                                </div>
                            )
                            
                        })
                    }
                                    <div className="categories__fade">
                                    </div>
                                    

                </div>

                <div className="categores-wrapper__meta">
                    <p className="categories__meta-text">
                        Select atleast 3 or more areas of interest.&nbsp;
                        <span className="categories__meta-extra">
                            scroll to explore.
                        </span>
                    </p>
                </div>

            </div>

            <div className="controller-wrapper">
                <div className="controller">
                    <div className="controller__button">
                        <button className="button-60"
                        onClick={() => {
                            fill_uuids()
                        }}  
                        >
                            Refresh Avatar
                        </button>
                    </div>

                    <div className="controller__button">
                        <button className="button-60 button-green"
                        onClick={save_profile}>
                            Save and Continue
                        </button>
                    </div>

                </div>
            </div>

        </div>

    )

}
