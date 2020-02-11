import React, { Component } from 'react'

class SpecialTable extends Component() {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <Table style={{ marginTop: 32, textAlign: 'center' }} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>İsim</th>
                        <th>Soyisim</th>
                        <th>Telefon</th>
                        <th>Tanımlı Araçlar</th>
                        <th>İşlemler</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.workers.map((worker) =>
                            <tr>
                                <td>{worker.workerId}</td>
                                <td>{worker.workerFirstName}</td>
                                <td>{worker.workerLastName}</td>
                                <td>{worker.phoneNumber}</td>
                                <td
                                    onClick={() =>
                                        this.setState({
                                            currentWorker: worker,
                                            showAddCarModal: true
                                        })}
                                    style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                    {worker.numberOfAssignedCars}
                                </td>
                                <td style={{ fontSize: 20 }}>
                                    <a style={{ cursor: 'pointer' }} onClick={() => this.props.handleDeleteWorker(worker.workerId)}>
                                        <AiOutlineDelete style={{ marginRight: 12 }}></AiOutlineDelete>
                                    </a>
                                    <a style={{ cursor: 'pointer' }} onClick={this.props.handleModalCurrent}>
                                        <MdDirectionsCar></MdDirectionsCar>
                                    </a>

                                </td>

                            </tr>
                        )
                    }

                </tbody>
            </Table>
        )
    }
}

export default SpecialTable