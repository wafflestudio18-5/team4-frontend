import React, {useState, useEffect} from 'react'
import {getQuestionsWithTags, getQuestionsWithKeywords, getQuestionsOfUser} from '../../Api/axios.ts'

import QuestionList from '../Questions/QuestionList'
import Button from '../Button_search'
import styles from './SearchResult.module.scss'
import LeftBanner from '../Banner/LeftBanner'

//tags: list of tags
export const SearchResultTags = ({query}) => {
    console.log(query);
    const [result, setResult] = useState([])
    const [sortedBy, setSortedBy] = useState(query.sorted_by)
    const [page, setPage] = useState(query.page)
    const [filterBy, setFilterBy] = useState('')
    const [maxPage, setMaxPage] = useState(1)
    
    const changeSort = (sortedBy) => {
        setSortedBy(sortedBy)
    }

    const changePage = (page) => {
        setPage(page)
    }

    const changeFilter = (filterBy) => {
        setFilterBy(filterBy)
    } 
    useEffect(()=>{
        getQuestionsWithTags(query.tags, sortedBy, page, filterBy?filterBy:null, query.user)
            .then(questions => {
                setResult(()=>questions)
                setMaxPage(()=>!questions.length? 1: Math.ceil(questions.length/30))
            })
            .catch(console.log)
    },[query, filterBy, sortedBy, page])

    if (result === null) {
        return(
            <>
            Loading...
            </>
        )
    }
    
    return (
        <div className={styles.banner}> 
        <LeftBanner/>           
        <div className={styles.board}>
            <div className={styles.search_result_head}>
                <div className="search_result_top">              
                </div>
                <div className={styles.divider15}/>
                <div className="result_head_sub">
                    Results for tags {query.tags.join(', ')}
                </div>
            </div>
            <div className={styles.search_result_body}>
                        <div className={styles.results_info_box}>
                            <div className={styles.sort_btn_box}>
                                <div className={styles.sort_text}>
                                    Sort by  
                                </div>
                                <div className={styles.divider15}/>
                                <div className={styles.sort_newest}>
                                    <Button title="new" onClick = {() => changeSort("newest")}>new</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_update">
                                    <Button title="update" onClick = {() => changeSort("recent_activity")}>update</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_votes">
                                    <Button title="vote" onClick = {() => changeSort("most_votes")}>votes</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_views">
                                    <Button title="view" onClick = {() => changeSort("most_frequent")}>views</Button>
                                </div>
                                <div className={styles.divider10}/>
                            </div>
                            <div className={styles.filter_select_box}>
                            <div className={styles.sort_text}>
                                   Filter by
                                </div>
                                <div className={styles.divider5}/>
                                <div className={styles.filter_no_answer}>
                                    <Button title="no answer" onClick={() => {changeFilter("no_answer")}}>no answer</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="filter-no_accepted_answer">
                                    <Button title="none accepted" onClick={() => {changeFilter("no_accepted_answer")}}>no accepted answer</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="filter-none">
                                    <Button title="none" onClick={() => {changeFilter(null)}}>no filters</Button>
                                </div>
                                <div className={styles.divider5}/>
                            </div>                      
                            
                        </div>
                        <div className={styles.title_line_box}>
                            <hr className={styles.title_line}/>  
                        </div>
                        
                        <div className={styles.result_list}>
                            <QuestionList Questions={result}/>
                            <div>
                            <div className={styles.select_page_box}>
                                {page===1?<></>:<Button title="prev page" onClick = {() => {changePage(page-1)}}/>}
                                <div className={styles.divider15}/>
                                <div className="page_number">
                                    {page}
                                </div>
                                <div className={styles.divider15}/>
                                {page===maxPage?<></>:<Button title="next page" onClick = {() => {changePage(page+1)}}/>}
                            </div>
                            </div>
                    </div>
            </div>
           
        </div>
    </div>
    )
    
}

