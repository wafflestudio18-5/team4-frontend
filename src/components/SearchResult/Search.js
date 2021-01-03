import React from 'react'
import qs from 'qs'
import { SearchResultKwds, SearchResultTags, SearchResultUser } from './SearchResults';
const Search = ({location}) => {
    const q = qs.parse(location.search, {ignoreQueryPrefix: true});
    console.log(q);

    const spaceRegex = /\s+/
    const userRegex = /user:[0-9]+/
    const tagRegex = /\[.+\]/

    let q_list = q.q.split(spaceRegex)
    console.log(q_list)

    let query = {
        keywords: [],
        tags: [],
        user: null,
        sorted_by: 'newest',
        page: 1
    }
    for(let keyword of q_list) {
        if(!keyword) continue;
        if(keyword.match(userRegex)) {
            query.user = parseInt(keyword.slice(5)); continue;
        }
        if(keyword.match(tagRegex)) {
            query.tags.push(keyword.slice(1,-1)); continue;
        }
        query.keywords.push(keyword)
    }
    console.log(query)
    return(
        <>
            <h3>Search result {
                query.user? query.tags.length? <>with tags [{query.tags.toString()}] by User {query.user} </>
                :<>by User {query.user}</>
                :query.tags.length? query.keywords.length? <>for {query.keywords.toString()} with tags [{query.tags.toString()}]</>
                :<>with tags [{query.tags.toString()}]</>
                :<>for {query.keywords.toString()}</>
            }</h3>
            <SearchResult query={query}/>
        </>
    )
}

const SearchResult = ({query}) => {
    const {keywords, tags, user} = query
    if(user && !tags.length) return <SearchResultUser query={query}/>
    if(user || tags.length) return <SearchResultTags query={query}/>
    return <SearchResultKwds query={query}/>

}
export default Search