import React, { Component } from 'react';
import axios from 'axios';

class PersonList extends Component {
    state = {
        persons: [],
        loading: true,
        error: null
    }

    componentDidMount() {
        axios.get('https://randomuser.me/api/?results=10')
            .then(res => {
                this.setState({ persons: res.data.results, loading: false });
            })
            .catch(error => {
                this.setState({ error: error.message, loading: false });
            });
    }

    renderPerson(person) {
        return (
            <div key={person.login.uuid}>
                <h3>{person.name.first} {person.name.last}</h3>
                <p>Email: {person.email}</p>
                <img src={person.picture.medium} alt={`${person.name.first} ${person.name.last}`} />
            </div>
        );
    }

    render() {
        const { persons, loading, error } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        return (
            <div>
                {persons.map(person => this.renderPerson(person))}
            </div>
        );
    }
}

export default PersonList;

