import React, { useState, useEffect } from 'react';

function Vendors(props) {

    const [vendors, setVendors] = useState(props.vendors);

    function onSortChange(sortParam) {
        let sortedVendors;

        if (sortParam === 'name') {
            if (props.nameSort === 'asc') {
                this.setState({ nameSort: 'desc', descriptionSort: 'asc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.business_name === null) - (b.business_name === null) || +(a.business_name > b.business_name) || -(a.business_name < b.business_name)
                });
            } else {
                this.setState({ nameSort: 'asc', descriptionSort: 'asc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.business_name === null) - (b.business_name === null) || -(a.business_name > b.business_name) || +(a.business_name < b.business_name)
                });
            }
        } else {
            if (this.state.descriptionSort === 'asc') {
                this.setState({ nameSort: 'asc', descriptionSort: 'desc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.description === null) - (b.description === null) || +(a.description > b.description) || -(a.description < b.description)
                });
            } else {
                this.setState({ nameSort: 'asc', descriptionSort: 'asc' });
                sortedVendors = this.state.foodVendors.sort(function (a, b) {
                    return (a.description === null) - (b.description === null) || -(a.description > b.description) || +(a.description < b.description)
                });
            }
        }

        setVendors(sortedVendors);
    }

    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th><a href="javascript:void(0);" onClick={onSortChange('name')}>Name</a></th>
                    <th><a href="javascript:void(0);" onClick={onSortChange('description')}>Description</a></th>
                    <th>Longitude</th>
                    <th>Latitude</th>
                </tr>
            </thead>
            <tbody>
                {vendors.map(vendor =>
                    <tr key={vendor.key}>
                        <td>{vendor.business_name}</td>
                        <td>{vendor.description}</td>
                        <td>{vendor.longitude}</td>
                        <td>{vendor.latitude}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Vendors;