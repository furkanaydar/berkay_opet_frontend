import React, { Component } from 'react'
import { FaNetworkWired, FaPlusSquare, FaMinusSquare, } from 'react-icons/fa'
import { MdDirectionsCar } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import Router from 'next/router'
import SideMenu from '../components/sideMenu'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
class VendorsPage extends Component {
    constructor() {
        super();
        this.state = {
            addVendorDisplay: false,
            vendorName: '',
            vendors: [],
            vendorAddress: ''
        }
        this.handleAddVendorDisplay = this.handleAddVendorDisplay.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }
    handleAddVendorDisplay() {
        let currentDisplay = this.state.addVendorDisplay
        this.setState({
            addVendorDisplay: !currentDisplay
        })
    }

    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    formSubmit() {
        let corporateId = localStorage.getItem("CorporateId");
        let bearer = localStorage.getItem('Authorization')
        
        const data = {
            vendorName: this.state.vendorName,
            vendorAddress: this.state.vendorAddress,
        }
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : bearer

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        };

        let oldVendors = this.state.vendors


        fetch("https://cors-anywhere.herokuapp.com/" + 'https://berkay-project-backend.herokuapp.com/corporates/' + corporateId + '/vendors', settings)
        .then(response => response.json())
        .then(data => 
            this.setState({
                vendors: [...oldVendors, data],
                vendorName: '',
                vendorAddress: ''
            })
        );
    }
    componentDidMount() {
        let corporateId = localStorage.getItem("CorporateId");
        let bearer = localStorage.getItem('Authorization')
        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : bearer
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
    
        };
        fetch("https://berkay-project-backend.herokuapp.com/corporates/" + corporateId + "/vendors", settings)
        .then(response => response.json())
        .then(data => this.setState({vendors: data}));
    }
    render() {
        return (
            <div>
                <div style={{ display: 'flex', fontFamily: 'Rubik, sans-serif' }}>
                    <style jsx>{`
                        .addWorkerButton {
                            cursor: pointer;
                        }
                        .addWorkerButton:hover {
                            text-decoration: underline;
                        }
                    `}</style>
                    <link href="https://fonts.googleapis.com/css?family=Rubik&display=swap" rel="stylesheet" />
                    <link
                        rel="stylesheet"
                        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                        crossorigin="anonymous"
                    />
                    <SideMenu></SideMenu>
                    <div style={{ padding: 48, flexGrow: 5, }}>
                        <div>
                            <h1 style={{ borderBottom: '1px solid grey' }}>İstasyonlar</h1>
                        </div>
                        <Table style={{ marginTop: 32, textAlign: 'center' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>İstasyon İsmi</th>
                                    <th>İstasyon Adresi </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.vendors.map((vendor) =>
                                        <tr>
                                            <td>{vendor.vendorOfCorporateId}</td>
                                            <td>{vendor.vendor.vendorName}</td>
                                            <td>{vendor.vendor.vendorAddress}</td>
                                        </tr>
                                    )
                                }


                            </tbody>
                        </Table>
                        <div className='addWorkerButton'
                            onClick={this.handleAddVendorDisplay} style={{ padding: 6, marginTop: 32, }}>
                            <a>
                                {
                                    !this.state.addVendorDisplay ?
                                        <FaPlusSquare style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 12, }}></FaPlusSquare>
                                        :
                                        <FaMinusSquare style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 12, }}></FaMinusSquare>
                                }
                                Yeni İstasyon Tanımla
                            </a>
                        </div>
                        {
                            this.state.addVendorDisplay ?
                                <div style={{ marginTop: 20, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <Form style={{ marginTop: 32, }}>
                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>İstasyon İsmi</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="vendorName"
                                                value={this.state.vendorName}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>
                                        <Form.Group controlId="formLastName">
                                            <Form.Label>İstasyon Adresi</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="vendorAddress"
                                                value={this.state.vendorAddress}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>


                                        <Button variant="primary" onClick={this.formSubmit}>
                                            Kaydet
                                </Button>
                                    </Form>
                                </div>
                                :
                                null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
/*

VendorsPage.getInitialProps = async ({ req, query }) => {
    let corporateId = 1
    let bearer = ''
    if (typeof window !== 'undefined') {
        corporateId = localStorage.getItem("CorporateId");
        bearer = localStorage.getItem('Authorization')
    }
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : bearer
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

    };
    let vendors = await fetch("https://berkay-project-backend.herokuapp.com//corporates/" + corporateId + "/vendors", settings)
    const json_vendors = await vendors.json();


    // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin


    return {
        vendors: json_vendors
    };
};  */

export default VendorsPage
