import React, { useState, useRef, useEffect } from "react";
import { Input } from "../../components/Input";
import { isValidHTNo } from "../../utils/validations";
import { initiatePayment } from "../../api/paymentApi";

export function HostelsForm() {
  const [ht, setHt] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [room, setRoom] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentData, setPaymentData] = useState(null); const formRef = useRef(null);

  useEffect(() => { if (paymentData && formRef.current) formRef.current.submit(); }, [paymentData]);

  async function submit(e) {
    e.preventDefault();
    if (!isValidHTNo(ht)) return alert('Invalid HT');
    const res = await initiatePayment({
      student_roll: ht,
      student_name: name,
      email,
      mobile,
      amount: Number(amount),
      payment_type: 'HOSTEL',
      payment_subtype: 'ROOM',
      remarks: `Room:${room}`
    });
    setPaymentData(res);
  }
  return (
    <div>
      <h2>Hostel Payment</h2>
      <form onSubmit={submit}>
        <Input label="Hallticket No" value={ht} onChange={e => setHt(e.target.value.toUpperCase())} />
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input label="Mobile" type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required />
        <Input label="Room No" value={room} onChange={e => setRoom(e.target.value)} />
        <Input label="Amount (INR)" type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        <button className="primary" type="submit">Pay</button>
      </form>
      {paymentData && <form ref={formRef} method="POST" action={paymentData.action} style={{ display: 'none' }}>{Object.entries(paymentData.fields).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}</form>}
    </div>
  );
}
