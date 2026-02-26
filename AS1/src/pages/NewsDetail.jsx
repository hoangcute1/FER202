import { useParams, Link } from 'react-router-dom'
import { newLists } from '../data/newsData'

function NewsDetail() {
  const { id } = useParams()
  const news = newLists.find((n) => n.id === Number(id))

  if (!news) {
    return (
      <div className="page text-center py-5">
        <h2>News not found</h2>
        <Link to="/news" className="btn btn-primary mt-3">
          Back to News
        </Link>
      </div>
    )
  }

  return (
    <div className="page">
      <Link to="/news" className="news-link mb-2" style={{ fontSize: '1rem' }}>
        &larr; Back to News
      </Link>

      <img
        src={`/${news.images}`}
        alt={news.title}
        className="news-detail-img mb-3"
      />

      <h2 className="news-detail-title">{news.title}</h2>
      <p className="news-detail-desc">{news.description}</p>
    </div>
  )
}

export default NewsDetail
