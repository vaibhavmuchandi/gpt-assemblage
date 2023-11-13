"use client"
import SearchResultsContainer from '@/components/SearchResultContainer'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { useEffect } from 'react'

function generateRandomId(): string {
  const array = new Uint8Array(64); // 128 bits / 8 bits per byte = 16 bytes
  if (typeof window !== 'undefined' && window.crypto) {
    window.crypto.getRandomValues(array);
  } else {
    require('crypto').randomFillSync(array);
  }
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem('gptAssemblageKey')) {
      const clientKey = generateRandomId()
      localStorage.setItem('gptAssemblageKey', clientKey);
    }
  }, [])
  return (
    <div className="max-h-screen overflow-y-hidden">
      <NavBar />
      <SearchResultsContainer />
      <Footer />
    </div>
  )
}
