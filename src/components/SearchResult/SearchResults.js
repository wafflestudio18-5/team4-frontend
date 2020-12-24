import {useState, Fragement} from 'react'
import {getQuestionbyTag, getQuestionbyKwds} from '../../axios.ts'
import QuestionList from '../Questions/QuestionList'


//tags: list of tags
export const SearchResultTags = (tags) => {
    const [sort, setSort] = useState("newest")
    const [page, setPage] = useState(1)
    const tags_form = tags.join('+')
    const [result, setResult] = useState(getQuestionbyTag(tags_form, sort, page))
    const max_page = result.questions.count()/30

    const Refresh = () => {
        //TODO: 값 확인하기 (refresh 필요 있나)
        setResult(getQuestionbyTag(tags_form, sort, page))
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
                    Results for tags {tags.map((tag) => <div/*TODO: <a> tag*/>{tag}</div>)}
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

//kwds: list of keywords
export const SearchResultKwds = (kwds) => {
    const [sort, setSort] = useState("newest")
    const [page, setPage] = useState(1)
    const keywords_form = kwds.join('+')
    const [result, setResult] = useState(getQuestionbyKwds(keywords_form, sort, page))
    const max_page = result.questions.count()/30

    const Refresh = () => {
        setResult(getQuestionbyKwds(keywords_form, sort, page))
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
                    Results for keywords {kwds.map((tag) => <div/*TODO: <a> tag*/>{tag}</div>)}
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