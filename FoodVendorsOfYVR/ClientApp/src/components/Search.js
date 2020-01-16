import React, { useState, useEffect } from "react"

function Search(props) {

    const [query, setQuery] = useState("")
    const [search, setSearch] = useState("")


    useEffect(() => {
        const handleSearch = () => {
            props.getValue(search)
        };
        handleSearch();
    }, [search])

    const handleQuery = (event) => {
        setQuery(event.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSearch(query)
        props.getValue(search)
        setQuery("")
    }

    return (
        <form className="form-inline flex-nowrap" onSubmit={handleSubmit}>
            <input id="input" className="form-control mr-sm-2" type="search" placeholder="Search Vendor or Description"
                aria-label="Search" name="search" value={query} onChange={handleQuery} />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" value="submit" >Search</button>
        </form>
    )
}

export default Search