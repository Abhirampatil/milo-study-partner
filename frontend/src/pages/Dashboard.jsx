import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const username = localStorage.getItem('username')
  const navigate = useNavigate()

  const cards = [
    { title:'💬 AI Chat', desc:'Ask any academic question and get instant answers', path:'/chat', color:'#e94560' },
    { title:'📅 Study Plan', desc:'Generate a personalised day-by-day study schedule', path:'/study-plan', color:'#4ecca3' },
    { title:'📚 Resources', desc:'Get curated learning resources for any topic', path:'/resources', color:'#f7c59f' },
  ]

  return (
    <div style={styles.container}>
      <h2 style={styles.welcome}>Welcome back, <span style={{color:'#e94560'}}>{username}</span> 👋</h2>
      <p style={styles.sub}>What would you like to do today?</p>
      <div style={styles.grid}>
        {cards.map(c => (
          <div key={c.path} style={{...styles.card, borderTop:`4px solid ${c.color}`}} onClick={() => navigate(c.path)}>
            <h3 style={styles.cardTitle}>{c.title}</h3>
            <p style={styles.cardDesc}>{c.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: { padding:'3rem 2rem', background:'#0f0f23', minHeight:'100vh', color:'white' },
  welcome: { fontSize:'1.8rem', marginBottom:'0.5rem' },
  sub: { color:'#aaa', marginBottom:'2rem' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'1.5rem' },
  card: { background:'#1a1a2e', padding:'1.5rem', borderRadius:'12px', cursor:'pointer', transition:'transform 0.2s' },
  cardTitle: { margin:'0 0 0.5rem', fontSize:'1.2rem' },
  cardDesc: { color:'#aaa', margin:0, fontSize:'0.9rem' }
}