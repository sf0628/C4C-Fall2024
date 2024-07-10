import { useState} from 'react';

interface SearchPartnerProps {
    onSearchByTitle: (title: string) => void;
    onSearchByStatus: (status: boolean) => void;
    onSearch: () => void;
}

function SearchPartner({onSearchByTitle, onSearchByStatus, onSearch}: SearchPartnerProps) {
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<boolean>(false);
    const [filterType, setFilterType] = useState<string>('title'); // should be either 'title' or 'status'


    const handleSearch = async () => {
        if (filterType === 'title') {
            onSearchByTitle(title);
        } else if (filterType === 'status') {
            onSearchByStatus(status);
        } else {
            onSearch();
        }

        setTitle('');
        setStatus(false);
        setFilterType('');
    }

    // const handleLogin = async (username: string, password: string) => {
    //     onAdminLogin(username, password);
    //     setShowLogin(false);

    // }

    return (
        <div id="search-content">
            <form id="search-form" method="GET">
                <h1 className="search-title"> View Partners</h1>
                <div className="form-group">
                    <input 
                        type="radio" 
                        id="by-title" 
                        name="search"
                        onChange={() => setFilterType('title')}
                        checked={filterType === 'title'}
                    />
                    <label htmlFor="by-title">Filter By Title </label>
                    {filterType === 'title' && (
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter title"
                        />
                    )}
                </div>

                <div className="form-group">
                    <input 
                        type="radio" 
                        id="by-status" 
                        name="search"
                        onChange={() => setFilterType('status')}
                        checked={filterType === 'status'}
                    />
                    <label htmlFor="by-status">Filter By Status </label>
                    {filterType === 'status' && (
                        <select value={status ? 'true' : 'false'} onChange={(e) => setStatus(e.target.value === 'true')}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    )}
                </div>

                <div className="form-group">
                    <input 
                        type="radio" 
                        id="no-filer" 
                        name="search"
                        onChange={() => setFilterType('')}
                        checked={filterType === ''}
                    />
                    <label htmlFor="no-filter">No Filter</label> 
                </div>
            </form>
            <button type="button" onClick={handleSearch}>Show</button>
        </div>
    );
} 

export default SearchPartner;