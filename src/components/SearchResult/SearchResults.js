import {useState, Fragement, useEffect} from 'react'
import {getQuestionsWithTags, getQuestionsWithKeywords, getUser} from '../../axios.ts'

import QuestionList from '../Questions/QuestionList'
import {useHistory} from 'react-router-dom'
import qs from 'qs';
import Button from '../Button_search'
import styles from './SearchResult.module.scss'
import LeftBanner from '../Banner/LeftBanner'

//tags: list of tags
export const SearchResultTags = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    console.log(query);
    console.log(query);
    const [result, setResult] = useState(null)
    const [sort, setSort] = useState(query.hasOwnProperty("sorted_by")? query.sorted_by : "newest")
    const [page, setPage] = useState(query.hasOwnProperty("psge")? parseInt(query.page) : 1)
    const [filter_by, setFilter] = useState(query.hasOwnProperty("filter_by")? query.filter_by : null)   
    const tags_form = query.tags.replace('+','%2b').replace(' ', '+')
    console.log(query.tags);
    console.log(tags_form);
    console.log(sort);
    console.log(page);
    console.log(filter_by);
    const history = useHistory();

    console.log(!result === null);

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    console.log(isEmpty(result));

    var max_page = 1


    
    const changeSort = (n_sort) => {
        setSort(n_sort)
        history.push(`?tags=${tags_form}&page=${page}&sorted_by=${n_sort}`)
        history.go(0);
    }

    const changePage = (n_page) => {
        setPage(n_page)
        history.push(`?tags=${tags_form}&page=${n_page}&sorted_by=${sort}`)
        history.go(0);
    }

    const changeFilter = (n_filter) => {
        setFilter(n_filter)
        if (n_filter === null) {
            history.push(`?tags=${tags_form}&page=${page}&sorted_by=${sort}`)
            history.go(0);
        }
        else {
        history.push(`?tags=${tags_form}&page=${page}&sorted_by=${sort}&filter_by=${n_filter}`)
        history.go(0);
        }
    } 

    useEffect(() => {
        if (result === null) {
            getQuestionsWithTags(tags_form, sort, page, filter_by)  
            .then(res => {
                console.log("getting questions");
                console.log(res);
                setResult(res)
            })
            .catch(e => {
                console.log("error in getting qs");
                console.log(e);
            })
        }
        
    })
    if (result === null) {
        return(
            <>
            Loading...
            </>
        )
    }
    
    return (
        <div className={styles.banner}>
            <div className={styles.nav}>
                <LeftBanner/>
            </div>
            
        <div className={styles.board}>
            <div className={styles.search_result_head}>
                <div className="search_result_top">              
                </div>
                <div className={styles.divider15}/>
                <div className="result_head_sub">
                    Results for tags {tags_form}
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
                                <Button title="prev page" onClick = {() => {changePage(page===1? 1 : page-1)}}/>
                                <div className={styles.divider15}/>
                                <div className="page_number">
                                    {page}
                                </div>
                                <div className={styles.divider15}/>
                                <Button title="next page" onClick = {() => {changePage(page===max_page? max_page : page+1)}}/>
                            </div>
                            </div>
                    </div>
            </div>
           
        </div>
    </div>
    )
    
}

