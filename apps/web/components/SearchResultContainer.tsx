import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchIcon, ColorWheelIcon, RefreshIcon } from "@sanity/icons"

const SearchResultsContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const notify = () => toast.error('No Results Found!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyTooManyRequest = () => toast.error('Too Many Requests!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const getResults = async (query?: string) => {
        setLoading(true)
        const clientKey = localStorage.getItem('gptAssemblageKey');
        console.log(clientKey)
        try {
            if (!query) {
                const response = await fetch(`http://localhost:40010/gpt`, {
                    method: "GET",
                    headers: { 'X-Client-Key': String(clientKey) }
                })
                const data = await response.json()
                console.log(data)
                setResults(data.items)
            } else {
                const response = await fetch(`http://localhost:40010/gpt?query=${searchTerm}`, {
                    method: "GET",
                    headers: { 'X-Client-Key': String(clientKey) }
                })
                const data = await response.json()
                setSearchTerm("")
                if (data.items) {
                    setResults(data.items)
                } else {
                    console.log("not found")
                    notify()
                }
            }
        } catch (e) {
            notifyTooManyRequest()
        }
        setLoading(false)
    }

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Searching for:', searchTerm);
        getResults(searchTerm)
    };

    return (
        <div className="bg-black p-6 flex items-center justify-center flex-col">
            <div className='flex flex-row m-3 items-center justify-evenly mb-5'>
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 w-full text-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                    />
                    <button
                        type="submit"
                        className="flex flex-row items-center justify-center px-4 py-2 ml-3 bg-gray-800 text-white rounded-r-lg hover:bg-gray-700"
                    >
                        <SearchIcon fontSize={26} /> Search
                    </button>
                    {results.length !== 0 && <button
                        type="submit"
                        className="flex flex-row items-center justify-center px-4 py-2 ml-3 bg-gray-800 text-white rounded-r-lg hover:bg-gray-700"
                        onClick={() => getResults()}
                    >
                        <RefreshIcon fontSize={26} /> Refresh
                    </button>}
                </form>
            </div>
            {!loading ?
                results.length !== 0 ? <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 h-[65vh] overflow-y-scroll overflow-x-hidden`}>
                    {results.map((result: any, index: any) => (
                        <SearchResult key={index} title={result.title} snippet={result.snippet} url={result.link} />
                    ))}
                </div> :
                    <button
                        type="submit"
                        className="flex flex-row items-center justify-center px-4 py-2 ml-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                        onClick={() => getResults()}
                    >
                        <ColorWheelIcon fontSize={26} /> Get Random GPTs
                    </button> :
                <div className='flex w-full h-full items-center justify-center'><div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
                </div>
                </div>}
            <ToastContainer />
        </div>
    );
};

export default SearchResultsContainer;
