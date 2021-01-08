import styles from '../AppStyles.module.scss'
import LeftBanner from './Banner/LeftBanner'
import {SearchResultTags} from '../components/SearchResult/SearchResults'

//The Main Page needs many Components : TopBar, List of Questions, ...etc
const Main = () => {
    let query = {
        tags: [],
        sorted_by: 'newest',
        page: 1
    }
    return(
       
         <SearchResultTags query={query}/>

    )
}

export default Main