//kwds: list of keywords
export const  SearchResultKeywords = ({query}) => {
    console.log(query);
    const [sortedBy, setSortedBy] = useState(query.sorted_by)
    const [page, setPage] = useState(query.page)
    const [result, setResult] = useState([])
    const [filterBy, setFilterBy] = useState('')
    const [maxPage, setMaxPage] = useState(1)

    const changeSort = (sortedBy) => {
        setSortedBy(sortedBy)
    }

    const changePage = (page) => {
        setPage(page)
    }

    const changeFilterBy = (filterBy) => {
        setFilterBy(filterBy)
    } 

    useEffect(()=>{
        getQuestionsWithKeywords(query.keywords, sortedBy, page, filterBy?filterBy:null)
            .then(questions => {
                setResult(()=>questions)
                setMaxPage(()=>!questions.length? 1: Math.ceil(questions.length/30))
            })
            .catch(console.log)
    },[query, filterBy, sortedBy, page])
    if (result === null) {
        return(
            <>
            Loading...
            </>
        )
    }
    return (
        <div className={styles.banner}>
            <LeftBanner/>            
        <div className={styles.board}>
            <div className={styles.search_result_head}>
                <div className="search_result_top">              
                </div>
                <div className={styles.divider15}/>
                <div className="result_head_sub">
                    Results for keywords {query.keywords.join(', ')}
                </div>
            </div>
            <div className={styles.search_result_body}>
                        <div className={styles.results_info_box}>
                            <div className={styles.sort_btn_box}>
                                <div className={styles.sort_text}>
                                    Sort by  
                                </div>
                                <div className={styles.divider15}/>
                                <div className={styles.sort_newest}>
                                    <Button title="new" onClick = {() => changeSort("newest")}>new</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_update">
                                    <Button title="update" onClick = {() => changeSort("recent_activity")}>update</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_votes">
                                    <Button title="vote" onClick = {() => changeSort("most_votes")}>votes</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_views">
                                    <Button title="view" onClick = {() => changeSort("most_frequent")}>views</Button>
                                </div>
                                <div className={styles.divider10}/>
                            </div>
                            <div className={styles.filter_select_box}>
                            <div className={styles.sort_text}>
                                   Filter by
                                </div>
                                <div className={styles.divider5}/>
                                <div className={styles.filter_no_answer}>
                                    <Button title="no answer" onClick={() => {filterBy==='no_answer'? changeFilterBy(""):changeFilterBy("no_answer")}}>no answer</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="filter-no_accepted_answer">
                                    <Button title="none accepted" onClick={() => {filterBy==='no_accepted_answer'? changeFilterBy(""):changeFilterBy("no_accepted_answer")}}>no accepted answer</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="filter-none">
                                    <Button title="none" onClick={() => {changeFilterBy(null)}}>no filters</Button>
                                </div>
                                <div className={styles.divider5}/>
                            </div>                      
                            
                        </div>
                        <div className={styles.title_line_box}>
                            <hr className={styles.title_line}/>  
                        </div>
                        
                        <div className={styles.result_list}>
                            <QuestionList Questions={result}/>
                            <div className={styles.page_center}>
                            <div className={styles.select_page_box}>
                                {page===1?<></>:<Button title="prev page" onClick = {() => {changePage(page-1)}}/>}
                                <div className={styles.divider15}/>
                                <div className="page_number">
                                    {page}
                                </div>
                                <div className={styles.divider15}/>
                                {page===maxPage?<></>:<Button title="next page" onClick = {() => {changePage(page+1)}}/>}
                            </div>
                            </div>
                        </div>
            </div>
           
        </div>
    </div>
    )
    
}

//user_id

export const SearchResultUser = ({query}) => {
    console.log(query);
    const [sortedBy, setSortedBy] = useState(query.sorted_by)
    const [page, setPage] = useState(query.page)
    const [result, setResult] = useState([])
    const [maxPage, setMaxPage] = useState(1)
    console.log(result);
    
    useEffect(()=>{
        getQuestionsOfUser(query.user, sortedBy, page)
            .then(questions => {
                setResult(()=>questions)
                setMaxPage(()=>!questions.length? 1: Math.ceil(questions.length/30))
            })
            .catch(console.log)
    },[query, sortedBy, page])
    const Refresh = () => {
        getQuestionsOfUser(query.user, sortedBy, page)
            .then(setResult)
    }
    
    const changeSort = (sortedBy) => {
        setSortedBy(sortedBy)
        Refresh()
    }

    const changePage = (page) => {
        setPage(page)
        Refresh()
    }
    return (
        !result.length? <></>:

        <div className={styles.banner}>
            <LeftBanner/>
        <div className={styles.board}>
            <div className={styles.search_result_head}>
                <div className="search_result_top">              
                </div>
                <div className={styles.divider15}/>
                <div className="result_head_sub">
                    Results for user {query.user}
                </div>
            </div>
            <div className={styles.search_result_body}>
                        <div className={styles.results_info_box}>
                            <div className={styles.sort_btn_box}>
                                <div className={styles.sort_text}>
                                    Sort by  
                                </div>
                                <div className={styles.divider15}/>
                                <div className={styles.sort_newest}>
                                    <Button title="new" onClick = {() => changeSort("newest")}>new</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_update">
                                    <Button title="update" onClick = {() => changeSort("activity")}>update</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_votes">
                                    <Button title="vote" onClick = {() => changeSort("votes")}>votes</Button>
                                </div>
                                <div className={styles.divider5}/>
                                <div className="sort_views">
                                    <Button title="view" onClick = {() => changeSort("views")}>views</Button>
                                </div>
                                <div className={styles.divider10}/>
                            </div>
                        </div>
                        <div className={styles.title_line_box}>
                            <hr className={styles.title_line}/>  
                        </div>
                        
                        <div className={styles.result_list}>
                            <QuestionList Questions={result}/>
                            {!result.length? <div className={styles.no_result}>Sorry, No Results</div> : null}
                            <div>
                            <div className={styles.select_page_box}>
                                {page===1?<></>:<Button title="prev page" onClick = {() => {changePage(page-1)}}/>}
                                <div className={styles.divider15}/>
                                <div className="page_number">
                                    {page}
                                </div>
                                <div className={styles.divider15}/>
                                {page===maxPage?<></>:<Button title="next page" onClick = {() => {changePage(page+1)}}/>}
                            </div>
                            </div>
                        </div>
            </div>
           
        </div>
    </div>
        
    )
    
}