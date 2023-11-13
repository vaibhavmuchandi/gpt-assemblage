import { useState, useEffect } from 'react';
import SearchResult from './SearchResult';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchIcon } from "@sanity/icons"

const SearchResultsContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<any>([])
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
        console.log("Getting...")
        try {
            if (!query) {
                const response = await fetch(`https://api.gptassemblage.com/gpt`, {
                    method: "GET",
                })
                const data = await response.json()
                console.log(data)
                setResults(data.items)
            } else {
                const response = await fetch(`https://api.gptassemblage.com/gpt?query=${searchTerm}`, {
                    method: "GET",
                })
                const data = await response.json()

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

    }

    useEffect(() => {
        getResults()
    }, [])

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
                </form>
            </div>
            {<div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[65vh] overflow-y-scroll overflow-x-hidden">
                {results.map((result: any, index: any) => (
                    <SearchResult key={index} title={result.title} snippet={result.snippet} url={result.link} />
                ))}
            </div>}
            <ToastContainer />
        </div>
    );
};

export default SearchResultsContainer;
