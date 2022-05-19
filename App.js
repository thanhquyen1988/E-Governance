import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';

import Web3 from 'web3';
import ipfs from "./ipfs";
/////////////////////////////////
import { ABI } from "./ABI.js";
import './App.css';
import School1 from './School1';
import School2 from './School2';
import Committee1 from './Committee1';
import Committee2 from './Committee2';
import Committee3 from './Committee3';
import Police1 from './Police1';
import Police2 from './Police2';
import Police3 from './Police3';
import Citizen1 from './Citizen1';
import Citizen2 from './Citizen2';
import Citizen3 from './Citizen3';
import Citizen4 from './Citizen4';
import PrintBC from './PrintBC';
import Business1 from './Business1';
import Business2 from './Business2';
import Business3 from './Business3';




class App extends Component {

  componentWillMount() {

    this.loadBlockchainData()
    
  }


  async loadBlockchainData() {
    //Connect Wallet

    var web3 = new Web3(window.ethereum);
    if (window.ethereum) {
      try {
        window.ethereum.enable().then(function () {
          // User has allowed account access to DApp...
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      while(1){
      alert('You have to install MetaMask !');
      }
    }


   // const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] }) 
    const contractAddress = "0xb3aa6d7186f3738f2748b8a29cd704714516b400"; //Contract Address
    const contract = new web3.eth.Contract(ABI, contractAddress)
    this.setState({ contract })
    console.log("Operating Account: "+this.state.account);
}

  constructor() {
    super();
    this.state = {
      fields: {Address:'', Information:''},
      errors: {},
     // fields2: {ID:'', Name:'', Birthday:'', Gender:'',Place_Of_Birth:'',Nationality:'',Ethnic_Group:'',Dad:'',Dad_place:'',Dad_age:'',Mom:'',Mom_place:'',Mom_age:''},
      fields2: {Address:'', Name:'', Birthday:'', Dad:'',Mom:'', Fingter_Print:'', AES:'', AES_KEY_Cipher:'', AES_KEY_Cipher_2:''},
      errors2: {},
      fields3: {},
      errors3: {},
      account: '',
      JSON1: {},
      JSON2: {},
      options: '',
      options2: '',
      loading: true,
      buffer: null,
      contract: null,
      cipher:'',
      ipfsHash: '',
      transactionHash: '',
      page: 1,
      hasError: false,
      postSubmitted: false,
      Sender_Private_Key:'',
      Receiver_Public_Key:'',
      ct: '{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name" ...........,"type":"event"}'
    }

    
    this.handleChange2 = this.handleChange2.bind(this);
    this.submituserRegistrationForm2 = this.submituserRegistrationForm2.bind(this);
    this.showFile = this.showFile.bind(this);
    this.showFile2 = this.showFile2.bind(this);
  };

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
   while(1){
      // Do something, e.g. handle error.
      alert(error, info);
    }
  }



  handleChange2(e) {
    let fields2 = this.state.fields2;
    fields2[e.target.name] = e.target.value;
    this.setState({
      fields2
    });
    
  }

  
 
/////////////////////////////////////////////////////////////////////////
showFile = async (e) => {
  e.preventDefault()
  const reader = new FileReader()
  reader.onload = async (e) => { 
    const text = (e.target.result)
    console.log(text)
    this.setState({Sender_Private_Key: text})
    if(this.state.cipher===""){

    }
    else{
      var passowrd = text;
      console.log('pasword: '+ passowrd);
      this.setState({Sender_Private_Key: passowrd})
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
    this.setState({Receiver_Public_Key: text})
    if(this.state.cipher===""){

    }
    else{
      var passowrd = text;
      console.log('pasword: '+ passowrd);
      this.setState({Receiver_Public_Key: passowrd})
    }
  };
  reader.readAsText(e.target.files[0])
}////////////////////////////////////

validateForm2() {

  let fields2 = this.state.fields2;
  let errors2 = {};
  let formIsValid = true;

  if (!fields2["Address"]) {
    formIsValid = false;
    errors2["Address"] = "*Vui lòng nhập Tài khoản!";
  }

  if (typeof fields2["Address"] !== "undefined") {
    if (!fields2["Address"].match(/^[a-fxA-F0-9]*$/)) {
      formIsValid = false;
      errors2["Address"] = "*Vui lòng nhập Tài khoản, Bao gồm chữ và số!";
    }
  }

  if (!fields2["Name"]) {
    formIsValid = false;
    errors2["Name"] = "*Vui lòng nhập Họ và tên!";
  }

  if (!fields2["Birthday"]) {
    formIsValid = false;
    errors2["Birthday"] = "*Vui lòng nhập Ngày sinh!";
  }


  if (!fields2["Dad"]) {
    formIsValid = false;
    errors2["Dad"] = "*Vui lòng nhập Họ tên cha!";
  }


  if (!fields2["Mom"]) {
    formIsValid = false;
    errors2["Mom"] = "*Vui lòng nhập Họ tên mẹ!";
  }


  if (!fields2["Fingter_Print"]) {
    formIsValid = false;
    errors2["Fingter_Print"] = "*Vui lòng nhập Mã định danh!";
  }

  if (typeof fields2["Fingter_Print"] !== "undefined") {
    if (!fields2["Fingter_Print"].match(/^[0-9]*$/)) {
      formIsValid = false;
      errors2["Fingter_Print"] = "*Vui lòng nhập Mã định danh!";
    }
  }
  this.setState({
    errors2: errors2
  });
  return formIsValid;
}
  
////////////////////////////////////////////////////////////
  async submituserRegistrationForm2(e) {
    e.preventDefault();
    //Verify input data
    if (this.validateForm2()) {
    
    let fields2 = {};
    let fields1 = {};
    fields1["Address"] = "";
    fields1["Name"] = "";
    fields1["Birthday"] =  "";
    fields1["Mom"] = "";;
    fields1["Dad"] = "";  
    fields1["Fingter_Print"] = "";
    fields1["AES"] = "";
    this.setState({fields2:fields1 });

  
    var CryptoJS = require("crypto-js");
    var NodeRSA = require('node-rsa');

    //1. Generate Random AES256 Key
    //var key = 'abcdabcdabcdabcdabcdabcdabcdabcd'; //Key nay la 1 cai textbox de chi nhap vao
    var key = this.state.fields2.AES;
    
    //2. Sign AES Key with Sender Private Key
   
   // Người gửi khởi tạo cặp khóa Public và Private của thuật toán RSA
    
    const key2 = this.state.Sender_Private_Key.toString();
    console.log("Key RSA!!!!!!!: ",key2);
    const Sender_Private_Key = new NodeRSA(key2); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
    console.log("Sender Private Key!!!!!!!: ",Sender_Private_Key);
    /*const Sender_Private_Key = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n'+
                                                                          'MIIBOAIBAAJAQhLz8dbqgF1hL7w1JbghxFuz8+GveF2IofmPl1qvmhyMpzQ4JOm+\n'+
                                                                          'yOOTZ6uzZsCfh35JaaDXFh1QsjbDBXTwyQIDAQABAkA9tefismA4XX58j+JvhSb8\n'+
                                                                          'ds1+dQVmfK004pmKuecSHq8KQrr1RzI9EBSG3c/3bQYJN4Q9t9lmXVuF+4szRpQB\n'+
                                                                          'AiEAghz9YU3wQKluuFnl+aVz50xEvxV+f94jg0IcDdQWIoECIQCCAHSf8Q88GTtT\n'+
                                                                          'DQ9YQiNncGfe93szBOfW70g+saQaSQIgHV5/zxvxlBbqmBAqufwfumDbz6oBYMl6\n'+
                                                                          'iKE+hdyOloECIFcgGwk+M2mht2KXtBsAaF3gtZx22/h7Zy1jPFXYFBURAiBG1Rhz\n'+
                                                                          'CYnRtAoKn8L2mMfNDbu3B6c4PhH67Ezus2vbCQ==\n'+
                                                                          '-----END RSA PRIVATE KEY-----');
  
    */
                                                                                                                                  
  /*const Sender_Public_Key = new NodeRSA('-----BEGIN PUBLIC KEY-----\n'+
                                                                    'MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAQhLz8dbqgF1hL7w1JbghxFuz8+GveF2I\n'+
                                                                    'ofmPl1qvmhyMpzQ4JOm+yOOTZ6uzZsCfh35JaaDXFh1QsjbDBXTwyQIDAQAB\n'+
                                                                    '-----END PUBLIC KEY-----');*/
  console.log("Key AES!!!!!!!: ",key);
  fields2["AES_KEY_Cipher"] = Sender_Private_Key.sign(key, 'base64', 'utf8');//
  console.log("AES_KEY_Cipher!!!!!!!: ", fields2["AES_KEY_Cipher"]);

    //3. Encrypt Data with AES Key
    
    //var Address = CryptoJS.AES.encrypt(fields2.Address, key).toString(); //Dia chi khong duoc ma hoa
    fields2["Address"] = this.state.fields2.Address;
    //var Name = await CryptoJS.AES.encrypt(fields2.Name, key).toString(); => Day la cai luc dau chi viet. Nhung luc nay fields2.Name là rỗng, 
    var Name = CryptoJS.AES.encrypt(this.state.fields2.Name, key).toString(); //=>Day la lúc update lai đúng
    fields2["Name"] = Name;
    //var Birthday = CryptoJS.AES.encrypt(fields2.Birthday, key).toString();
    fields2["Birthday"] =  this.state.fields2.Birthday;  
    //var Place_Of_Birth = CryptoJS.AES.encrypt(this.state.fields2.Place_Of_Birth, key).toString(); //=>Tuong tu
    //fields2["Place_Of_Birth"] = await Place_Of_Birth; 
    var Mom = CryptoJS.AES.encrypt(this.state.fields2.Mom, key).toString();
    fields2["Mom"] = Mom;
    var Dad = CryptoJS.AES.encrypt(this.state.fields2.Dad, key).toString();
    fields2["Dad"] = Dad;  
    //var Fingter_Print = CryptoJS.AES.encrypt(fields2.Fingter_Print, key).toString();
    fields2["Fingter_Print"] = this.state.fields2.Fingter_Print;  
    
    

    console.log("Day la EOA: "+fields2.Address);
    console.log("Day la Finger print: "+fields2.Fingter_Print);
    console.log("Day la Birthday da duoc ma hoa: "+fields2.Birthday);
    console.log("Day la Name da duoc ma hoa: "+fields2.Name);
    console.log("Day la ten cha da duoc ma hoa:"+fields2.Dad);
    console.log("Day la ten me da duoc ma hoa:"+fields2.Mom);



    //4. Encrypt AES Key With Receiver Public Key
	  const key3 = this.state.Receiver_Public_Key.toString();
    console.log("Receiver Public Key RSA!!!!!!!: ",key3);
    const Receiver_Public_Key = new NodeRSA(key3); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
    console.log("Receiver Public Key!!!!!!!: ",Receiver_Public_Key);

	  /*const Receiver_Public_Key = new NodeRSA('-----BEGIN PUBLIC KEY-----\n'+
                                                                      'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKaA2hgvbQ3+sPIpFVtUxeAfLSypHQBi\n'+
                                                                      'z28JlRRAj+12yC0YWFInkP6dh0BztVmskVLNsQ9kNvxAyMtIdydCXV8CAwEAAQ==\n'+
                                                                      '-----END PUBLIC KEY-----');
    */
    fields2["AES_KEY_Cipher_2"] = 	Receiver_Public_Key.encrypt(key, 'base64');		
    console.log('*****Encrypted AES Key for Receiver: '+ fields2.AES_KEY_Cipher_2);
    console.log('*****Signed AES Key: '+ fields2.AES_KEY_Cipher);

  

    ////////////////////////////
//Parse data to JSON
        const str = await JSON.stringify(fields2)
        console.log('Step 1: JSON is', str)
        this.setState({JSON1: JSON.parse(str) })
        const buf = await Buffer.from(str)
        //await this.setState({ buffer: buf })
        console.log('Buffer', buf)
        const Address = await this.state.JSON1.Address
        const Fingter_Print = await this.state.JSON1.Fingter_Print
        console.log('Address', Address)
        var self = this;
        //Download file JSON from IPFS
        //if(List===""){
          //Store into IPFS
          await ipfs.files.add(buf, (error, result) => {
            if (error) {
              console.error(error)
            }
            this.setState({ ipfsHash: result[0].hash })
            console.log('Step 2: ipfsHash is', this.state.ipfsHash)
            console.log("Step3: Smart Contract is " + this.state.ct)
            self.setState({options: str})
            //Store into Blockchain by SmartContract
            this.state.contract.methods.Them_CongDan(Address, Fingter_Print, result[0].hash, result[0].hash).send({
              from: this.state.account,
              gas: 3000000
            }, (error, transactionHash) => {
              console.log("Step 4: Transaction hash is ", transactionHash);
              alert(" Thêm Công dân thành công!");
              this.setState({ transactionHash });
            }).then((r) => {
              return this.setState({ ipfsHash: result[0].hash })
              console.log('ipfsHash:', this.state.ipfsHash)
            });
          })        
        }
      }
      

/////////////////////
///////////////////
/*

         //Store into Blockchain by SmartContract
    await this.state.contract.methods.Birth_Certificate_Registration(fields2.Address, fields2.Fingter_Print, fields2.Name, 
                                                                        fields2.Birthday, fields2.Dad, fields2.Mom,
                                                                        fields2.AES_KEY_Cipher, fields2.AES_KEY_Cipher_2).send({
          from: this.state.account,
          gas: 3000000
        }, (error, transactionHash) => {
          if (!error){
            alert("Birth Certificate Registration is successful!");
          } else {
            alert("Birth Certificate Registration is fail!");
          }
          this.setState({ transactionHash });          
        })        
   
  }
}
  /////////////////////////
 */
  //////////////////////

  render_Committee = () => {
    return (<div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item" style={{fontSize: 25,fontWeight:"bold", color: "blue"}}>
        Ủy ban (Quản lý thông tin công dân)
        </li>
        <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#EEE8AA",border: "1px solid #EEE8AA"}}  value={"Tài khoản đăng nhập: "+this.state.account} disabled></input>
      </ol>               
      
      <div className="Commitee">
                <span className="md-headline" align="center"  > Đăng ký thông tin công dân</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm2}>
                  <div className="form-input">
                    <label htmlFor="first_name" className="required">Tài khoản công dân</label>
                    <input type="text" name="Address" value={this.state.fields2.Address} onChange={this.handleChange2} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.Address}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="last_name" className="required">Tên công dân</label>
                    <input type="text" name="Name" value={this.state.fields2.Name} onChange={this.handleChange2} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.Name}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required">Ngày sinh</label>
                    <input type="date" name="Birthday" value={this.state.fields2.Birthday} onChange={this.handleChange2} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.Birthday}</div>
                  </div>                                    
                  <div className="form-input">
                    <label htmlFor="last_name" className="required">Họ tên cha</label>
                    <input type="text" name="Dad" value={this.state.fields2.Dad} onChange={this.handleChange2} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.Dad}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Họ tên mẹ </label>
                    <input type="text" name="Mom" value={this.state.fields2.Mom} onChange={this.handleChange2} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.Mom}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Mã định danh</label>
                    <input type="text" name="Fingter_Print" value={this.state.fields2.Fingter_Print} onChange={this.handleChange2} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.Fingter_Print}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa AES</label>
                    <input type="text" name="AES" value={this.state.fields2.AES} onChange={this.handleChange2} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors2.AES}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa bí mật của Ủy ban</label>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa công khai của Công dân</label>
                    <input type="file" onChange={(e) => this.showFile2(e)} />
                  </div>
                  <div className="form-submit">
                    <input type="submit" value="Đăng ký" className="submit" id="submit" name="submit" />
                  </div>                                                                   
        </form>
        
      </div>

    </div>);
  };

  
  render_Committee1 = () => {
    return (<Committee1 />);
  };
  render_Committee2 = () => {
    return (<Committee2 />);
  };
  render_Committee3 = () => {
    return (<Committee3 />);
  };
  render_School1 = () => {
    return (<School1 />);
  };
  render_School2 = () => {
    return (<School2 />);
  };
  render_Police1 = () => {
    return (<Police1 />);
  };
  render_Police2 = () => {
    return (<Police2 />);
  };
  render_Police3 = () => {
    return (<Police3 />);
  };
  render_Citizen1 = () => {
    return (<Citizen1 />);
  };
  render_Citizen2 = () => {
    return (<Citizen2 />);
  };
  render_Citizen3 = () => {
    return (<Citizen3 />);
  };
  render_Citizen4 = () => {
    return (<Citizen4 />);
  };
  render_PrintBC = () => {
    return (<PrintBC />);
  };
  render_Business1 = () => {
    return (<Business1 />);
  };

  render_Business2 = () => {
    return (<Business2 />);
  };

  render_Business3 = () => {
    return (<Business3 />);
  };
  show_button = () => {
    if (this.state.page === 1) {
      return this.render_Committee();
    } else if (this.state.page === 2) {
      return this.render_Committee1 ();
    } else if (this.state.page === 3) {
      return this.render_Committee2();
    }else if (this.state.page === 4) {
      return this.render_Committee3();   
    } else if (this.state.page === 5) {
      return this.render_Police1();
    } else if (this.state.page === 6) {
      return this.render_Police2();
    } else if (this.state.page === 7) {
      return this.render_Police3();
    } else if (this.state.page === 8) {
      return this.render_School1(); 
    } else if (this.state.page === 9) {
      return this.render_School2(); 
    } else if (this.state.page === 10) {
      return this.render_Citizen1();
    } else if (this.state.page === 11) {
      return this.render_Citizen2();
    } else if (this.state.page === 12) {
      return this.render_Citizen3();
    } else if (this.state.page === 13) {
      return this.render_Citizen4();
    } else if (this.state.page === 14) {
      return this.render_PrintBC();
    } else if (this.state.page === 15) {
      return this.render_Business1();
    } else if (this.state.page === 16) {
      return this.render_Business2();
    } else if (this.state.page === 17) {
      return this.render_Business3();
    }        
  };

  button_click_1 = () => {
    this.setState({ page: 1 });
  };

  button_click_2 = () => {
    this.setState({ page: 2 });
  };

  button_click_3 = () => {
    this.setState({ page: 3 });
  };
  button_click_4 = () => {
    this.setState({ page: 4 });
  };
  button_click_5 = () => {
    this.setState({ page: 5 });
  };
  button_click_6 = () => {
    this.setState({ page: 6 });
  };
  button_click_7 = () => {
    this.setState({ page: 7 });
  };
  button_click_8 = () => {
    this.setState({ page: 8 });
  };
  button_click_9 = () => {
    this.setState({ page: 9 });
  };
  button_click_10 = () => {
    this.setState({ page: 10 });
  };

  button_click_11 = () => {
    this.setState({ page: 11 });
  };

  button_click_12 = () => {
    this.setState({ page: 12 });
  };

  button_click_13 = () => {
    this.setState({ page: 13 });
  };

  button_click_14 = () => {
    this.setState({ page: 14 });
  };

  button_click_15 = () => {
    this.setState({ page: 15 });
  };

  button_click_16 = () => {
    this.setState({ page: 16 });
  };

  button_click_17 = () => {
    this.setState({ page: 17 });
  };

  render() {
    return (
        <MuiThemeProvider>
        <div>
          <div className="Header">
            <nav className="navbar navbar-expand navbar-dark bg-img static-top">
              <a className="navbar-brand mr-1" href="index.html"><i className="fa fa-firefox" aria-hidden="true"></i>HỆ THỐNG QUẢN LÝ THÔNG TIN CÔNG DÂN</a>
            </nav>
          </div>
          <div id="navbar1">
            <a href="#home"></a>            
          </div>
          <div id="wrapper" className="backgr-img">
            <ul className="sidebar navbar-nav">
              <div className="VerticalHome">
                <span>DANH MỤC</span>
              </div>
              
              <li className="nav-item active">              
                  <div className="dropdown nav-link">
                    <button className="dropbtn">
                      <span><i className="fa fa-university" aria-hidden="true"></i> Ủy ban</span></button>
                      <div className="dropdown-content">
                        <a href="#" onClick={() => this.button_click_1()}> Đăng ký Công dân</a>                                          
                        <a href="#" onClick={() => this.button_click_2()}> Đăng ký Cảnh sát</a>
                        <a href="#" onClick={() => this.button_click_3()}> Đăng ký Trường học</a>                                                
                        <a href="#" onClick={() => this.button_click_4()}> Đăng ký Doanh nghiệp</a> 
                         <a href="#" onClick={() => this.button_click_14()}> In thông tin công dân</a>                                                
                      </div>
                  </div>                
              </li>              
              <li className="nav-item active">
                  <div className="dropdown nav-link">
                    <button className="dropbtn">
                      <span><i className="fa fa-reddit" aria-hidden="true"></i> Cảnh sát</span></button>
                      <div className="dropdown-content">
                        <a href="#" onClick={() => this.button_click_5()}> Thêm Hộ chiếu</a>
                        <a href="#" onClick={() => this.button_click_6()}> Cập nhật Hộ chiếu</a>   
                        <a href="#" onClick={() => this.button_click_7()}> Xóa Hộ chiếu</a>                
                      </div>
                  </div>                   
              </li>
              <li className="nav-item active">
                <div className="dropdown nav-link">
                  <button className="dropbtn">
                    <span><i className="fa fa-book" aria-hidden="true"></i> Trường học</span></button>
                    <div className="dropdown-content">
                        <a href="#" onClick={() => this.button_click_8()}> Thông tin Sinh viên</a>
                        <a href="#" onClick={() => this.button_click_9()}> Thông tin bằng cấp</a>   
                    </div>
                </div>   
              </li>                     
              
              <li className="nav-item active">
                <div className="dropdown nav-link">
                  <button className="dropbtn">
                    <span><i className="fa fa-building" aria-hidden="true"></i> Doanh nghiệp</span></button>
                    <div className="dropdown-content">
                      <a href="#" onClick={() => this.button_click_15()}> Thêm Nhân viên</a>
                      <a href="#" onClick={() => this.button_click_16()}> Cập nhật Nhân viên</a>   
                      <a href="#" onClick={() => this.button_click_17()}> Xem thông tin Nhân viên</a>                
                    </div>
                </div>                        
              </li>
              <li className="nav-item active">
                <div className="dropdown nav-link">
                <button className="dropbtn">
                    <span><i className="fa fa-user" aria-hidden="true"></i> Công dân</span></button>
                    <div className="dropdown-content">
                      <a href="#" onClick={() => this.button_click_10()}> Xem thông tin Công dân</a>
                      <a href="#" onClick={() => this.button_click_11()}> Xem thông tin Hộ chiếu</a>   
                      <a href="#" onClick={() => this.button_click_12()}> Xem thông tin Sinh viên</a>    
                      <a href="#" onClick={() => this.button_click_13()}> Xem thông tin Nhân viên</a>       
                    </div>
                </div>
              </li>
            </ul>            
            <div id="content-wrapper">
              <div className="container-fluid">
                {/* Breadcrumbs*/}
                {this.show_button()}
              </div>
            </div>
          </div>
        </div>       
      </MuiThemeProvider>
    );
  }
}

export default App;
