import { useEffect, useState } from "react";

function Test() {

const [date, setDate] = useState('');
const [data, setData] = useState('');

const handleChange = e => {
    setDate(e.target.value)
}

useEffect(() => {
    console.log(date);
    const requestOptions = {
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(`http://localhost:5000/getOneDay?date=${date}`, requestOptions)
    .then(res => res.json())
    .then(res => setData(res))
    
    .catch((error) => {
        console.error(console.error(error)
    )})
    console.log(data);
},[date]);

    return (
        <div>
            <form>
            {/* <form> */}
                <label>
                    Date:
                <input type="date" value={date} onChange={handleChange}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p>{date}</p>
        </div>
    )
}

export default Test;