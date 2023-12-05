import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../../api';
import { UserContext } from '../../context-api/UserState';


const Payment = () => { 
    const { getSetUserData, selectedCourse } = useContext(UserContext)
    const location = useLocation();
    const navigate = useNavigate()

    const { course_name, course_id } = {...selectedCourse};
    const userdata = getSetUserData();

    useEffect(() => {
        // console.log(course_id);
        // if (!course_id) {
        //     navigate('/Fresult')
        // } 
    }, [])
     
    const paymentResponse = (res) => {
        console.log(res);
    
        // navigate('/online-payment-success', {state: {order_id: res.order_id}});
        navigate('/online-payment-success', {state: {order_id: res.razorpay_order_id,payment_id:res.razorpay_payment_id,course_name:course_name
        }});
    }

    const failedResponse = (res) => {
        console.log(res);
    }
    
    const options = {
        "key": "rzp_test_Va8zcPCazlNao1",
        "currency": "INR",
        "name": "Nielit Corporation", 
        "handler": paymentResponse, 
        "notes": {
            "address": "Nielit Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        },
    };
 
    const initializeOrder = async (params) => {
        const { data } = await createOrder(params);
        // const data = { result : {id: 'order_MX1tQb917QiQKY', amount_due: 500000}}
        console.log(data.result);
        options.amount = data.result.amount_due * 1000
        options.order_id = data.result.id
        options.description = `Transaction for purchasing ${course_name} by ${userdata.name}`
        options.prefill = {  
            "name": userdata.name,  
            "email": userdata.email, 
        }
        const rzp1 = new Razorpay(options);
        rzp1.on('payment.failed', failedResponse);
        rzp1.open();
    }
    

    const handleBtn = (e) => {
        initializeOrder({course_name, course_id});
        e.preventDefault();
    }

  return (
    <>
    <section>
        <div className="d-flex justify-content-between align-items-center mb-5 mx-5">
            <div className="d-flex flex-row align-items-center">
            <h4 className="text-uppercase mt-1">Nielet</h4> 
            </div>
            <a href="#!" className='text-danger'>Cancel Payment</a>
        </div>

        <div className="row"> 
            <div className="col-md-9 col-lg-9 col-xl-9 container">
            <div className="p-3" style={{"backgroundColor": "#eee"}}>
                <span className="fw-bold">Order Recap</span>
                <div className="d-flex justify-content-between mt-2">
                <span>Course Name</span> <span>{ course_name }</span>
                </div>
                {/* <div className="d-flex justify-content-between mt-2">
                <span>Batch Name</span> <span>$0.0</span>
                </div> */}
                <div className="d-flex justify-content-between mt-2">
                <span>Course Price</span> <span>+ $0.0</span>
                </div> 
                <hr />
                <div className="d-flex justify-content-between mt-2">
                <span className="lh-sm">Amount </span>
                <span>$40.00</span>
                </div>
                <div className="d-flex justify-content-between mt-2">
                <span className="lh-sm">Gst </span>
                <span>$40.00</span>
                </div> 
                <hr />
                <div className="d-flex justify-content-between mt-2">
                <span>Total </span> <span className="text-success">$85.00</span>
                </div>
            </div>
            </div>
        </div>
        <div className='w-25 container my-4'>
            <div className="w-100 btn btn-success" id="rzp-button1" onClick={handleBtn} >Proceed to payment</div>
        </div>
        </section>
    </>
  )
}

export default Payment
