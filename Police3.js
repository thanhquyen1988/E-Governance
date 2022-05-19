import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import { ABI } from "./ABI.js";
import ipfs from "./ipfs";



class Police3 extends Component {
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
          fields1: {Fingter_Print:'',Issued_by:'', Image:'', AES:'', AES_KEY_Cipher:'', AES_KEY_Cipher_2:''},
          errors1: {},                 
          account: '',
          JSON1: {},
          options: {},
          options2: '',
          loading: true,
          buffer: null,
          contract: null,
          ipfsHash: '',
          ipfsHash1: '',
          transactionHash: '',
          transactionHash1: '',
          Sender_Public_Key:'',
          Receiver_Private_Key:'',
          buffer: null,
          page: 1,
          ct: '{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name" ...........,"type":"event"}'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);


        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        this.submituserRegistrationForm1 = this.submituserRegistrationForm1.bind(this);
        
        this.showFile = this.showFile.bind(this);
        this.showFile2 = this.showFile2.bind(this);

        
    };
      handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
      
      }
      handleChange1(e) {
        let fields1 = this.state.fields1;
        fields1[e.target.name] = e.target.value;
        this.setState({
          fields1
        });
      
      }
////////////////////////////////////////////////////////////////////  
    
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

      ////////////////////////////////////////////////////////////////////////
      validateForm1() {

        let fields1 = this.state.fields1;
        let errors1 = {};
        let formIsValid = true;
      
        if (!fields1["Fingter_Print"]) {
          formIsValid = false;
          errors1["Fingter_Print"] = "*Vui lòng nhập Mã định danh!";
        }
      
        if (typeof fields1["Fingter_Print"] !== "undefined") {
          if (!fields1["Fingter_Print"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors1["Fingter_Print"] = "*Vui lòng nhập Mã định danh!";
          }
        }
      
        this.setState({
          errors1: errors1
        });
        return formIsValid;
      }
      
      //////////////////////////////////////////////////////////
      
          
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
        var EOA_Owner = await this.state.contract.methods.Xem_HoChieu(this.state.fields.Fingter_Print).call().then(function(result) {
          return result;        
        })
        
                // Decrypt
        //Khi em doc  tu blockchain ra, du lieu se duoc ma hoa nguoc lai
        //Ten: U2FsdGVkX185H467mDCrmgqoksagYZ3y55p1oBgcGtw=
        //Que Quan: U2FsdGVkX1+JPeEf11/ZQCs9KpBKbDqOx1LA03xdhQw=
       // var key = 'abcdabcdabcdabcdabcdabcdabcdabcd'; //Key nay la 1 cai textbox de chi nhap vao

        var CryptoJS = require("crypto-js");
        var fs = require('fs');
       	var NodeRSA = require('node-rsa');

        const key2 = this.state.Receiver_Private_Key.toString();
        console.log("Key RSA!!!!!!!: ",key2);
        const Receiver_Private_Key = new NodeRSA(key2); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
        console.log("Receiver Private Key!!!!!!!: ",Receiver_Private_Key);

        const key3 = this.state.Sender_Public_Key.toString();
        console.log("Key RSA!!!!!!!: ",key3);
        const Sender_Public_Key = new NodeRSA(key3); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
        console.log("Sender Public Key!!!!!!!: ",Sender_Public_Key);



        /// Read file từ IPFS 
        let self = this;      

        await ipfs.cat(EOA_Owner[1], function (err, file) {
          if (err) {
            throw err
          }        
        console.log("File tai ve:"+file.toString('utf8'))

        const str =  file.toString('utf8')
        var json = JSON.parse(str)
                   
        
          //1. Decrypt AES Key with Receiver Private Key
          var AES_KEY_Cipher_2 =  json.AES_KEY_Cipher_2;
          console.log('****AES_KEY_Cipher_2: '+ AES_KEY_Cipher_2); 

          var key = Receiver_Private_Key.decrypt(AES_KEY_Cipher_2, 'utf8');	
          console.log('*****AES Key: '+ key);
                                                                            
          //2. Check Signature of AES Key with Sender Public Key
            
          var AES_KEY_Cipher = json.AES_KEY_Cipher;
          console.log('*****AES_KEY_Cipher: '+ AES_KEY_Cipher);
          var AES_KEY_Check = Sender_Public_Key.verify(key,AES_KEY_Cipher,'utf8', 'base64');	
          console.log('*****AES Key Check: '+ AES_KEY_Check);

          if(AES_KEY_Check)
        {
          //3. Decrypt Data with AES Key
    
          console.log("Day la ten chua duoc giai ma: "+json.Name); 
          console.log("Day la ngay sinh: "+json.Birthday); 
          console.log("Day la noi cap chua duoc giai ma: "+json.Issued_by); 

          var bytes  = CryptoJS.AES.decrypt(json.Name, key);
          var Name = bytes.toString(CryptoJS.enc.Utf8);
          
          bytes  = CryptoJS.AES.decrypt(json.Issued_by, key);
          var Issued_by = bytes.toString(CryptoJS.enc.Utf8);

          console.log("Day la ten da duoc giai ma: "+Name); // 'my message'
          console.log("Day la noi cap da duoc giai ma: "+Issued_by); // 'my message'
          
          self.setState({EOA_Owner0: json.Fingter_Print})
          self.setState({EOA_Owner1: Name})
          self.setState({EOA_Owner2: json.Birthday})
          self.setState({EOA_Owner3: Issued_by})
          self.setState({EOA_Owner4: EOA_Owner[2]})
        
      
          }  else {
            console.log("Do not thing!")
            alert("The AES_Key_Check/FP is False");
            self.setState({EOA_Owner1:""})
            self.setState({EOA_Owner1:""})
            self.setState({EOA_Owner2: ""})
            self.setState({EOA_Owner3: ""})
            self.setState({EOA_Owner4: ""})
         
          }
      })   
       
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

      
      async submituserRegistrationForm1(e) {
        e.preventDefault();
        //Verify input data
        if (this.validateForm1()) {
        let fields1 = {};
        fields1["Fingter_Print"] = this.state.EOA_Owner0;
        this.setState({ fields1 });
        console.log("Running Account "+this.state.account);         
        //Store into Blockchain by SmartContract
        this.state.contract.methods.Xoa_HoChieu(this.state.EOA_Owner0).send({
          from: this.state.account,
          gas: 3000000
        }, (error, transactionHash) => {
          alert(" Xóa Hộ chiếu thành công!");
        this.setState({ transactionHash });
        })  
      }
    }
//////////////////////////////////////////

    render() {
    return (<div>
      <ol className="breadcrumb">
      <li className="breadcrumb-item" style={{fontSize: 25,fontWeight:"bold", color: "blue"}}>
      Cảnh sát
      </li>
        <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#EEE8AA",border: "1px solid #EEE8AA"}}  value={"Tài khoản đăng nhập: "+this.state.account} disabled></input>
      </ol>

        <div className="Police1">
                <span className="md-headline" align="center"  > Thông tin Hộ chiếu</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>
                  <div className="form-input">
                    <label htmlFor="first_name" className="required"> Mã định danh</label>
                    <input type="text" name="Fingter_Print" value={this.state.fields.Fingter_Print} onChange={this.handleChange} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Fingter_Print}</div>                
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa bí mật của Công dân</label>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa Công khai của Cảnh sát</label>
                    <input type="file" onChange={(e) => this.showFile2(e)} />
                  </div>

                  <div className="form-submit">
                    <input type="submit" value="Xem" className="submit" id="submit" name="submit" />                                      
                  </div>              
                                  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Họ và tên</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner1} disabled></input>
                  </div>                 

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ngày sinh</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner2} disabled></input>
                  </div>                  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Nơi cấp</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner3} disabled></input>
                  </div>  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ảnh</label>
                    <img src={`https://ipfs.io/ipfs/${this.state.EOA_Owner4}`} style={{width:"40%",height:"40%"}} alt=""/> 
                  </div>                        
                </form>                
        </div>

      <div className="Police2">
                <span className="md-headline" align="center"  > Hủy Hộ chiếu</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm1}>
                  <div className="form-input">
                    <label htmlFor="first_name" className="required"> Mã định danh</label>
                    <input type="text" name="Fingter_Print" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}} value={this.state.fields1.Fingter_Print} onChange={this.handleChange1} disabled></input>
                  </div>
                  
                  <div className="form-submit">
                    <input type="submit" value="Hủy" className="submit" id="submit" name="submit" />                                      
                  </div>    
                </form>
      </div>     
    </div>);
  };
}
export default Police3;
