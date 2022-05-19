import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import { ABI } from "./ABI.js";
import PDF from './PDF';
import ipfs from "./ipfs";



class PrintBC extends Component {
    componentWillMount() {

        this.loadBlockchainData()      
        
    }
    
    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider);
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const contractAddress = "0xb3aa6d7186f3738f2748b8a29cd704714516b400"; //Contract Address
        const contract = new web3.eth.Contract(ABI, contractAddress)
        await this.setState({ contract })
        console.log("Operating Account: "+this.state.account);

        
    }

   

    constructor() {
        super();
        this.state = {
          fields: {},          
          errors: {},
          fields1: {Fingter_Print:'',Image:''},
          errors1: {},                 
          account: '',
          JSON1: {},
          options: {},
          options2: '',
          loading: true,
          buffer: null,
          contract: null,
          ipfsHash: '',
          transactionHash: '',
          buffer: null,
          cipher:'',
          page: 1,
          postSubmitted: false,
          Receiver_Private_Key:'',
          Sender_Public_Key:'',
          ct: '{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name" ...........,"type":"event"}'
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        this.showFile = this.showFile.bind(this);
        this.showFile2 = this.showFile2.bind(this);
        
    };

////////////////////////////////////////////////////////////////////////
    showFile = async (e) => {
      e.preventDefault()
      const reader = new FileReader()
      reader.onload = async (e) => { 
        const text = (e.target.result)
        console.log(text)
        this.setState({Receiver_Private_Key: text})
        if(this.state.cipher===""){

        }
        else{
          var passowrd = text;
          console.log('pasword: '+ passowrd);
          this.setState({Receiver_Private_Key: passowrd})
        }
      };
      reader.readAsText(e.target.files[0])
    }////////////////////////////////////


/////////////////////////////////////////////////////////////////////////
    showFile2 = async (e) => {
      e.preventDefault()
      const reader = new FileReader()
      reader.onload = async (e) => { 
        const text = (e.target.result)
        console.log(text)
        this.setState({Sender_Public_Key: text})
        if(this.state.cipher===""){

        }
        else{
          var passowrd = text;
          console.log('pasword: '+ passowrd);
          this.setState({Sender_Public_Key: passowrd})
        }
      };
      reader.readAsText(e.target.files[0])
    }
    ////////////////////////////////////



    
     handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });

            
      }
  
      onChange = input => e => {

        this.setState({
            [input]: e.target.value
        });
    }
    
      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
      
        if (!fields["Fingter_Print"]) {
          formIsValid = false;
          errors["Fingter_Print"] = "*Vui lòng nhập Mã định danh!";
        }
      
        if (typeof fields["Fingter_Print"] !== "undefined") {
          if (!fields["Fingter_Print"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["Fingter_Print"] = "*Vui lòng nhập Mã định danh!";
          }
        }
      
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
  
      async submituserRegistrationForm(e) {
        e.preventDefault();
        //Verify input data
      
        if (this.validateForm()){ 
        let fields = {};
        fields["Fingter_Print"] = "";
        this.setState({ fields });
      
         //Store into Blockchain by SmartContract
        var str= this.state.fields.Fingter_Print
        this.state.fields1["Fingter_Print"] = str.substring(0, 16)

        console.log("Test FP "+this.state.fields.Fingter_Print);
        var EOA_Owner = await this.state.contract.methods.Xem_CongDan(this.state.fields.Fingter_Print).call().then(function(result) {
          return result;        
        })

     
        // Decrypt
        //Khi em doc  tu blockchain ra, du lieu se duoc ma hoa nguoc lai
        //Ten: U2FsdGVkX185H467mDCrmgqoksagYZ3y55p1oBgcGtw=
        //Que Quan: U2FsdGVkX1+JPeEf11/ZQCs9KpBKbDqOx1LA03xdhQw=
        //var key = 'abcdabcdabcdabcdabcdabcdabcdabcd'; //Key nay la 1 cai textbox de chi nhap vao

        var CryptoJS = require("crypto-js");
        var fs = require('fs');
       	var NodeRSA = require('node-rsa');
        
        /*const Receiver_Public_Key = new NodeRSA('-----BEGIN PUBLIC KEY-----\n'+
                                                                            'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKaA2hgvbQ3+sPIpFVtUxeAfLSypHQBi\n'+
                                                                            'z28JlRRAj+12yC0YWFInkP6dh0BztVmskVLNsQ9kNvxAyMtIdydCXV8CAwEAAQ==\n'+
                                                                            '-----END PUBLIC KEY-----');
        */
        const key2 = this.state.Receiver_Private_Key.toString();
        console.log("Key RSA!!!!!!!: ",key2);
        const Receiver_Private_Key = new NodeRSA(key2); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
        console.log("Receiver Private Key!!!!!!!: ",Receiver_Private_Key);

        /*const Receiver_Private_Key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                                                                                'MIIBOQIBAAJBAKaA2hgvbQ3+sPIpFVtUxeAfLSypHQBiz28JlRRAj+12yC0YWFIn\n'+
                                                                                'kP6dh0BztVmskVLNsQ9kNvxAyMtIdydCXV8CAwEAAQJAIWa52Z4x91u/bWTWdvLj\n'+
                                                                                'mxlF+66VNc2cpT673EszVERqOsqpkWLq2b8pPAwV3C7lEvKJJnr+Uz1z4E1arfYo\n'+
                                                                                'wQIhAP3L48JePcqkvbtMdPII4JHvC8lmUAeQNRXic24nsdY/AiEAp/Lv15elEpJN\n'+
                                                                                '33rGZJkVCFSYpD9mnVFze6cDDFJm8OECIHnC4giUUizwkJ5Vdh3QqH0bJJqBXY/j\n'+
                                                                                'XbScKikFHkrdAiBSs76HW5Vd382ZDsxDHV7OC1pfBxlwvnsvmL5XgvxOAQIgfduo\n'+
                                                                                'T23VhMcI3Kvd15gs4oLXbGGH7zkJUM5ODZEc6QE=\n'+
                                                                                '-----END RSA PRIVATE KEY-----');
         */
        const key3 = this.state.Sender_Public_Key.toString();
        console.log("Key RSA!!!!!!!: ",key3);
        const Sender_Public_Key = new NodeRSA(key3); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
        console.log("Sender Public Key!!!!!!!: ",Sender_Public_Key);

        /*const Sender_Public_Key = new NodeRSA('-----BEGIN PUBLIC KEY-----\n'+
                                                                          'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAQhLz8dbqgF1hL7w1JbghxFuz8+GveF2I\n'+
                                                                          'ofmPl1qvmhyMpzQ4JOm+yOOTZ6uzZsCfh35JaaDXFh1QsjbDBXTwyQIDAQAB\n'+
                                                                          '-----END PUBLIC KEY-----');

         */  
        /// Read file từ IPFS 
        let self = this;
        

        await ipfs.cat(EOA_Owner[1], function (err, file) {
          if (err) {
            throw err
          }        
        console.log("File tai ve:"+file.toString('utf8'))

        const str =  file.toString('utf8')
        var abc = JSON.parse(str)
                   
        
          //1. Decrypt AES Key with Receiver Private Key
          var AES_KEY_Cipher_2 =  abc.AES_KEY_Cipher_2;
          console.log('****AES_KEY_Cipher_2: '+ AES_KEY_Cipher_2); 

          var key = Receiver_Private_Key.decrypt(AES_KEY_Cipher_2, 'utf8');	
          console.log('*****AES Key: '+ key);
                                                                            
          //2. Check Signature of AES Key with Sender Public Key
            
          var AES_KEY_Cipher = abc.AES_KEY_Cipher;
          console.log('*****AES_KEY_Cipher: '+ AES_KEY_Cipher);
          var AES_KEY_Check = Sender_Public_Key.verify(key,AES_KEY_Cipher,'utf8', 'base64');	
          console.log('*****AES Key Check: '+ AES_KEY_Check);

          if(AES_KEY_Check)
        {
          //3. Decrypt Data with AES Key
    
          console.log("Day la ten chua duoc giai ma: "+abc.Name); // 'my message'
          console.log("Day la địa chỉ: "+abc.Address); // can duoc giai ma
          console.log("Day la ngày sinh: "+abc.Birthday); // 'my message'
          console.log("Day la ten cha chua duoc giai ma: "+abc.Dad); // can duoc giai ma
          console.log("Day la ten mẹ chua duoc giai ma: "+abc.Mom); // can duoc giai ma
          console.log("Day la Finger_Print: "+abc.Fingter_Print); // can duoc giai ma

          var bytes  = CryptoJS.AES.decrypt(abc.Name, key);
          var Name = bytes.toString(CryptoJS.enc.Utf8);
          
          bytes  = CryptoJS.AES.decrypt(abc.Dad, key);
          var Dad = bytes.toString(CryptoJS.enc.Utf8);
          
          bytes  = CryptoJS.AES.decrypt(abc.Mom, key);
          var Mom = bytes.toString(CryptoJS.enc.Utf8);


          console.log("Day la ten da duoc giai ma: "+Name); // 'my message'
          console.log("Day la ngay sinh: "+abc.Birthday); // 'my message'
          console.log("Day la ten cha da duoc giai ma: "+Dad); // 'my message'
          console.log("Day la ten me da duoc giai ma: "+Mom); // 'my message'

          self.setState({EOA_Owner1: Name})
          self.setState({EOA_Owner2: abc.Birthday})
          self.setState({EOA_Owner4: Dad})
          self.setState({EOA_Owner5: Mom})
      
          }  else {
            console.log("Do not thing!")
            alert("The AES_Key_Check/FP is False");
            self.setState({EOA_Owner1:""})
            self.setState({EOA_Owner2: ""})
            self.setState({EOA_Owner4: ""})
            self.setState({EOA_Owner5: ""})

          
          }
      })   
       
    }
  }


////////////////////////////////////////////////////////////////////////////////////////////////////////////
 sunmitPost = (e) => {
  
        if(!this.state.EOA_Owner1 || !this.state.EOA_Owner2 || !this.state.EOA_Owner4 || !this.state.EOA_Owner5){
            alert('All fields are required!');
            e.preventDefault();
        }else{
            this.setState({
                postSubmitted: true
            });
        }
      }

////////////////////////////////////////////

//////////////////////////////////////////

    render() {
    return (<div>
      <ol className="breadcrumb">
      <li className="breadcrumb-item" style={{fontSize: 25,fontWeight:"bold", color: "blue"}}>
      Ủy ban (In thông tin Công dân)
      </li>
        <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#EEE8AA",border: "1px solid #EEE8AA"}}  value={"Tài khoản đăng nhập: "+this.state.account} disabled></input>
      </ol>
      {!this.state.postSubmitted ? 
        <div className="Police1">
                <span className="md-headline" align="center"  > Thông tin Công dân</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>
                  <div className="form-input">
                    <label htmlFor="first_name" className="required"> Mã định danh</label>
                    <input type="text" name="Fingter_Print" value={this.state.fields.Fingter_Print} onChange={this.handleChange} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Fingter_Print}</div>                
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa bí mật của Công dân</label>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa công khai của Ủy ban</label>
                    <input type="file" onChange={(e) => this.showFile2(e)} />
                  </div>

                  <div className="form-submit">
                    <input type="submit" value="Xem" className="submit" id="submit" name="submit" />                                      
                  </div>              
                                  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Họ và tên</label>
                    <input type="text" onChange={this.onChange('Name')} name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner1} disabled></input>
                  </div>
                  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ngày sinh</label>
                    <input type="text" onChange={this.onChange('Birthday')} name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner2} disabled></input>
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Họ tên cha</label>
                    <input type="text" onChange={this.onChange('Dad')} name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner4} disabled></input>
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Họ tên mẹ</label>
                    <input type="text" onChange={this.onChange('Mom')} name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner5} disabled></input>
                  </div>                   

                  <div className="form-submit1">
                    <input type="submit" onClick={this.sunmitPost} value="In" className="submit" id="submit" name="submit"/>
                  </div>

                </form>                
        </div>
: (
    <PDF Name={this.state.EOA_Owner1} Birthday={this.state.EOA_Owner2} Dad={this.state.EOA_Owner4} Mom={this.state.EOA_Owner5}/>
  )
  }
           
    </div>);
  };
}
export default PrintBC;
