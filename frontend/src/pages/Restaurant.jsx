import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Restaurant() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        time: '',
        people: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/restaurants/${id}/reservations`, formData)
            .then(() => alert('Reservation successful!'))
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Make a Reservation</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
                <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Number of People"
                    value={formData.people}
                    onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                />
                <button type="submit">Reserve</button>
            </form>
        </div>
    );
}

export default Restaurant;
