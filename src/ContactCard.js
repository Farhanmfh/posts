import React, { Component } from 'react'

class ContactCard extends Component {
    constructor() {
        super()
        this.state = {

            data: {
                "id": 9,
                "name": "Glenna Reichert",
                "username": "Delphine",
                "email": "Chaim_McDermott@dana.io",
                "address": {
                    "street": "Dayna Park",
                    "suite": "Suite 449",
                    "city": "Bartholomebury",
                    "zipcode": "76495-3109",
                    "geo": {
                        "lat": "24.6463",
                        "lng": "-168.8889"
                    }
                },
                "phone": "(775)976-6794 x41206",
                "website": "conrad.com",
                "company": {
                    "name": "Yost and Sons",
                    "catchPhrase": "Switchable contextually-based project",
                    "bs": "aggregate real-time technologies"
                }
            }
        }
    }
    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}/`)
            .then(res => res.json())
            .then(json => this.setState(
                {
                    data: json
                }
            ))

    }
    render() {
        const data = this.state.data
      
        
        // const allInof = this.state.data.map(item => {} )
        return (
            <div style={{textAlign: "center"}} >
                <h1 style={{color:'#0a8cda'}}>Person Name: {data.name}</h1>
                <hr />
                <h3>Conpany Name : {data.company.name}</h3>
                <h3>User Name: {data.username} </h3>
                <h3>WebSite: {data.website}</h3>
                <h3>Email: {data.email} </h3>
                <h3>Phone Number: {data.phone} </h3>
                <h3>City : {data.address.city}</h3>
                

                {/* {
  "id": 9,
  "name": "Glenna Reichert",
  "username": "Delphine",
  "email": "Chaim_McDermott@dana.io",
  "address": {
    "street": "Dayna Park",
    "suite": "Suite 449",
    "city": "Bartholomebury",
    "zipcode": "76495-3109",
    "geo": {
      "lat": "24.6463",
      "lng": "-168.8889"
    }
  },
  "phone": "(775)976-6794 x41206",
  "website": "conrad.com",
  "company": {
    "name": "Yost and Sons",
    "catchPhrase": "Switchable contextually-based project",
    "bs": "aggregate real-time technologies"
  }
}*/}

            </div>
        )
    }
}

export default ContactCard