//kwds: list of keywords
export const  SearchResultKeywords = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    console.log(query);
    const [sort, setSort] = useState(query.hasOwnProperty("filter_by")? query.sorted_by : "newest")
    const [page, setPage] = useState(query.hasOwnProperty("filter_by")? parseInt(query.page) : 1)
    const keywords_form = query.keywords.replace('+','%2b').replace(' ', '+')
    const [result, setResult] = useState(null)
    const [filter_by, setFilter] = useState(query.hasOwnProperty("filter_by")? query.filter_by : null)
    //const max_page = result.questions.count()/30
    var max_page = 1
    const history = useHistory(0);
    
    const changeSort = (n_sort) => {
        setSort(n_sort)

        history.push(`?keywords=${keywords_form}&page=${page}&sorted_by=${n_sort}/`)
        history.go(0);
    }

    const changePage = (n_page) => {
        setPage(n_page)

        history.push(`?keywords=${keywords_form}&page=${n_page}&sorted_by=${sort}/`)
        history.go(0);
    }

    const changeFilter = (n_filter) => {
        setFilter(n_filter)
        history.push(`?keywords=${keywords_form}&page=${page}&sorted_by=${sort}@filter_by=${n_filter}/`)
        history.go(0);
    } 

    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    useEffect(() => {
        if (result === null) {
            getQuestionsWithKeywords(keywords_form, sort, page, filter_by)  
            .then(res => {
                console.log("getting questions");
                console.log(res);
                setResult(res)
            })
            .catch(e => {
                console.log("error in getting qs");
                console.log(e);
            })
        }
        
    })
    if (result === null) {
        return(
            <>
            Loading...
            </>
        )
    }


    
    return (
        <div className={styles.banner}>
            <div className={styles.nav}>
                <LeftBanner/>
            </div>
            
        <div className={styles.board}>
            <div className={styles.search_result_head}>
                <div className="search_result_top">              
                </div>
                <div className={styles.divider15}/>
                <div className="result_head_sub">
                    Results for keywords {keywords_form}
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
                            <div className={styles.page_center}>
                            <div className={styles.select_page_box}>
                                <Button title="prev page" onClick = {() => {changePage(page===1? 1 : page-1)}}/>
                                <div className={styles.divider15}/>
                                <div className="page_number">
                                    {page}
                                </div>
                                <div className={styles.divider15}/>
                                <Button title="next page" onClick = {() => {changePage(page===max_page? max_page : page+1)}}/>
                            </div>
                            </div>
                        </div>
            </div>
           
        </div>
    </div>
    )
    
}

//user_id

export const SearchResultUser = (match) => {
    console.log(match);
    const {user_id} = match.match.params
    console.log("id :"+ user_id);
    const user = getUser(user_id)
    const [sort, setSort] = useState("newest")
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(null)
    const [no_result, setNoResult] = useState(true)
    console.log(result);
    var maxPage = 1
    
    

    const changeSort = (n_sort) => {
        setSort(n_sort)
    }

    const changePage = (n_page) => {
        setPage(n_page)

    }

    useEffect(() => {
        if (result === null) {
            getQuestionsWithKeywords(user_id, sort, page)  
            .then(res => {
                console.log("getting questions");
                console.log(res);
                if (res.length !== 0) {
                    console.log("something is here");
                    setNoResult(false);
                } 
                setResult(res)
            })
            .catch(e => {
                console.log("error in getting qs");
                console.log(e);
            })
        }
        
    })
    if (result === null) {
        return(
            <>
            Loading...
            </>
        )
    }

    
    return (

        <div className={styles.banner}>
            <div className={styles.nav}>
                <LeftBanner/>
            </div>
            
        <div className={styles.board}>
            <div className={styles.search_result_head}>
                <div className="search_result_top">              
                </div>
                <div className={styles.divider15}/>
                <div className="result_head_sub">
                    Results for user {user.nickname}
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
                        </div>
                        <div className={styles.title_line_box}>
                            <hr className={styles.title_line}/>  
                        </div>
                        
                        <div className={styles.result_list}>
                            <QuestionList Questions={result}/>
                            {no_result? <div className={styles.no_result}>Sorry, No Results</div> : null}
                            <div>
                            <div className={styles.select_page_box}>
                                <Button title="prev page" onClick = {() => {changePage(page===1? 1 : page-1)}}/>
                                <div className={styles.divider15}/>
                                <div className="page_number">
                                    {page}
                                </div>
                                <div className={styles.divider15}/>
                                <Button title="next page" onClick = {() => {changePage(page===maxPage? maxPage : page+1)}}/>
                            </div>
                            </div>
                        </div>
            </div>
           
        </div>
    </div>
    )
    
}