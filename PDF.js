import React from 'react';
import Pdf from 'react-to-pdf';
import './App.css';

const ref = React.createRef();

const PDF = (props) => {
  return (
      <div className="PrintPDF" ref={ref} style={{fontWeight:"bold", width:"100%", height:2000, backgroundColor:"#F0F8FF", border: "1px solid #F0F8FF", color: "purple"}}>  
            <span className="md-headline2">Citizen Information</span>
                    <h1>Name: {props.Name}</h1>
                    <h1>Birthday: {props.Birthday}</h1>
                    <h1>Father's Name: {props.Dad}</h1>
                    <h1>Mother's: {props.Mom}</h1>                    
      <Pdf targetRef={ref} filename="post.pdf" > 
        {({ toPdf }) => (               
        <button class="submit1" onClick={toPdf}>Print PDF</button>        
        )}        
      </Pdf>   
      </div>  
  );
}
export default PDF;