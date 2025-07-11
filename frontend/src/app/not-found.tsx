import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
      <Link href="/" style={{ 
        padding: '10px 20px', 
        backgroundColor: '#2E2E2E', 
        color: 'white', 
        textDecoration: 'none', 
        borderRadius: '8px' 
      }}>
        Go Home
      </Link>
    </div>
  );
} 