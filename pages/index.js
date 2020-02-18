import React,{Component} from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import  Router  from 'next/router';

class Home extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    localStorage.getItem('Authorization') != null ?
      Router.push('/reports')
      :
      Router.push('/corporateLogin')
  }
  render() {
    return(
      <div>
        
      </div>
    )
  }
}
export default Home
