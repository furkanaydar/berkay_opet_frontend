import React, { Component } from 'react'
import { FaNetworkWired } from 'react-icons/fa'
import { MdDirectionsCar } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import Router from 'next/router'
import SideMenu from '../components/sideMenu'
import Table from 'react-bootstrap/Table'
class ReportsPage extends Component {
    constructor() {
        super();
        this.state = {
            reports: []
        }
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
        fetch("https://cors-anywhere.herokuapp.com/" + "https://berkay-project-backend.herokuapp.com/corporates/" + corporateId +"/requests", settings)
        .then(response => response.json())
        .then(data => this.setState({reports: data}));
    }

    render() {
        return (
            <div>
                <div style={{ display: 'flex', fontFamily: 'Rubik, sans-serif' }}>
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
                            <h1 style={{ borderBottom: '1px solid grey' }}>Raporlar</h1>
                            <p style={{fontSize:13 , padding: 8}}>
                                Mobil uygulamaya giriş yapan çalışanlar, plaka numaralarıyla beraber
                                konum bilgilerini sisteme gönderir. Eğer ilgili araç çalışana tanımlanmışsa
                                ve gönderilen konum anlaşmalı istasyonlarla eşleşiyorsa, istek onaylanır ve
                                QR kod üretilir. Bu QR kod daha sonra istasyon tarafından görünebilir hale
                                gelecektir.
                            </p>
                        </div>
                        <Table style={{ marginTop: 32, textAlign: 'center' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Araç Plakası</th>
                                    <th>Çalışan İsmi</th>
                                    <th>İlişkili İstasyon</th>
                                    <th>İstek Konumu</th>
                                    <th>İstek Sonucu</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.reports.map((report) =>
                                        <tr>
                                            <td>{report.requestId}</td>
                                            <td>{report.automobile ? report.automobile.automobileLicensePlate : 'Tanımlanmamış'}</td>
                                            <td>{report.worker ? report.worker.workerFirstName + ' ' + report.worker.workerLastName : 'Tanımlanmamış'}</td>
                                            <td>{report.vendor ? report.vendor.vendorName : 'Tanımlanmamış'}</td>
                                            <td>
                                                {
                                                    report.vendorLat + ', ' + report.vendorLong
                                                }

                                            </td>
                                            {report.result == true ?
                                                <td style={{color: 'green'}}>
                                                    Onaylandı
                                                </td> :
                                                <td style={{color: 'red'}}>
                                                    Başarısız
                                                </td>

                                            }

                                        </tr>
                                    )
                                }




                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReportsPage