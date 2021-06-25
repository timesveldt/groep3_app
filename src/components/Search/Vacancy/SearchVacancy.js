import React, { useState, useEffect } from 'react';
import axios from 'axios';

import SearchVacancyFilter from './SearchVacancyFilter';
import SearchVacancyList from './SearchVacancyList';

import ArrowDirection from '../../../assets/svg/arrow_direction.svg';
import './SearchVacancy.css';

const SearchVacancy = () => {

    // States
    const [vacancyList, setVacancyList] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [filterItemsList, setFilterItemsList] = useState([]);
    const [filterSearchTerm, setFilterSearchTerm] = useState('');
    const [filterSearchTermList, setFilterSearchTermList] = useState([]);
    const [filterVacancies, setFilterVacancies] = useState([]);

    useEffect(() => {
        getVacancies();
        filterVacancySearchTerm();
        filterVacancyItems();
    }, []);

    useEffect(() =>{
        filterVacancySearchTerm();
        filterVacancyItems();
    }, [filterItems, filterSearchTerm])

    const getVacancies = () =>{

        const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}` }
        };

        const BASE_URL ="http://localhost:8000/api/vacancy/vacancies";
        axios.get(BASE_URL, config).then(res =>{
            setVacancyList(res.data);       
            setFilterVacancies(res.data); 
            console.log(res.data)    
        })
    }

    // update filterItems
    const updateFilterState = (list, searchTerm) => { 
        setFilterItems(list);
        setFilterSearchTerm(searchTerm); 

        // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.title.toLowerCase().indexOf(filterSearchTerm.toLowerCase()) !== -1 }))
        // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.skills.map(skill => skill.skill).includes(filterItems.map(item => item.item).toString())}))
        console.log("vacancy-user: " + vacancyList.map(user => user.company_name))
        console.log("filteritems: " + filterItems.map(item => item.item))
        console.log(filterVacancies);
        console.log(list);
        console.log(searchTerm);
    }

    const filterVacancySearchTerm = () =>{

        if(!filterSearchTerm){
            setFilterSearchTermList(vacancyList);
        }
        else{
            setFilterSearchTermList(vacancyList.filter(vacancy => {return vacancy.title.toLowerCase().indexOf(filterSearchTerm.toLowerCase()) !== -1 })) 
           
        }
        console.log(filterSearchTerm);
    }


    const filterVacancyItems = () => {
        const filterskills = filterItems.map(item => item.item.toString());
        const vacancyskills = JSON.stringify(vacancyList.map(vacancy => vacancy.skills.map(skill => skill.skill)))
        const test = filterskills.some(skill => vacancyskills.includes(skill))
        
        // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy.users.map(user => user.company_name).indexOf(filterSearchTerm.toLowerCase()) !== -1 }))
        if (filterItems.length === 0){
            setFilterVacancies(filterSearchTermList)
        } 
        else {
            setFilterVacancies(filterSearchTermList.filter(vacancy => {return vacancy.skills.map(skill => skill.skill).includes(filterItems.map(item => item.item).toString())}))
            // setFilterVacancies(vacancyList.filter(vacancy => {return vacancy === filterskills.some(skill => JSON.stringify(vacancy.skills.map(skill => skill.skill).includes(skill)))}))
        }
        
        // console.log(filterVacancies)
        // console.log(filterskills)
        // console.log(vacancyskills)
        // console.log(test)
    }

    const filterVacancyDate = () =>{
        // setFilterSearchTermList(vacancyList.sort((a,b) => a.created_at > b.created_at ? 1: -1))
    }
     

    return (
        <section className="search">
            <div className="search__container">
                <div className="search__container__title">
                    <h1 className="search__container__title-search">Zoeken</h1>
                    <img className="search__container__title-arrow_down" src={ArrowDirection} alt="arrow" />
                </div>
                <SearchVacancyFilter updateFilterState={updateFilterState} />
                <SearchVacancyList vacancies={filterVacancies} />
                {/* <SearchVacancyList vacancies={vacancyList} /> */}
            </div>
        </section>
    )
}

export default SearchVacancy;
