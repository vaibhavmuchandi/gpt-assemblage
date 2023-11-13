"use client"
import SearchResultsContainer from '@/components/SearchResultContainer'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="max-h-screen overflow-y-hidden">
      <NavBar />
      <SearchResultsContainer />
      <Footer />
    </div>
  )
}
