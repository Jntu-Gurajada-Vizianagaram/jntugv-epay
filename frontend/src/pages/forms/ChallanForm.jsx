import React,{useState,useRef,useEffect} from "react";
import { Input } from "../../components/Input";
import { initiatePayment } from "../../api/paymentApi";

export function ChallanForm(){
  const [name,setName]=useState(''); const [purpose,setPurpose]=useState(''); const [amount,setAmount]=useState('');
  const [paymentData,setPaymentData]=useState(null); const formRef=useRef(null);
  useEffect(()=>{ if(paymentData && formRef.current) formRef.current.submit(); },[paymentData]);
  async function submit(e){ e.preventDefault(); const res = await initiatePayment({ student_roll:'CHALLAN', student_name:name, amount:Number(amount), payment_type:'CHALLAN', remarks:purpose }); setPaymentData(res); }
  return (<div>
    <h2>Direct Challan</h2>
    <form onSubmit={submit}>
      <Input label="Name" value={name} onChange={e=>setName(e.target.value)} />
      <Input label="Purpose" value={purpose} onChange={e=>setPurpose(e.target.value)} />
      <Input label="Amount" type="number" value={amount} onChange={e=>setAmount(e.target.value)} required />
      <button className="primary" type="submit">Pay</button>
    </form>
    {paymentData && <form ref={formRef} method="POST" action={paymentData.action} style={{display:'none'}}>{Object.entries(paymentData.fields).map(([k,v])=> <input key={k} type="hidden" name={k} value={v} />)}</form>}
  </div>);
}
