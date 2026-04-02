import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../axios'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await API.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('username', res.data.username)
      navigate('/')
    } catch {
      setError('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 MILO</h1>
        <p style={styles.sub}>Your AI Study Partner</p>
        <input style={styles.input} placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
        <input style={styles.input} placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        {error && <p style={styles.error}>{error}</p>}
        <button
          style={{...styles.btn, background: loading ? '#888' : '#e94560', cursor: loading ? 'not-allowed' : 'pointer'}}
          onClick={submit}
          disabled={loading}
        >
          {loading ? 'Connecting to server...' : 'Login'}
        </button>
        <p style={styles.switch}>No account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

const styles = {
  container: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#0f0f23' },
  card: { background:'#1a1a2e', padding:'2.5rem', borderRadius:'12px', width:'360px', display:'flex', flexDirection:'column', gap:'1rem' },
  title: { color:'#e94560', textAlign:'center', margin:0, fontSize:'2rem' },
  sub: { color:'#aaa', textAlign:'center', margin:0 },
  input: { padding:'0.8rem', borderRadius:'8px', border:'1px solid #333', background:'#16213e', color:'white', fontSize:'1rem' },
  btn: { padding:'0.8rem', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem' },
  error: { color:'#e94560', margin:0 },
  switch: { color:'#aaa', textAlign:'center', margin:0 }
}