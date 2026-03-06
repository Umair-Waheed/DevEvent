"use client"
import {useState} from 'react'
const BookEvents = () => {
    const[email,setEmail] = useState('');
    const[submitted,setSubmitted] = useState(false);

    const handleSubmit=(e:React.FormEvent)=>{
        e.preventDefault();
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    }
  return (
    <div id="book-event">
        {submitted?(
            <p>Thank you for signing up! We look forward to seeing you at the event.</p>
        ):(
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Email Adress</label>
                    <input type="email"
                    id='email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Enter your email address'
                    />
                </div>

                <button type="submit"  className="button-submit">Submit</button>
            </form>
            )}
    </div>
  )
}

export default BookEvents