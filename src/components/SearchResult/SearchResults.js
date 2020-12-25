import {useState, Fragement} from 'react'
import {getQuestionbyTag, getQuestionbyKwds, getUser} from '../../axios.ts'
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
    let result = filter_by === null? getQuestionbyTag(tags_form, sort, page) : getQuestionbyTag(filter_by,tags_form, sort, page)
    const max_page = result.questions.count()/30

    const Refresh = () => {
        //TODO: 값 확인하기 (refresh 필요 있나)
        result = getQuestionbyTag(tags_form, sort, page)
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
    const [result, setResult] = useState(getQuestionbyKwds(keywords_form, sort, page))
    const [filter_by, setFilter] = query.hasOwnProperty("filter_by")? query.filter_by : null
    const max_page = result.questions.count()/30

    const Refresh = () => {
        setResult(getQuestionbyKwds(keywords_form, filter_by, sort, page))
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
export const SearchResultUser = (match) => {
    console.log(match);
    const {user_id} = match.match.params
    console.log("id :"+ user_id);
    const user = getUser(user_id)
    const [sort, setSort] = useState("newest")
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(getQuestionbyKwds(user_id, sort, page))
    console.log(result);
    const max_page = result.questions.count()/30

    const Refresh = () => {
        setResult(getQuestionbyKwds(user_id, sort, page))
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