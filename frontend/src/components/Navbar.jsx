import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav style={styles.nav}>
      <span style={styles.logo}>🎓 MILO</span>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/chat" style={styles.link}>AI Chat</Link>
        <Link to="/study-plan" style={styles.link}>Study Plan</Link>
        <Link to="/resources" style={styles.link}>Resources</Link>
        <button onClick={logout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  )
}

const styles = {
  nav: { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem 2rem', background:'#1a1a2e', color:'white' },
  logo: { fontSize:'1.5rem', fontWeight:'bold', color:'#e94560' },
  links: { display:'flex', gap:'1.5rem', alignItems:'center' },
  link: { color:'white', textDecoration:'none', fontSize:'0.95rem' },
  btn: { background:'#e94560', color:'white', border:'none', padding:'0.4rem 1rem', borderRadius:'6px', cursor:'pointer' }
}