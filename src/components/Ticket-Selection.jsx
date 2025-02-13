import React, {useState} from 'react'

function TicketSelection({formData, setFormData}) {
  const [selectedType, setSelectedType] = useState('');

  const handleTicketTypeSelect = (type) => {
    setSelectedType(type);
    setFormData({ ...formData, tickettype: type });
  };
  return (
    <>
    <div className='ticket-container'>
      <div className='ticket-header'>
    <h1>Techember Fest "25</h1>
    <p>Join us for an unforgettable experience at</p>
    <p>[Event]! Secure your spot now.</p>
    <p>📍 [location] || March 15, 2025 | 7:00PM</p>
    </div>
    <hr />
    <div className='ticket-type'>
      <h1>
        Select Ticket Type 
        </h1>
        <div className='typebtn'>
             <button
             className={` ${selectedType === 'Free' ? 'active' : ''}`}
              onClick={() => handleTicketTypeSelect('Free')}
              onKeyDown={(e) => e.key === 'Enter' && handleTicketTypeSelect('Free')}
              aria-pressed={selectedType === 'Free'}
              tabIndex="0"
              >
            <h2>Free</h2>
            <p>REGULAR ACCESS</p>
            <p>20/52</p>
            </button>
              <button
             className={`${selectedType === 'VIP' ? 'active' : ''}`}
              onClick={() => handleTicketTypeSelect('VIP')}
              onKeyDown={(e) => e.key === 'Enter' && handleTicketTypeSelect('VIP')}
              aria-pressed={selectedType === 'VIP'}
              tabIndex="0"
              >
            <h2>$150</h2>
            <p>VIP ACCESS</p>
            <p>20/52</p>
            </button>
            <button
            className={` ${selectedType === 'VVIP' ? 'active' : ''}`}
              onClick={() => handleTicketTypeSelect('VVIP')}
              onKeyDown={(e) => e.key === 'Enter' && handleTicketTypeSelect('VVIP')}
              aria-pressed={selectedType === 'VVIP'}
              tabIndex="0"
              >
            <h2>$150</h2>
            <p>VVIP ACCESS</p>
            <p>20/52</p>
            </button>
          </div>

      </div>
      <div className='ticket-no'>
        <label  htmlFor="ticket-no-select">
          Number of Tickets
          <select
           id="ticket-no-select" 
          value={formData.ticketno}
        onChange={(e) => setFormData({...formData, ticketno: e.target.value})}
        aria-label="Select the number of tickets"
        >
            <option value='1'> 1</option>
            <option value='2'> 2</option>
            <option value='3'> 3</option>
            <option value='4'> 4</option>
            <option value='5'> 5</option>
            </select>
          </label>
      </div>


    </div>
    </>
  )
}

export default TicketSelection