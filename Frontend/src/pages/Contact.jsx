import {useNavigate} from 'react-router-dom'

const Contact = () => {

  const navigate=useNavigate()

  return (
    <div>
      <h2 className='text-3xl font-semibold'>Get in Touch</h2>
      <p className='mt-4 text-xl' >
        We’re here to help you with all your food delivery needs! If you have
        any questions, feedback, or need assistance, don’t hesitate to reach out
        to us.
      </p>
      <h2 className='mt-4 text-xl '>You can contact us through the following numbers:</h2>
      <ul className='mt-3' >
        <li  className='flex items-center gap-2 font-semibold text-xl'>Phone: <p className='text-[18px] font-light '>+977-9800000000</p> </li>
        <li className='flex items-center gap-2 font-semibold text-xl'>WhatsApp: <p className='text-[18px] font-light '>+977-9801010101</p>  </li>
        <li className='flex items-center gap-2 font-semibold text-xl'>Email: <p className='text-[18px] font-light '> mithomitho@gmail.com</p></li>
      </ul>
      <p className='mt-5 text-xl'>
        Visit our website <span className='text-orange-600 cursor-pointer ' onClick={()=>navigate('/menu')} >here</span> to place your order or get more
        information about our menu and services. We’re just a call or click
        away, ready to serve you with the best meals delivered right to your
        doorstep!
      </p>
    </div>
  );
};

export default Contact;
