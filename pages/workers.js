import React, { Component } from 'react'
import { FaNetworkWired, FaPlusSquare, FaMinusSquare, FaTrash } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdDirectionsCar } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import Router from 'next/router'
import SideMenu from '../components/sideMenu'
import Table from 'react-bootstrap/Table'
import fetch from 'isomorphic-unfetch'
import SpecialTable from '../components/specialTable'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import AddCarToWorkerModal from '../components/addCarToWorkerModal'
class WorkersPage extends Component {
    constructor() {
        super();
        this.state = {
            addUserDisplay: false,
            firstName: "",
            lastName: "",
            password: "",
            phoneNumber: "",
            username: '',
            email: '',
            showAddCarModal: false,
            currentWorker: null,
            workers: [],
        }
        this.handleAddUserDisplay = this.handleAddUserDisplay.bind(this)
        this.handleFormChange = this.handleFormChange.bind(this)
        this.formSubmit = this.formSubmit.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleAssignment = this.handleAssignment.bind(this)
        this.handleModalCurrent = this.handleModalCurrent.bind(this)
        this.handleDeleteWorker = this.handleDeleteWorker.bind(this)
    }

    handleAddUserDisplay() {
        let currentDisplay = this.state.addUserDisplay
        this.setState({
            addUserDisplay: !currentDisplay
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

    handleCloseModal() {
        this.setState({
            showAddCarModal: false
        })
    }

    handleDeleteWorker(workerId) {
        let bearer = localStorage.getItem('Authorization')
        const settings = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': bearer
            },
        };

        let currentWorkers = this.state.workers


        fetch("https://cors-anywhere.herokuapp.com/" + 
        "https://berkay-project-backend.herokuapp.com/workers/" + workerId, settings)
        .then(response => response.json())
        .then(data =>
            this.setState({
                workers : currentWorkers.filter(worker => worker.workerId != data.workerId)
            }))
    }
    handleModalCurrent(worker) {
        this.setState({
            currentWorker: worker,
            showAddCarModal: true
        })
    }
    handleAssignment(vehicleId, workerId) {
        let corporateId = localStorage.getItem("CorporateId");
        let bearer = localStorage.getItem('Authorization')
        const data = {
            workerId: workerId
        }
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        };
        fetch("https://cors-anywhere.herokuapp.com/" + 'https://berkay-project-backend.herokuapp.com/corporates/' + corporateId + '/automobiles/' + parseInt(vehicleId) + '/assignedWorkers', settings);
        window.location.reload();
    }

    formSubmit(event) {
        event.preventDefault();
        let corporateId = localStorage.getItem("CorporateId");
        let bearer = localStorage.getItem('Authorization')
        const data = {
            workerFirstName: this.state.firstName,
            workerLastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            userRole: 'worker'
        }
        const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer

                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        };

        let oldWorkers = this.state.workers

        fetch("https://cors-anywhere.herokuapp.com/" + 'https://berkay-project-backend.herokuapp.com/corporates/' + corporateId + '/workers', settings)
            .then(response => response.json())
            .then(data => 
                this.setState({
                    workers: [...oldWorkers, data]
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
                'Authorization': bearer
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

        };
        fetch("https://cors-anywhere.herokuapp.com/" + "https://berkay-project-backend.herokuapp.com/corporates/" + corporateId + "/workers", settings)
            .then(response => response.json())
            .then(data => this.setState({ workers: data }));

        fetch("https://cors-anywhere.herokuapp.com/" + "https://berkay-project-backend.herokuapp.com/corporates/" + corporateId + "/automobiles", settings)
            .then(response => response.json())
            .then(data => this.setState({ automobiles: data }));





    }
    render() {


        return (
            <div>
                <div style={{ display: 'flex', fontFamily: 'Rubik, sans-serif' }}>
                    {
                        this.state.currentWorker ?
                            <AddCarToWorkerModal
                                handleAssignment={this.handleAssignment}
                                handleCloseModal={this.handleCloseModal}
                                automobiles={this.state.automobiles}
                                workerId={this.state.currentWorker.workerId}
                                showAddCarModal={this.state.showAddCarModal}
                                currentWorker={this.state.currentWorker}>
                            </AddCarToWorkerModal> : null
                    }

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
                            <h1 style={{ borderBottom: '1px solid grey' }}>Çalışanlar</h1>
                        </div>
                        <SpecialTable
                            handleDeleteWorker={this.handleDeleteWorker}
                            handleModalCurrent={this.handleModalCurrent}
                            workers={this.state.workers}>
                        </SpecialTable>
                        <div className='addWorkerButton'
                            onClick={this.handleAddUserDisplay} style={{ padding: 6, marginTop: 32, }}>
                            <a>
                                {
                                    !this.state.addUserDisplay ?
                                        <FaPlusSquare style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 12, }}></FaPlusSquare>
                                        :
                                        <FaMinusSquare style={{ fontSize: 22, verticalAlign: 'middle', marginRight: 12, }}></FaMinusSquare>
                                }
                                Yeni Çalışan Tanımla
                            </a>
                        </div>
                        {
                            this.state.addUserDisplay ?
                                <div style={{ marginTop: 20, borderTop: '1px solid rgba(0, 0, 0, 0.1)' }}>
                                    <Form style={{ marginTop: 32, }} onSubmit={this.formSubmit}>
                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>Çalışan İsmi</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={this.state.firstName}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>
                                        <Form.Group controlId="formLastName">
                                            <Form.Label>Çalışan Soyismi</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={this.state.lastName}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>
                                        <Form.Group controlId="formPassword">
                                            <Form.Label>Çalışan Şifresi</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="password"
                                                value={this.state.password}
                                                onChange={this.handleFormChange} />
                                        </Form.Group>
                                        <Form.Group controlId="formPhoneNumber">
                                            <Form.Label>Çalışan Telefon Numarası</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="phoneNumber"
                                                value={this.state.phoneNumber}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>

                                        <Form.Group controlId="formUsername">
                                            <Form.Label>Çalışan Kullanıcı Adı</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.handleFormChange} />

                                        </Form.Group>

                                        <Form.Group controlId="formMail">
                                            <Form.Label>Çalışan Mail Adresi</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="email"
                                                value={this.state.email}
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
/*
WorkersPage.getInitialProps = async ({ req, query }) => {
    let corporateId = 1
    let bearer = ''
    if (typeof window !== 'undefined') {
        corporateId = localStorage.getItem("CorporateId");
        bearer = localStorage.getItem('Authorization')
    }
    console.log('CorporateId=' + corporateId + ' bearer=' + bearer)
    const settings = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },

    };
    let workers = await fetch("https://berkay-project-backend.herokuapp.com//corporates/" + corporateId + "/workers", settings)
    const json_workers = await workers.json();
    let automobiles = await fetch("https://berkay-project-backend.herokuapp.com//corporates/" + corporateId + "/automobiles", settings)
    const json_automobiles = await automobiles.json();
    console.log('wroker,:' + json_workers.length)
    // TODO: aşağıdaki satırda bulunan adresi kendi sunucu adresinle değiştirmelisin


    return {
        workers: json_workers,
        automobiles: json_automobiles,
        corporateId: corporateId
    };
}; */

export default WorkersPage