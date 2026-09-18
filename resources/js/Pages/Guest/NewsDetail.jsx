import {useEffect,useState} from 'react';
// import {useParams} from 'react-router-dom'
import axios from 'axios';

function NewsDetail () {
    const [newsData, setNewsData] = useState({});
    // const { id } = useParams();
    const id = 0;

    useEffect(() => {
        axios.get('https://saurav.tech/NewsAPI/everything/bbc-news.json')
            .then(res => {
                setNewsData(res.data.articles[id])
            })
            .catch((err) => console.error(err));

    }, []);

  const article = {
    title: newsData.title,
    author: newsData.author,
    date: newsData.publishedAt,
    category: newsData.source?.name,
    imageUrl: newsData.urlToImage,
    content: newsData.content,
    tags: []
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* Tombol Kembali (Tanpa Ikon) */}
          <button className="btn btn-outline-secondary mb-4 btn-sm">
            Kembali ke Beranda
          </button>

          {/* Judul Berita */}
          <h1 className="fw-bold mb-3">{article.title}</h1>

          {/* Meta Informasi (Tanpa Ikon) */}
          <div className="d-flex flex-wrap align-items-center text-muted mb-4 gap-3">
            <span>Oleh: <span className="fw-medium text-dark">{article.author}</span></span>
            <span>|</span>
            <span>{article.date}</span>
            <span className="badge bg-primary px-3 py-2 ms-auto">{article.category}</span>
          </div>

          {/* Gambar Utama / Hero Image */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="img-fluid rounded mb-4 w-100 shadow-sm"
            style={{ maxHeight: '450px', objectFit: 'cover' }}
          />

          {/* Isi Konten Berita */}
          <article className="news-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#444' }}>
            {article.content}
          </article>

          {/* Bagian Tags */}
          <div className="mt-5 border-top pt-4">
            <h6 className="mb-3 fw-bold text-uppercase text-muted">Tag Topik:</h6>
            <div className="d-flex flex-wrap gap-2">
              {/* {article.tags.map((tag, index) => (
                <span key={index} className="badge bg-light text-dark border p-2 fw-normal">
                  # {tag}
                </span>
              ))} */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
