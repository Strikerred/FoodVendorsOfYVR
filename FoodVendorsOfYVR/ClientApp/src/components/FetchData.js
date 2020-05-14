import React, { Component } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import Pagination from './Pagination';
import Search from './Search';

function Map(props) {

    return (
        <GoogleMap
            defaultZoom={14}
            defaultCenter={ { lat:49.2820, lng:-123.1171 } }
        >
            {props.foodVendors.map((vendor) => (
                <Marker
                    key={vendor.key}
                    title={vendor.business_name}
                    position={{ lat: vendor.latitude, lng: vendor.longitude }}
                    onClick={() => { props.onMarkerClick(vendor) }}
                />
            ))}
            {props.selectedVendor && (
                    <InfoWindow
                        position={{
                            lat: props.selectedVendor.latitude + 0.00001,
                            lng: props.selectedVendor.longitude
                        }}
                        onCloseClick={props.onMarkerCloseClick}
                    >
                    <div>
                        <h5>{props.selectedVendor.business_name
                            ?
                            props.selectedVendor.business_name
                            : props.selectedVendor.description}</h5>
                        <p>{props.selectedVendor.location}</p>
                    </div>
                    </InfoWindow>
                )
            }
        </GoogleMap>
    );
}

const WrappedMap = withScriptjs(withGoogleMap(props => (Map(props))));

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = {
            foodVendors: [],
            loading: true,
            vendorsMarkers: [],
            selectedVendor: null,
        };
        this.onSortChange = this.onSortChange.bind(this);
        this.Paginate = this.Paginate.bind(this); 
        this.getSearch = this.getSearch.bind(this);
        this.getRefresh = this.getRefresh.bind(this);
    }

    componentDidMount() {
        this.populateFoodVendorsData();
    }

    handleMarkerClick(vendor) {
        this.setState({ selectedVendor: vendor })
    }

    handleMarkerClosed() {
        this.setState({ selectedVendor: null })
    }

    onSortChange(sortParam) {
        let sortedVendors;

        if (sortParam === 'name') {
            if (this.state.nameSort === 'asc') {
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

        this.setState({ foodVendors: sortedVendors });
    }

    Paginate(currentPagecomingfrompagination) {
        this.setState({ currentPagevariableonfetchdata: currentPagecomingfrompagination });
    }

    getSearch(searchValue) {
        this.setState({ search: searchValue });
        this.populateFoodVendorsData();                        
    }

    getRefresh() {
        this.setState({ search: "" });
        this.populateFoodVendorsData();
    }

    getSearched() {
 
        const filteredFoodVendors = this.state.foodVendors.filter(foodVendor => {

            if (foodVendor.business_name !== null && typeof (foodVendor.business_name) !== "undefined")
                return foodVendor.business_name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || foodVendor.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
            else
                return foodVendor.description.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });
        return filteredFoodVendors;
    }

    renderFoodVendorsTable(foodVendors) {

        let currentVendors;        

        if ((typeof (this.state.search) !== "undefined") && this.state.search !== "") {
            foodVendors = this.getSearched()           
        }

        const indexOfLastVendor = this.state.currentPage * this.state.vendorsPerPage;

        const indexOfFirstVendor = indexOfLastVendor - this.state.vendorsPerPage;
        
        currentVendors = foodVendors.slice(indexOfFirstVendor, indexOfLastVendor);

        return (
            <div>
                <button className="btn btn-success my-2 my-sm-0" type="button" onClick={() => { this.getRefresh() }} >Refresh</button>
                <br />
                <br />
                <Search getValue={this.getSearch} />
                <br />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th><a href="javascript:void(0);" onClick={() => this.onSortChange('name')}>Name</a></th>
                            <th><a href="javascript:void(0);" onClick={() => this.onSortChange('description')}>Description</a></th>
                            <th>Longitude</th>
                            <th>Latitude</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentVendors.map(vendor =>
                            <tr key={vendor.key}>
                                <td>{vendor.business_name}</td>
                                <td>{vendor.description}</td>
                                <td>{vendor.longitude}</td>
                                <td>{vendor.latitude}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Pagination paginate={this.Paginate} currentPage={this.state.currentPage} totalVendors={foodVendors.length} vendorsPerPage={this.state.vendorsPerPage} />
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderFoodVendorsTable(this.state.foodVendors);

        return (
            <div>
            <h1 id="tabelLabel" >Food Vendors</h1>
                {/*Insert Map Here*/}
                <WrappedMap                    
                    foodVendors={this.state.vendorsMarkers}
                    googleMapURL="https://maps.googleapis.com/maps/api/js"
                    loadingElement={<div style={{ height: '100%' }} />}
                    containerElement={<div style={{ height: '400px' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                    onMarkerClick={this.handleMarkerClick.bind(this)}
                    onMarkerCloseClick={this.handleMarkerClosed.bind(this)}
                    selectedVendor={this.state.selectedVendor}
                />
                <br />
                {contents}
            </div>
        );
    }

    async populateFoodVendorsData() {        
        const response = await fetch('api/FoodVendor/FoodVendors');
        const data = await response.json();

        this.setState({
            foodVendors: data,
            loading: false,
            nameSort: 'asc',
            descriptionSort: 'asc',
            currentPage: 1,
            vendorsPerPage: 5,
            selectedVendor: null,
            vendorsMarkers: !this.state.search ? this.state.foodVendors : this.getSearched(this.state.foodVendors)
        });
    }
}

