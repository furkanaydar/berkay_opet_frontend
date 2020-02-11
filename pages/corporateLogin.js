import React, { Component } from 'react'
import { FaNetworkWired } from 'react-icons/fa'
import { MdDirectionsCar } from 'react-icons/md'
import { GoReport } from 'react-icons/go'
import Router from 'next/router'
import SideMenu from '../components/sideMenu'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
class CorporateLogin extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
        }
        this.handleFormChange = this.handleFormChange.bind(this);
        this.formSubmit = this.formSubmit.bind(this)
    }
    handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async formSubmit() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        const settings = {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        };
        const res = await fetch('https://cors-anywhere.herokuapp.com/'+'https://berkay-project-backend.herokuapp.com/auth/corporateLogin', settings);
        const res_json = await res.json();
        localStorage.setItem("Authorization", res_json.Authorization)
        localStorage.setItem("Corporate", res_json.Corporate)
        localStorage.setItem("CorporateId", res_json.Corporate.corporateId)
        Router.push('/workers')
    }

    componentDidMount() {

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
                    <div style={{ padding: 48, flexGrow: 4, }}>
                        <div>
                            <h1 style={{ borderBottom: '1px solid grey' }}>Şirket Girişi</h1>
                            <Form style={{ marginTop: 32, }}>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Kullanıcı Adı</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleFormChange}
                                        placeholder="Kullanıcı adı..." />
                                    <Form.Text className="text-muted">
                                        Şirket sorumlusunun kullanıcı adını giriniz.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Şifre</Form.Label>
                                    <Form.Control
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleFormChange}
                                        type="password" placeholder="Şirket sorumlusu şifre..." />
                                </Form.Group>

                                <Button variant="primary" onClick={this.formSubmit}>
                                    Giriş Yap
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CorporateLogin