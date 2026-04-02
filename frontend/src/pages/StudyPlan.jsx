import { useState } from 'react'
import API from '../axios'

export default function StudyPlan() {
  const [form, setForm] = useState({ subject:'', exam_date:'', topics:'', hours_per_day: 2 })
  const [plan, setPlan] = useState('')
  const [loading, setLoading] = useState(false)

  const generate = async () => {
    setLoading(true)
    const res = await API.post('/study/generate', form)
    setPlan(res.data.plan)
    setLoading(false)
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📅 Study Plan Generator</h2>
      <div style={styles.form}>
        <input style={styles.input} placeholder="Subject (e.g. Cloud Computing)" onChange={e => setForm({...form, subject: e.target.value})} />
        <input style={styles.input} type="date" onChange={e => setForm({...form, exam_date: e.target.value})} />
        <textarea style={styles.textarea} placeholder="Topics to cover (comma separated)" onChange={e => setForm({...form, topics: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Study hours per day" min="1" max="12" onChange={e => setForm({...form, hours_per_day: parseInt(e.target.value)})} />
        <button style={styles.btn} onClick={generate} disabled={loading}>{loading ? 'Generating...' : 'Generate Plan'}</button>
      </div>
      {plan && <div style={styles.result}><pre style={styles.pre}>{plan}</pre></div>}
    </div>
  )
}

const styles = {
  container: { padding:'2rem', background:'#0f0f23', minHeight:'100vh', color:'white' },
  title: { marginBottom:'1.5rem' },
  form: { display:'flex', flexDirection:'column', gap:'1rem', maxWidth:'500px', marginBottom:'2rem' },
  input: { padding:'0.8rem', borderRadius:'8px', border:'1px solid #333', background:'#1a1a2e', color:'white', fontSize:'1rem' },
  textarea: { padding:'0.8rem', borderRadius:'8px', border:'1px solid #333', background:'#1a1a2e', color:'white', fontSize:'1rem', height:'100px', resize:'vertical' },
  btn: { padding:'0.8rem', background:'#e94560', color:'white', border:'none', borderRadius:'8px', fontSize:'1rem', cursor:'pointer' },
  result: { background:'#1a1a2e', padding:'1.5rem', borderRadius:'12px', maxWidth:'700px' },
  pre: { whiteSpace:'pre-wrap', color:'#ccc', lineHeight:'1.8', margin:0 }
}