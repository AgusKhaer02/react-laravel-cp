export default function Blog({ data }) {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
            <h1>{data['title']}</h1>
            <p>{data['description']}</p>
        </div>
    );
}
