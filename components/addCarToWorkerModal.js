
import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class AddCarToWorkerModal extends Component {
    constructor() {
        super();
        this.state = {
            carSelection: null,
            currentlyAssignedVehicles: []
        }
        this.handleFormChange = this.handleFormChange.bind(this)
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    componentDidMount() {
        let automobile = this.props.automobiles[0]
        this.setState({
            carSelection: automobile.automobileId + ', ' + automobile.automobileLicensePlate + ', ' +
                automobile.automobileBrand + ', ' +
                automobile.automobileModel + ', ' + automobile.automobileYear
        })
    }
    render() {
        return (
            <Modal show={this.props.showAddCarModal} onHide={this.props.handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Araç Ataması</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{ marginBottom: 12 }}>

                        <a style={{ textDecoration: 'underline' }}>
                            {
                                this.props.currentWorker.workerFirstName + ' ' +
                                this.props.currentWorker.workerLastName
                            }
                        </a>
                        {' isimli çalışanınıza araç ataması yapın.'}

                        <div style={{ marginTop: 20 }}>
                            Çalışanın Güncel Araç Listesi
                            <hr></hr>
                            {
                                this.props.currentlyAssignedVehicles != null ?
                                    (
                                        this.props.currentlyAssignedVehicles.length == 0 ?
                                            'Araç bulunamadı' :
                                            this.props.currentlyAssignedVehicles.map((automobile) =>
                                                <li>

                                                    {
                                                        automobile.automobile.automobileId + ', ' +
                                                        automobile.automobile.automobileLicensePlate + ', ' +
                                                        automobile.automobile.automobileBrand + ', ' +
                                                        automobile.automobile.automobileModel + ', ' +
                                                        automobile.automobile.automobileYear
                                                    }
                                                </li>
                                            )
                                    )
                                    :
                                    null
                            }
                        </div>
                    </div>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Eklenecek Aracı Seçin:</Form.Label>
                            <Form.Control
                                name="carSelection"
                                value={this.state.carSelection}
                                onChange={this.handleFormChange}
                                as="select">
                                {
                                    this.props.automobiles.map((automobile) =>
                                        <option>
                                            {
                                                automobile.automobileId + ', ' + automobile.automobileLicensePlate + ', ' +
                                                automobile.automobileBrand + ', ' +
                                                automobile.automobileModel + ', ' + automobile.automobileYear
                                            }
                                        </option>
                                    )
                                }
                            </Form.Control>
                        </Form.Group>
                    </Form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() =>
                        this.props.handleAssignment(this.state.carSelection.split(',')[0], this.props.currentWorker.workerId)}>
                        Atamayı Kaydet
                </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default AddCarToWorkerModal