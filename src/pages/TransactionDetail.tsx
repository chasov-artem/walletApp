import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const infoText = {
  Approved: '#45b36b',
  Pending: '#fbbe48'
};

const TransactionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const transaction = useSelector((state: any) => state.transactions.transactions.find(t => t.id === id));

  if (!transaction) return <div style={{padding: 28, textAlign: 'center'}}>Not found</div>;

  const statusText = transaction.pending ? 'Pending' : 'Approved';
  const statusColor = infoText[statusText as keyof typeof infoText];
  return (
    <div style={{ minHeight: '100vh', background:'#fff', width: '100vw', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ maxWidth: 420, width:'100%', padding:'0 0 0 0', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'80vh' }}>
        <div style={{ background:'#fff', borderRadius:26, boxShadow: '0 1px 24px rgba(54,72,114,0.08)', width:'100%', padding:'30px 0 36px 0', display:'flex', flexDirection:'column', alignItems:'center' }}>
          <div style={{ width:'100%', position:'relative', height:32 }}>
            <button onClick={() => navigate(-1)} style={{ border:'none',background:'none',fontSize:28,cursor:'pointer',position:'absolute',left:15,top:4,color:'#181a1a',fontWeight:500 }}>&larr;</button>
          </div>
          <div style={{ fontWeight: 900, fontSize: 50, margin: '14px 0 0 0', color:'#181818', letterSpacing:'-2.2px', textAlign:'center', lineHeight:'1.05' }}>
            ${transaction.amount.toFixed(2)}
          </div>
          <div style={{color:'#999daa', fontSize:18, margin:'11px 0 0 0', textAlign:'center', fontWeight:500, letterSpacing:'-0.9px' }}>{transaction.name}</div>
          <div style={{ color:'#ceced5', fontSize:15, margin:'4px 0 24px 0', textAlign:'center', fontWeight:400, letterSpacing:'-0.5px' }}>
            {new Date(transaction.date).toLocaleDateString()} {new Date(transaction.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          {/* Статус — сірий фон, темний статус */}
          <div style={{ width:'88%', background:'#f6f7fa', borderRadius:13, marginBottom:17, padding:'13px 16px', fontSize:15, border: 'none', display: 'flex', flexDirection:'column', alignItems:'flex-start' }}>
            <span style={{ fontWeight:700, fontSize:15, marginBottom:7 }}>Status:<span style={{marginLeft:7, color:statusColor, fontWeight:700}}>{statusText}</span></span>
            <span style={{color:'#b9b8be', fontSize:14, fontWeight:500 }}>{transaction.description}</span>
            {transaction.authorizedUser ? <span style={{color:'#aaa', fontSize:12, marginTop:2 }}>Authorized by: <b>{transaction.authorizedUser}</b></span> : null}
          </div>
          {/* Total — теж сірий box ! */}
          <div style={{width:'88%', background:'#f6f7fa', borderRadius:13, padding:'10px 4px 8px 4px', fontSize:18, border: 'none', display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:600, marginTop:3}}>
            <span style={{color:'#bbb', fontSize:17, fontWeight:600}}>Total</span>
            <span style={{color:'#181818', fontWeight:800, fontSize:19}}>${transaction.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
