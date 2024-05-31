
import { useEffect, useState } from 'react';
import '../assets/css/MarketPage.css';
import CounsellorCard from '../components/CounsellorCard';
import PaginationController from '../utils/PaginationController';

export default function MarketPage(){

    const [categories, setCategories] = useState([])
    const [expandCategory, setsExpandCategory] = useState(false)
    const [filterData, setFilterData] = useState({
        counsellorName: null,
        gender: null,
        priceUpto: 1500,
    });
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)
    let next = true
    const [counsellorData, setCounsellorData] = useState([]);
    const range = PaginationController.get_range(page, size)
    
    const [,forceUpdateController] = useState(false)
    const [,forceUpdate] = useState(0)
    const url = '/api/counsellor/counsellors'
    const [paginationController, setPaginationController] = useState(new PaginationController(url, handle_data, forceUpdate, [page, setPage], [size, setSize]))
    paginationController.setup(url, [page, setPage], [size, setSize])

    const [data, setData] = useState({
        page: page,
        size: size,
        filter: {
            ...filterData,
            categories: categories.filter(el => {
                return el.selected
            }).map(el => el.type)
        }
    })



    console.log(paginationController)


    function handle_filter_change({target}){

        setFilterData(prevData => {
            const data =  {
                ...prevData,
                [target.getAttribute('name')]: target.value,
            }

            return data
        })

    }

    function toggle_category_container(){
        setsExpandCategory(prevData => !prevData)
    }

    useEffect(() => {
        console.log('going to set new pagination controller')
        if (!forceUpdateController){
            return;
        }
        setPaginationController(
            (new PaginationController('/api/counsellor/counsellors', handle_data, forceUpdate, [page, setPage], [size, setSize]))
        )
    }, [forceUpdateController])

    useEffect(() => {
        console.log('this one effect ran')
        if (paginationController){
            paginationController.nav(1);
        }
    }, [paginationController])

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
            
        })()

    }, [])

    function handle_data({json}){
        setCounsellorData(prevData => {
            
            const data = prevData.map(val => val)
            json.data.forEach(val => {
                data.push(val)
            })

            if (paginationController){
                paginationController.update_data(data)
            }

            return data
        })
    }

    // useEffect(() => {
    //     nav(0)
    // }, [])


    function reset(){
        setPage(1)
        setSize(10)
        next = true
        setCounsellorData([])
    }

    async function nav(direction=1){
        console.log('started nav')
        if (direction == 0){
            let range  = get_range(page, size)
            console.log('directed here', range)
            if (counsellorData.length <= range.start){
                console.log('would work')
                return await fetch_counsellors()
            }

        }

        if (direction == 1){
            let range = get_range(page + 1, size)
            if (counsellorData.length <= range.start && !next){
                return await fetch_counsellors()
            }else{
                return setPage(prevData => prevData+1)
            }
        }

        if (nav == -1){
            if (page <= 0){
                return false;
            }
            setPage(prevData => prevData - 1)
        }

    }

    function get_range(page, size){
        return {
            start: (page-1) * size,
            end: page * size
        }
    }

    async function fetch_counsellors(reset=false) {

        setPage(prevData => prevData+1)

        const data = {
            page: page,
            size: size,
            filter: {
                ...filterData,
                categories: categories.filter(el => {
                    return el.selected
                }).map(el => el.type)
            }
        }

        const response = await fetch('/api/counsellor/counsellors', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        let json = {}

        try{
            json = await response.json()
        }catch{}

        if (response.status !== 200){
            return alert('failed to fetch counsellors')
        }

        setCounsellorData(prevData => {
            const data = prevData.map(val => val)
            json.data.forEach(value => {
                data.push(value)
            })
            return data

        })
        if (!json.next){
            next = false
        }
    }

    console.log('counsellor data: ', counsellorData);


    if (!paginationController){
        return <></>
    }

    return (
        <div className="market-container">
            <div className="mark-main-row-left">

                <div className="panel-container">
                    <div className="search-container">
                        <input type="search" placeholder="Enter counsellor name... " name="counsellorName" 
                        value={filterData.counsellorName}
                        onChange={handle_filter_change}
                        />
                    </div>
                    <div className="gender-container">
                        <div className="male gender">
                            <div className="male-logo gender-logo">
                                <span className="material-symbols-outlined">male</span>
                            </div>
                            <div className="male-selector gender-selector">
                                <input type="radio" name="gender" defaultValue={'male'}
                                onChange={handle_filter_change}/>
                            </div>
                        </div>
                        <div className="female gender">
                            <div className="female-logo gender-logo">
                                <span className="material-symbols-outlined">female</span>
                            </div>
                            <div className="female-selector gender-selector">
                                <input type="radio" name="gender" defaultValue={'female'} 
                                onChange={handle_filter_change}/>
                            </div>
                        </div>
                    </div>
                    <div className="filter-container">
                        <h5>Select types: </h5>
                        <div className="filter-names">
                                {categories.length > 0 && categories.slice(0, expandCategory ? categories.length : 8).map((category, index) => {
                                    return (
                                        <div className="type-container" key={index}>
                                            <button
                                            className={
                                                category.selected ?
                                                'type type--selected' :
                                                'type'
                                            }
                                            index={index}
                                            value={category.type}
                                            onClick={(e) => {
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
                                                        }}
                                            >
                                                {category.type}
                                            </button>
                                        </div>
                                    )
                                })}


                        </div>
                        <div className="filter-controller">
                            <button className="expand-collapse" 
                            onClick={toggle_category_container}>
                            expand...
                            </button>
                        </div>
                    </div>
                    <div className="price-container">
                        <span className="starting-price">10$</span>
                        <input
                            type="range"
                            min={100}
                            max={1500}
                            step={200}
                            name='priceUpto'
                            defaultValue={filterData.priceUpto}
                            onChange={handle_filter_change}
                            id="slider"
                            />
                        <span className="ending-price" />
                    </div>
                    <div className="filter-button">
                        <button className="btn1" id="filter-submit"
                        onClick={() => {
                            setFilterData({
                                    page: page,
                                    size: size,
                                    filter: {
                                        ...filterData,
                                        categories: categories.filter(el => {
                                            return el.selected
                                        }).map(el => el.type)
                                    }
                                })
                            forceUpdateController(true)
                        }}>
                        Filter
                        </button>
                    </div>
                </div>

            </div>

            <div className="mark-main-row-center">
                <div className="loading">
                    <div className="load-logo material-symbols-outlined">refresh</div>
                    <div className="load-text">Loading...</div>
                </div>
                <div className="counsellor-container">
                    {
                        counsellorData.slice(range[0], range[1]).map((counsellor, index) => {
                                return (
                                        <CounsellorCard
                                        key={index}
                                        counsellor={counsellor}/>
                                )
                        })
                    }
                </div>
                
                <div className="market-navigation">
                    <div className="navigation-sector">
                        <div className="btn-nav previous">
                            <button className="material-symbols-outlined nav-previous-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                paginationController.nav(-1, setFilterData(prevData => {
                                    return {
                                        ...prevData,
                                        page: page,
                                        size: size
                                    }
                                }))
                            }}>
                            arrow_back
                            </button>
                        </div>
                        <div className="page-input">
                            <input
                                type="number"
                                className="page-input-field"
                                min={0}
                                max="{{ get_maxPage() }}"
                                disabled=""
                                />
                        </div>
                        <div className="btn-nav next">
                            <button className="material-symbols-outlined nav-next-btn"
                            onClick={(e) => {
                                e.preventDefault()
                                paginationController.nav(1, setFilterData(prevData => {
                                    return {
                                        ...prevData,
                                        page: page,
                                        size: size
                                    }
                                }))
                            }}>
                            arrow_forward
                            </button>
                        </div>
                    </div>
                    <div className="position-sector" />
                    </div>
            </div>
        </div>
    )

}