import React, {useState, useEffect, Fragement} from 'react'
import {getQuestionsWithTags, getQuestionsWithKeywords, getQuestionsOfUser, getUser} from '../../axios.ts'
import QuestionList from '../Questions/QuestionList'
import qs from 'qs';

//tags: list of tags
export const SearchResultTags = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    console.log(query);
    const [sort, setSort] = useState(query.sorted_by)
    const [page, setPage] = useState(parseInt(query.page))
    const [filter_by, setFilter] = query.hasOwnProperty("filter_by")? query.filter_by : null
    const tags_form = query.tags
    let result = filter_by === null? getQuestionsWithTags(tags_form, sort, page) : getQuestionsWithTags(filter_by,tags_form, sort, page)
    const max_page = result.questions.count()/30
    const Refresh = () => {
        //TODO: 값 확인하기 (refresh 필요 있나)
        result = getQuestionsWithTags(tags_form, sort, page)
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
        <Fragement className="search-result-tags-box">
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

//kwds: list of keywords
export const    SearchResultKwds = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const [sort, setSort] = query.sorted_by
    const [page, setPage] = query.page
    const keywords_form = query.kwds
    const [result, setResult] = useState(getQuestionsWithKeywords(keywords_form, sort, page))
    const [filter_by, setFilter] = query.hasOwnProperty("filter_by")? query.filter_by : null
    const max_page = result.questions.count()/30

    const Refresh = () => {
        setResult(getQuestionsWithKeywords(keywords_form, filter_by, sort, page))
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

//user_id
export const SearchResultUser = ({query}) => {
    console.log(query);
    const [sortedBy, setSortedBy] = useState(query.sorted_by)
    const [page, setPage] = useState(query.page)
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)
    const [maxPage, setMaxPage] = useState(0)
    console.log(result);

    useEffect(()=>{
        getQuestionsOfUser(query.user, sortedBy, page)
            .then(questions => {
                setResult(()=>questions)
                setMaxPage(()=>Math.ceil(questions.length/30))
                setLoading(()=>false)
            })
            .catch(console.log)
    },[sortedBy, page])
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
        <div className="search-result-kwds-box">
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
                    Results for user {query.user}
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
                                {result.length} results
                            </div>
                            <div className="sort-btn-box" /*TODO: 두 개는 dropdown?*/>
                                <div className="sort-newest">
                                    <button className="new-btn" onClick = {() => changeSort("newest")}>new</button>
                                </div>
                                <div className="sort-update">
                                    <button className="update-btn" onClick = {() => changeSort("activity")}>update</button>
                                </div>
                                <div className="sort-votes">
                                    <button className="vote-btn" onClick = {() => changeSort("votes")}>votes</button>
                                </div>
                                <div className="sort-views">
                                    <button className="view-btn" onClick = {() => changeSort("views")}>views</button>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <QuestionList Questions={result}/>
            <div className="select-page-box">
                <div className="page-plus-btn-box">
                    {page===maxPage?<></>:<button className="page-plus-btn" onClick = {() => {changePage(page+1)}}>next page</button>}
                </div>
                {page}
                <div className="page-minus-btn-box">
                    {page===maxPage?<></>:<button className="page-minus-btn" onClick = {() => {changePage(page===1? 1 : page-1)}}>prev page</button>}
                </div>
            </div>
        </div>
    )
    
}