import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import API from '../axios'

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  const submit = async () => {
    try {
      await API.post('/auth/register', form)
      setMsg('Account created! Redirecting...')
      setTimeout(() => navigate('/login'), 1500)
    } catch (e) {
      setMsg(e.response?.data?.detail || 'Error')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 MILO</h1>
        <p style={styles.sub}>Create your account</p>
        <input style={styles.input} placeholder="Username" onChange={e => setForm({...form, username: e.target.value})} />
        <input style={styles.input} placeholder="Password" type="password" onChange={e => setForm({...form, password: e.target.value})} />
        {msg && <p style={styles.msg}>{msg}</p>}
        <button style={styles.btn} onClick={submit}>Register</button>
        <p style={styles.switch}>Have an account? <Link to="/login">Login</Link></p>
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
  btn: { padding:'0.8rem', background:'#e94560', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem', cursor:'pointer' },
  msg: { color:'#4ecca3', margin:0 },
  switch: { color:'#aaa', textAlign:'center', margin:0 }
}