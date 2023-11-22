import './App.css';
import React, { useState, useEffect } from "react";
import Axios from 'axios';
import axios from "axios";
import Item from "./component/Item";
const API_KEY = '7X30L00kEe4yb0k1p1R3VfEnONAvJAFg';
function App() {
    const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(0)
    const [hasMore, setHasMore] = useState(false)
  const searchAPI = () => {
    axios.get(`http://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${encodeURIComponent(query)}&api-key=${API_KEY}&offset=${currentPage}`)
        .then((res) => {
            if (query == '')
            {
                alert('Lütfen arama kelimesi giriniz.')
                return
            }
            setLoading(  true)
          if (res.data.status === 'OK')
          {
            setData(res.data.results == null ? [] : res.data.result)
            setHasMore(res.data.has_more)
              setLoading(  false)
          }
          else
          {
            alert('Bir Hata Oluştu')
          }
        }).catch((error) => {
          alert('Bulunamadı')
    })
  }

  useEffect(() => {
    if (query != '')
    {
        setData([])
        searchAPI()
    }
  }, [currentPage])
  return <div>
    <div className="search-area">
     <div>
         <input className="input" type="text" onChange={(event) => setQuery(event.target.value)} value={query}/>
         <button className='search-button' onClick={ searchAPI }>Search</button>
     </div>
        <div>{ loading && <span>Yükleniyor</span>}</div>
    </div>
      <div className="item-area">
          { data.length > 0 && data.map((item) => <Item item={item}/>)}
          { !loading && data.length == 0 && <div><span>Veri Bulunamadı</span></div>}
      </div>
      <div className="pagination">
          {hasMore && currentPage > 0 &&
              <div>
                  <button onClick={() => setCurrentPage(currentPage - 1)}>Geri</button>
              </div>
          }
          {hasMore &&
              <div>
                  <button onClick={() => setCurrentPage(currentPage + 1)}>İleri</button>
              </div>
          }
      </div>
  </div>
}

export default App;
