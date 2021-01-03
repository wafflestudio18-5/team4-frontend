import {useState, Fragement, useEffect} from 'react'
import {getQuestionsWithTags, getQuestionsWithKeywords, getUser} from '../../axios.ts'
import QuestionList from '../Questions/QuestionList'
import qs from 'qs';
import AskButton from '../Button'

//tags: list of tags
export const SearchResultTags = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    console.log(query);
    console.log(query);
    const [result, setResult] = useState(null)
    const [sort, setSort] = useState(query.hasOwnProperty("filter_by")? query.sorted_by : "newest")
    const [page, setPage] = useState(query.hasOwnProperty("filter_by")? parseInt(query.page) : 1)
    const [filter_by, setFilter] = useState(query.hasOwnProperty("filter_by")? query.filter_by : null)   
    const tags_form = query.tags.replace(' ', '+')
    console.log(query.tags);
    console.log(tags_form);
    console.log(sort);
    console.log(page);
    console.log(filter_by);

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
    }

    const changePage = (n_page) => {
        setPage(n_page)
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
        <>
        <div className="search-result-head">
                <div className="search-result-top">
                    <div className="search-result-title">
                        Search Results
                    </div>
                    <div className="search-result-top-right-box">
                        <div className="advanced-tip-box">
                            Advanced Question
                        </div>
                        <AskButton/>
                    </div>                
                </div>
                <div className="result-head-sub">
                    Results for tags {tags_form}
                </div>
            </div>
            <div className="search-result-body">
                    <div className="result-body">
                        <div className="search-bar-box">
                            <div className="search-input">
                                <input placeholder="input keywords/tags"/>
                            </div>
                            <div className="search-btn-box">
                                <button className="search-btn">Search</button>
                            </div>
                        </div>
                        <div className="results-info-box">
                            <div className="results-num-box">
                                results
                            </div>
                            <div className="sort-btn-box">
                                <div className="sort-newest">
                                    <button className="new-btn" onClick = {() => changeSort("newest")}>new</button>
                                </div>
                                <div className="sort-update">
                                    <button className="update-btn" onClick = {() => changeSort("recent_activity")}>update</button>
                                </div>
                                <div className="sort-votes">
                                    <button className="vote-btn" onClick = {() => changeSort("most_votes")}>votes</button>
                                </div>
                                <div className="sort-views">
                                    <button className="view-btn" onClick = {() => changeSort("most_frequent")}>views</button>
                                </div>
                            </div>
                            <div className="filter_select-box">
                                <div className="filter-no-answer">
                                    <button onClick={() => {setFilter("no_answer")}}>no answer</button>
                                </div>
                                <div className="filter-no_accepted_answer">
                                    <button onClick={() => {setFilter("no_accepted_answer")}}>no accepted answer</button>
                                </div>
                                <div className="filter-none">
                                    <button onClick={() => {setFilter(null)}}>no filters</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <QuestionList Questions={result}/>
            <div className="select-page-box">
                <div className="page-plus-btn-box">
                    <button className="page-plus-btn" onClick = {() => {changePage(page===max_page? max_page : page+1)}}>next page</button>
                </div>
                {page}
                <div className="page-minus-btn-box">
                    <button className="page-minus-btn" onClick = {() => {changePage(page===1? 1 : page-1)}}>prev page</button>
                </div>
            </div>
        </>
    )
    
}

