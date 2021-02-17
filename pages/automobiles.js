import React, { Component } from 'react'
import { FaRegUserCircle, FaTrash, FaNetworkWired, FaPlusSquare, FaMinusSquare } from 'react-icons/fa'
import { AiOutlineUserAdd, AiOutlineDelete } from 'react-icons/ai'
import { MdDirectionsCar } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import Router from 'next/router'
import SideMenu from '../components/sideMenu'
import Table from 'react-bootstrap/Table'
import fetch from 'isomorphic-unfetch'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
class AutomobilesPage extends Component {
    constructor() {
        super();
        this.state = {
            addVehicleDisplay: false,
            year: "",
            model: "",
            brand: "",
            plateNumber: "",
            vehicles: []
        }
        this.handleAddVehicleDisplay = this.handleAddVehicleDisplay.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this);
        this.handleDeleteVehicle = this.handleDeleteVehicle.bind(this)
    }
    handleAddVehicleDisplay() {
        let currentDisplay = this.state.addVehicleDisplay
        this.setState({
            addVehicleDisplay: !currentDisplay
        })
    }

    handleDeleteVehicle(vehicleId) {
        let bearer = localStorage.getItem('Authorization')
        let corporateId = localStorage.getItem('CorporateId')
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': bearer
            },
        };

        let currentVehicles = this.state.vehicles
        fetch("https://berkay-project-backend.herokuapp.com/corporates/" + 
        corporateId + "/automobiles/" + vehicleId, settings)
        .then(response => response.json())
        .then(data =>
            this.setState({
                vehicles: currentVehicles.filter(vehicle => vehicle.automobileId != data.automobileId)
            }))
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    formSubmit(event) {
        event.preventDefault();
        let corporateId = localStorage.getItem("CorporateId");
        let bearer = localStorage.getItem('Authorization')
        const data = {
            automobileLicensePlate: this.state.plateNumber,
            automobileBrand: this.state.brand,
            automobileYear: this.state.year,
            automobileModel: this.state.model
        }
        console.log(corporateId + ' ' + bearer)
        const get_settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        };
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        };

        let oldVehicles = this.state.vehicles

        fetch('https://berkay-project-backend.herokuapp.com/corporates/' + corporateId + '/automobiles', settings)
            .then(response => response.json())
            .then(data => 
                this.setState({
                    vehicles: [...oldVehicles, data],
                    year: "",
                    model: "",
                    brand: "",
                    plateNumber: "",
                })
            )

    }

    componentDidMount() {
        let corporateId = localStorage.getItem("CorporateId");
        let bearer = localStorage.getItem('Authorization')
        const settings = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        };
        fetch("https://berkay-project-backend.herokuapp.com/corporates/" + corporateId + "/automobiles", settings)
            .then(response => response.json())
            .then(data => this.setState({ vehicles: data }));
    }
    render() {
        return (
            <div>
                <div>
                    {this.state.vendorName}, {this.state.vendorAddress}
                </div>
                <div style={{ display: 'flex', fontFamily: 'Rubik, sans-serif' }}>
                    <style jsx>{`
                        .addVehicleButton {
                            cursor: pointer;
                        }
                        .addVehicleButton:hover {
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
                            <h1 style={{ borderBottom: '1px solid grey' }}>Araçlar</h1>
                        </div>
                        <Table style={{ marginTop: 32, textAlign: 'center' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Plaka</th>
                                    <th>Marka - Model</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.vehicles.map((vehicle) =>
                                        <tr>
                                            <td>{vehicle.automobileId}</td>
                                            <td>{vehicle.automobileLicensePlate}</td>
                                            <td>{vehicle.automobileBrand + ', ' + vehicle.automobileModel + ', ' + vehicle.automobileYear}</td>
                                            <td style={{ fontSize: 20 }}>
                                                <AiOutlineDelete 
                                                onClick={() => this.handleDeleteVehicle(vehicle.automobileId)}
                                                style={{cursor:'pointer', marginRight: 12 }}></AiOutlineDelete>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </Table>
                        <div className='addVehicleButton'
                            onClick={this.handleAddVehicleDisplay} style={{ padding: 6, marginTop: 32, }}>
                            <a>
                                {
                                    !this.state.addVehicleDisplay ?
                                        <FaPlusSquare style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 12, }}></FaPlusSquare>
                                        :
                                        <FaMinusSquare style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 12, }}></FaMinusSquare>
                                }
                                Yeni Araç Tanımla
                            </a>
                        </div>
                        {
                            this.state.addVehicleDisplay ?
                                <div style={{ marginTop: 20, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <Form style={{ marginTop: 32, }} onSubmit={this.formSubmit}>
                                        <Form.Group controlId="formPlateNumber">
                                            <Form.Label>Araç Plakası</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="plateNumber"
                                                value={this.state.plateNumber}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>
                                        <Form.Group controlId="formBrand">
                                            <Form.Label>Araç Markası</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="brand"
                                                value={this.state.brand}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>
                                        <Form.Group controlId="formPhoneNumber">
                                            <Form.Label>Araç Modeli</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="model"
                                                value={this.state.model}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>
                                        <Form.Group controlId="formYear">
                                            <Form.Label>Araç Model Yılı</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="year"
                                                value={this.state.year}
                                                onChange={this.handleFormChange} />
                                        </Form.Group>


                                        <Button variant="primary" type='submit'>
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

export default AutomobilesPage
