import React, {Dispatch, SetStateAction} from 'react'
import {Search} from 'lucide-react'
const SearchField = ({searchTerm,setSearchTerm}:{searchTerm:string,setSearchTerm: Dispatch<SetStateAction<string>>}) => {
    return (
        <div className="search button-glow">
            <div className="relative flex items-center">
                <Search/>
                <input
                className=" w-full bg-transparent py-2 sm:pr-5 pl-5 text-base placeholder-light-200 outline-hidden"
                type="text"
                placeholder="SearchField for movies to add"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}
export default SearchField