//kwds: list of keywords
export const  SearchResultKeywords = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    console.log(query);
    const [sort, setSort] = query.sorted_by
    const [page, setPage] = query.page
    const keywords_form = query.keywords.replace(' ', '+')
    const [result, setResult] = useState(null)
    const [filter_by, setFilter] = useState(query.hasOwnProperty("filter_by")? query.filter_by : null)
    //const max_page = result.questions.count()/30
    var max_page = 1
    
    const changeSort = (n_sort) => {
        setSort(n_sort)
    }

    const changePage = (n_page) => {
        setPage(n_page)
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
        <Fragement className="search-result-kwds-box">
            <div className="search-result-head">
                <div className="search-result-top">
                    <div className="search-result-title">
                        Search Results
                    </div>
                    <div className="search-result-top-right-box">
                        <div className="advanced-tip-box" /*TODO: <a> tag*/>
                            Advanced Question
                        </div>
                        <div className="ask-q-box">
                            <button className="ask-q-btn" /*TODO: pnClick*/></button>
                        </div>
                    </div>                
                </div>
                <div className="result-head-sub">
                    Results for keywords {keywords_form}
                </div>
            </div>
            <div className="search-result-body">
                    <div className="result-body">
                        <div className="search-bar-box">
                            <div className="search-input">
                                <input placeholder="input keywords/tags"/>
                            </div>
                            <div className="search-btn-box">
                                <button className="search-btn" /*TODO: 나중에 tags, keywords 합칠 거라서 아직 구현 안함*/>Search</button>
                            </div>
                        </div>
                        <div className="results-info-box">
                            <div className="results-num-box">
                                {result.questions.count()} results
                            </div>
                            <div className="sort-btn-box" /*TODO: 두 개는 dropdown?*/>
                                <div className="sort-newest">
                                    <button className="new-btn" onClick = {() => changeSort("newest")}>new</button>
                                </div>
                                <div className="sort-update">
                                    <button className="update-btn" onClick = {() => changeSort("recent_activity")}>update</button>
                                </div>
                                <div className="sort-votes">
                                    <button className="vote-btn" onClick = {() => changeSort("most_votes")}>votes</button>
                                </div>
                                <div className="sort-views">
                                    <button className="view-btn" onClick = {() => changeSort("most_frequent")}>views</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            {/* <QuestionList Questions={result.questions}/> */}
            <div className="select-page-box">
                <div className="page-plus-btn-box">
                    <button className="page-plus-btn" onClick = {() => {changePage(page===max_page? max_page : page+1)}}>next page</button>
                </div>
                {page}
                <div className="page-minus-btn-box">
                    <button className="page-minus-btn" onClick = {() => {changePage(page===1? 1 : page-1)}}>prev page</button>
                </div>
            </div>
        </Fragement>
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
    const [result, setResult] = useState(getQuestionsWithKeywords(user_id, sort, page))
    console.log(result);
    const max_page = result.questions.count()/30

    const Refresh = () => {
        setResult(getQuestionsWithKeywords(user_id, sort, page))
    }
    
    const changeSort = (n_sort) => {
        setSort(n_sort)
        Refresh()
    }

    const changePage = (n_page) => {
        setPage(n_page)
        Refresh()
    }



    
    return (
        <Fragement className="search-result-kwds-box">
            <div className="search-result-head">
                <div className="search-result-top">
                    <div className="search-result-title">
                        Search Results
                    </div>
                    <div className="search-result-top-right-box">
                        <div className="advanced-tip-box" /*TODO: <a> tag*/>
                            Advanced Question
                        </div>
                        <div className="ask-q-box">
                            <button className="ask-q-btn" /*TODO: pnClick*/></button>
                        </div>
                    </div>                
                </div>
                <div className="result-head-sub">
                    Results for user {user.username}
                </div>
            </div>
            <div className="search-result-body">
                    <div className="result-body">
                        <div className="search-bar-box">
                            <div className="search-input">
                                <input placeholder="input keywords/tags"/>
                            </div>
                            <div className="search-btn-box">
                                <button className="search-btn" /*TODO: 나중에 tags, keywords 합칠 거라서 아직 구현 안함*/>Search</button>
                            </div>
                        </div>
                        <div className="results-info-box">
                            <div className="results-num-box">
                                {result.questions.count()} results
                            </div>
                            <div className="sort-btn-box" /*TODO: 두 개는 dropdown?*/>
                                <div className="sort-newest">
                                    <button className="new-btn" onClick = {() => changeSort("newest")}>new</button>
                                </div>
                                <div className="sort-update">
                                    <button className="update-btn" onClick = {() => changeSort("recent_activity")}>update</button>
                                </div>
                                <div className="sort-votes">
                                    <button className="vote-btn" onClick = {() => changeSort("most_votes")}>votes</button>
                                </div>
                                <div className="sort-views">
                                    <button className="view-btn" onClick = {() => changeSort("most_frequent")}>views</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <QuestionList Questions={result.questions}/>
            <div className="select-page-box">
                <div className="page-plus-btn-box">
                    <button className="page-plus-btn" onClick = {() => {changePage(page===max_page? max_page : page+1)}}>next page</button>
                </div>
                {page}
                <div className="page-minus-btn-box">
                    <button className="page-minus-btn" onClick = {() => {changePage(page===1? 1 : page-1)}}>prev page</button>
                </div>
            </div>
        </Fragement>
    )
    
}