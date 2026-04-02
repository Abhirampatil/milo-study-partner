import { useState, useEffect, useRef } from 'react'
import API from '../axios'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottom = useRef()

  useEffect(() => {
    API.get('/chat/history').then(res => {
      setMessages(res.data.history.map(m => ({ role: m.role, text: m.message })))
    })
  }, [])

  useEffect(() => { bottom.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const send = async () => {
    if (!input.trim()) return
    const userMsg = { role:'user', text: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    const res = await API.post('/chat/', { message: input })
    setMessages(prev => [...prev, { role:'assistant', text: res.data.response }])
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💬 AI Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((m, i) => (
          <div key={i} style={{ ...styles.msg, alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', background: m.role === 'user' ? '#e94560' : '#1a1a2e' }}>
            {m.text}
          </div>
        ))}
        {loading && <div style={{...styles.msg, background:'#1a1a2e', alignSelf:'flex-start'}}>MILO is thinking...</div>}
        <div ref={bottom} />
      </div>
      <div style={styles.inputRow}>
        <input style={styles.input} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Ask MILO anything..." />
        <button style={styles.btn} onClick={send}>Send</button>
      </div>
    </div>
  )
}

const styles = {
  container: { padding:'2rem', background:'#0f0f23', minHeight:'100vh', color:'white', display:'flex', flexDirection:'column' },
  title: { marginBottom:'1rem' },
  chatBox: { flex:1, display:'flex', flexDirection:'column', gap:'1rem', overflowY:'auto', maxHeight:'65vh', padding:'1rem', background:'#16213e', borderRadius:'12px', marginBottom:'1rem' },
  msg: { padding:'0.8rem 1.2rem', borderRadius:'12px', maxWidth:'70%', lineHeight:'1.5', whiteSpace:'pre-wrap' },
  inputRow: { display:'flex', gap:'1rem' },
  input: { flex:1, padding:'0.8rem', borderRadius:'8px', border:'1px solid #333', background:'#1a1a2e', color:'white', fontSize:'1rem' },
  btn: { padding:'0.8rem 1.5rem', background:'#e94560', color:'white', border:'none', borderRadius:'8px', cursor:'pointer', fontSize:'1rem' }
}