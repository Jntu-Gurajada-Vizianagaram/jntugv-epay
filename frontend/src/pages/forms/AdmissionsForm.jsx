import React,{useState,useRef,useEffect} from "react";
import { Input } from "../../components/Input";
import { initiatePayment } from "../../api/paymentApi";

export function AdmissionsForm(){
  const [name,setName]=useState(''); const [mobile,setMobile]=useState(''); const [course,setCourse]=useState('B.TECH'); const [amount,setAmount]=useState('');
  const [paymentData,setPaymentData]=useState(null); const formRef=useRef(null);
  useEffect(()=>{ if(paymentData && formRef.current) formRef.current.submit(); },[paymentData]);
  async function submit(e){ e.preventDefault(); const res = await initiatePayment({ student_roll:'NEW_ADMISSION', student_name:name, amount:Number(amount), payment_type:'ADMISSION', payment_subtype:course, remarks:`Admission for ${course}` }); setPaymentData(res); }
  return (<div>
    <h2>Admission Payment</h2>
    <form onSubmit={submit}>
      <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
      <Input label="Mobile" value={mobile} onChange={e=>setMobile(e.target.value)} />
      <label>Course</label>
      <select value={course} onChange={e=>setCourse(e.target.value)} style={{marginTop:6,marginBottom:12}}><option>B.TECH</option><option>M.TECH</option><option>MCA</option><option>MBA</option></select>
      <Input label="Amount (INR)" type="number" value={amount} onChange={e=>setAmount(e.target.value)} required />
      <button className="primary" type="submit">Pay</button>
    </form>
    {paymentData && <form ref={formRef} method="POST" action={paymentData.action} style={{display:'none'}}>{Object.entries(paymentData.fields).map(([k,v])=> <input key={k} type="hidden" name={k} value={v} />)}</form>}
  </div>);
}
