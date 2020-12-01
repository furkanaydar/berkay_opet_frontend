import React, { Component } from 'react'
import { FaNetworkWired } from 'react-icons/fa'
import { MdDirectionsCar } from 'react-icons/md'
import { GoReport, GoSignIn, GoSignOut } from 'react-icons/go'
import { GiFuelTank } from 'react-icons/gi'
import { SiShell } from 'react-icons/si'
import Router from 'next/router'
class SideMenu extends Component {
    constructor() {
        super();
        this.state = {
            isLogged: false
        }
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout() {
        localStorage.clear();
        Router.push('/')
    }
    componentDidMount() {
        this.setState({
            isLogged: localStorage.getItem('Authorization') != null
        })
    }
    render() {
        return (

            <div style={{ width: '24%', marginRight: 12, padding: 22, }}>
                <h1 style={{ borderBottom: '1px solid grey' }}>
                                                        <SiShell style={{ verticalAlign: 'middle', marginRight: 24, }}></SiShell> Yönetim Paneli
                </h1>
                <div style={{ marginTop: 32, }}>
                    {
                        this.state.isLogged ?

                            < div >
                                <div onClick={() => Router.push('/workers')} style={{ backgroundColor:'#FFD500', borderBottom: '8px solid #ED1C24', marginTop: 32, padding: 12, fontSize: 22, cursor: 'pointer' }}>
                                    <FaNetworkWired style={{ verticalAlign: 'middle', marginRight: 24, }}></FaNetworkWired>
                                    <a>Çalışanlar</a>
                                </div>
                                <div onClick={() => Router.push('/automobiles')} style={{ backgroundColor:'#FFD500', borderBottom: '8px solid #ED1C24', marginTop: 32, padding: 12, fontSize: 22, cursor: 'pointer' }}>
                                    <MdDirectionsCar style={{ verticalAlign: 'middle', marginRight: 24, }}></MdDirectionsCar>
                                    <a>Araçlar</a>
                                </div>
                                <div onClick={() => Router.push('/vendors')} style={{ backgroundColor:'#FFD500', borderBottom: '8px solid #ED1C24', marginTop: 32, padding: 12, fontSize: 22, cursor: 'pointer' }}>
                                    <GiFuelTank style={{ verticalAlign: 'middle', marginRight: 24, }}></GiFuelTank>
                                    <a>İstasyonlar</a>
                                </div>
                                <div onClick={() => Router.push('/reports')} style={{ backgroundColor:'#FFD500', borderBottom: '8px solid #ED1C24', marginTop: 32, padding: 12, fontSize: 22, cursor: 'pointer' }}>
                                    <GoReport style={{ verticalAlign: 'middle', marginRight: 24, }}></GoReport>
                                    <a>Raporlar</a>
                                </div>
                            </div> :
                            null
                    }
                    {
                        !this.state.isLogged ?
                            <div onClick={() => Router.push('/corporateLogin')} style={{ backgroundColor:'#FFD500', borderBottom: '8px solid #ED1C24', marginTop: 32, padding: 12, fontSize: 22, cursor: 'pointer' }}>
                                <GoSignIn style={{ verticalAlign: 'middle', marginRight: 24, }}></GoSignIn>
                                <a>Şirket Girişi Yap</a>
                            </div>
                            : null
                    }
                    {
                        this.state.isLogged ?

                            <div onClick={this.handleLogout} style={{ backgroundColor:'#FFD500', borderBottom: '8px solid #ED1C24', marginTop: 32, padding: 12, fontSize: 22, cursor: 'pointer' }}>
                                <GoSignOut style={{ verticalAlign: 'middle', marginRight: 24, }}></GoSignOut>
                                <a>Çıkış Yap</a>
                            </div>
                            :
                            null
                    }
                </div>
            </div >

        )
    }
}

export default SideMenu
