import styles from '../AppStyles.module.scss'
import LeftBanner from './Banner/LeftBanner'
import {SearchResultTags} from '../components/SearchResult/SearchResults'

//The Main Page needs many Components : TopBar, List of Questions, ...etc
const Main = () => {
    const query={
        tags: [],
        page:1,
        sorted_by: 'newest'
    }
    return(
        <div className={styles.banners}>
          <SearchResultTags query={query}/>
        </div>
    )
}

export default Main