import { useState } from 'react';
import Image from 'next/image';
import rediectSvg from "./assets/redirect-svgrepo-com.svg"
import { CopyIcon } from "@sanity/icons"

interface SearchResultProps {
    title: string;
    snippet: string;
    url: string;
}

const SearchResult = ({ title, snippet, url }: SearchResultProps) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md space-y-2 flex flex-col justify-between">
            <div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-white font-semibold text-lg hover:text-gray-300 cursor-pointer">
                    <div className='flex flex-row items-center'>{title} <Image src={rediectSvg} alt={''} width={20} className="ml-3" /></div>
                </a>
                <p className="text-gray-400">{snippet}</p>
            </div>
            <button onClick={copyToClipboard} className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 self-end">
                {copied ? ` Copied!` : <span className='flex flex-row items-center '><CopyIcon />Copy URL</span>}
            </button>
        </div>

    );
};

export default SearchResult;
