import { useState } from 'react'
import API from '../axios'

export default function Resources() {
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const recommend = async () => {
    setLoading(true)
    const res = await API.post('/resources/recommend', { topic })
    setResult(res.data.resources)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 Resource Recommender</h2>
      <div style={styles.row}>
        <input style={styles.input} placeholder="Enter a topic (e.g. React Hooks)" onChange={e => setTopic(e.target.value)} />
        <button style={styles.btn} onClick={recommend} disabled={loading}>{loading ? 'Finding...' : 'Get Resources'}</button>
      </div>
      {result && <div style={styles.result}><pre style={styles.pre}>{result}</pre></div>}
    </div>
  )
}

const styles = {
  container: { padding:'2rem', background:'#0f0f23', minHeight:'100vh', color:'white' },
  title: { marginBottom:'1.5rem' },
  row: { display:'flex', gap:'1rem', maxWidth:'600px', marginBottom:'2rem' },
  input: { flex:1, padding:'0.8rem', borderRadius:'8px', border:'1px solid #333', background:'#1a1a2e', color:'white', fontSize:'1rem' },
  btn: { padding:'0.8rem 1.5rem', background:'#e94560', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem', cursor:'pointer' },
  result: { background:'#1a1a2e', padding:'1.5rem', borderRadius:'12px', maxWidth:'700px' },
  pre: { whiteSpace:'pre-wrap', color:'#ccc', lineHeight:'1.8', margin:0 }
}