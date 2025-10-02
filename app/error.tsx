'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Er ging iets mis</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        We konden de pagina niet laden. Probeer het later opnieuw.
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Probeer opnieuw
      </button>
    </div>
  )
}
