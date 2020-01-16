import React, { useState, useEffect } from 'react'

function Pagination(props) {

    const [prevDisabled, setPrevDisabled] = useState("")
    const [nextDisabled, setNextDisabled] = useState("")

    useEffect(() => {
        setNextDisabled((props.currentPage + 1) > (Math.ceil(props.totalVendors / props.vendorsPerPage)) ? "disabled" : "");
        setPrevDisabled((props.currentPage - 1) < 1 ? "disabled" : "");
    }, [props]);

    function paginate(paginate) {

        paginate === 'previous' ? props.paginate(props.currentPage - 1) : props.paginate(props.currentPage + 1);
    }

    return (
        <div>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className={`btn btn-primary ${prevDisabled}`} href="javascript:void(0);" onClick={() => paginate('previous')} >Previous</a></li>
                    <li className="page-item"><a className={`btn btn-primary ${nextDisabled}`} href="javascript:void(0);" onClick={() => paginate('next')} >Next</a></li>
                </ul>
            </nav>
        </div>       
    );
}

export default Pagination;