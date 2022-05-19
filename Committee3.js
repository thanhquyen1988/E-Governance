import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import { ABI } from "./ABI.js";
import ipfs from "./ipfs";


class Committee3 extends Component {
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
      fields1: {Address:'', Name: '', Information:'', AES:'', AES_KEY_Cipher:'', AES_KEY_Cipher_2:''},
      fields2:'',
      fields3:'',
      errors: {},
      errors1: {},
      errors2: {},
      account: '',
      JSON1: {},
      JSON2: {},
      options: '',
      options2: '',
      loading: true,
      buffer: null,
      contract: null,
      ipfsHash: '',
      transactionHash: '',
      page: 1,
      hasError: false,
      Sender_Private_Key:'',
      Receiver_Public_Key:'',
      ct: '{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name" ...........,"type":"event"}'
    }

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.submituserRegistrationForm1 = this.submituserRegistrationForm1.bind(this);    
    //this.submituserRegistrationForm1 = this.submituserRegistrationForm2.bind(this); 
   // this.submituserRegistrationForm1 = this.submituserRegistrationForm3.bind(this);  
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
///////////////////////////////////////////////////
validateForm1() {

  let fields1 = this.state.fields1;
  let errors = {};
  let formIsValid = true;

  if (!fields1["Address"]) {
    formIsValid = false;
    errors["Address"] = "*Vui lòng nhập Tài khoản!";
  }

  if (typeof fields1["Address"] !== "undefined") {
    if (!fields1["Address"].match(/^[a-fxA-F0-9]*$/)) {
      formIsValid = false;
      errors["Address"] = "*Vui lòng nhập Tài khoản!";
    }
  }

  if (!fields1["Information"]) {
    formIsValid = false;
    errors["Information"] = "*Vui lòng nhập Thông tin!";
  }

  if (!fields1["Name"]) {
    formIsValid = false;
    errors["Name"] = "*Vui lòng nhập Tên trường!";
  }

  this.setState({
    errors: errors
  });
  return formIsValid;
}


validateForm2() {

  let fields2 = this.state.fields2;
  let errors = {};
  let formIsValid = true;

  if (!fields2["Address"]) {
    formIsValid = false;
    errors["Address"] = "*Vui lòng nhập Tài khoản!";
  }

  if (typeof fields2["Address"] !== "undefined") {
    if (!fields2["Address"].match(/^[a-fxA-F0-9]*$/)) {
      formIsValid = false;
      errors["Address"] = "*Vui lòng nhập Tài khoản!";
    }
  }

  if (!fields2["Information"]) {
    formIsValid = false;
    errors["Information"] = "*Vui lòng nhập Thông tin!";
  }

  this.setState({
    errors: errors
  });
  return formIsValid;
}


validateForm3() {

  let fields3 = this.state.fields3;
  let errors = {};
  let formIsValid = true;

  if (!fields3["Address"]) {
    formIsValid = false;
    errors["Address"] = "*Vui lòng nhập Tài khoản!";
  }

  if (typeof fields3["Address"] !== "undefined") {
    if (!fields3["Address"].match(/^[a-fxA-F0-9]*$/)) {
      formIsValid = false;
      errors["Address"] = "*Vui lòng nhập Tài khoản!";
    }
  }

  if (!fields3["Information"]) {
    formIsValid = false;
    errors["Information"] = "*Vui lòng nhập Thông tin!";
  }

  this.setState({
    errors: errors
  });
  return formIsValid;
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
}
//////////////////////////////////////////////////////////
  handleChange1(e) {
    let fields1 = this.state.fields1;
    fields1[e.target.name] = e.target.value;
    this.setState({
      fields1
    });

  }

  handleChange2(e) {
    let fields2 = this.state.fields2;
    fields2[e.target.name] = e.target.value;
    this.setState({
      fields2
    });

  }

  handleChange3(e) {
    let fields3 = this.state.fields3;
    fields3[e.target.name] = e.target.value;
    this.setState({
      fields3
    });

  }
  ///// 
  async submituserRegistrationForm1(e) {
    e.preventDefault();
    //Verify input data

    if (this.validateForm1()) {
        let fields = {};
        let fields1 = {};
        fields["Address"] = "";
        fields["Name"] = "";
        fields["Information"] = "";
        fields["AES"] = "";
        this.setState({ fields1 : fields });

  
      var CryptoJS = require("crypto-js");
      var NodeRSA = require('node-rsa');

      //1. Generate Random AES256 Key
      //var key = 'abcdabcdabcdabcdabcdabcdabcdabcd'; //Key nay la 1 cai textbox de chi nhap vao
      var key = this.state.fields1.AES;
      
      //2. Sign AES Key with Sender Private Key
    
    // Người gửi khởi tạo cặp khóa Public và Private của thuật toán RSA
      
      const key2 = this.state.Sender_Private_Key.toString();
      console.log("Key RSA!!!!!!!: ",key2);
      const Sender_Private_Key = new NodeRSA(key2); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
      console.log("Sender Private Key!!!!!!!: ",Sender_Private_Key);

      console.log("Key AES!!!!!!!: ",key);
      fields1["AES_KEY_Cipher"] = Sender_Private_Key.sign(key, 'base64', 'utf8');//
      console.log("AES_KEY_Cipher!!!!!!!: ", fields1["AES_KEY_Cipher"]);

      //3. Encrypt Data with AES Key
      
      fields1["Address"] = this.state.fields1.Address;

      var Name = CryptoJS.AES.encrypt(this.state.fields1.Name, key).toString(); //=>Day la lúc update lai đúng
      fields1["Name"] = Name;  
      
      var Information = CryptoJS.AES.encrypt(this.state.fields1.Information, key).toString(); //=>Day la lúc update lai đúng
      fields1["Information"] = Information;  

      console.log("Day la EOA: "+fields1.Address);
      console.log("Day la thong tin Business: "+fields1.Information);
     
      //4. Encrypt AES Key With Receiver Public Key
      const key3 = this.state.Receiver_Public_Key.toString();
      console.log("Receiver Public Key RSA!!!!!!!: ",key3);
      const Receiver_Public_Key = new NodeRSA(key3); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
      console.log("Receiver Public Key!!!!!!!: ",Receiver_Public_Key);

	  
      fields1["AES_KEY_Cipher_2"] = 	Receiver_Public_Key.encrypt(key, 'base64');		
      console.log('*****Encrypted AES Key for Receiver: '+ fields1.AES_KEY_Cipher_2);
      console.log('*****Signed AES Key: '+ fields1.AES_KEY_Cipher);

      //Parse data to JSON
      const str = await JSON.stringify(fields1)
      console.log('Step 1: JSON is', str)
      this.setState({JSON1: JSON.parse(str) })
      const buf = await Buffer.from(str)
      console.log('Buffer', buf)
      const Address = await this.state.JSON1.Address
      console.log('Address', Address)
      var self = this;
      //Download file JSON from IPFS
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
          this.state.contract.methods.Them_DoanhNghiep(Address, result[0].hash, result[0].hash).send({
            from: this.state.account,
            gas: 3000000
          }, (error, transactionHash) => {
            alert(" Thêm Doanh nghiệp thành công!");
          this.setState({ transactionHash });
          }).then((r) => {
            return this.setState({ ipfsHash: result[0].hash })
            console.log('ipfsHash:', this.state.ipfsHash)
          });    
        })
      }    
  }

  /*
  async submituserRegistrationForm2(e) {
    e.preventDefault();
    //Verify input data

    if (this.validateForm1()) {
        let fields = {};
        fields["Address"] = "";
        fields["Information"] = "";
        this.setState({ fields : fields });
        console.log("Running Account "+this.state.account);
        //Store into Blockchain by SmartContract
        this.state.contract.methods.Update_Police_Information(this.state.fields.Address, this.state.fields.Information).send({
          from: this.state.account,
          gas: 3000000
        }, (error, transactionHash) => {
          alert("Police Registration is successful!");
          this.setState({ transactionHash });
        })
      }
    
  }

  async submituserRegistrationForm3(e) {
    e.preventDefault();
    //Verify input data

    if (this.validateForm1()) {
        let fields = {};
        fields["Address"] = "";
        fields["Information"] = "";
        this.setState({ fields : fields });
        console.log("Running Account "+this.state.account);
        //Store into Blockchain by SmartContract
        this.state.contract.methods.Get_Police_Infomation_from_Committee(this.state.fields1.Address, this.state.fields1.Information).send({
          from: this.state.account,
          gas: 3000000
        }, (error, transactionHash) => {
          alert("Police Registration is successful!");
          this.setState({ transactionHash });
        })
      }
    
  }*/
  render() {
    return (<div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item" style={{fontSize: 25,fontWeight:"bold", color: "blue"}}>
        Ủy ban (Quản lý thông tin Doanh nghiệp)
        </li>
                <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#EEE8AA",border: "1px solid #EEE8AA"}}  value={"Tài khoản đăng nhập: "+this.state.account} disabled></input>
              </ol>
              <div className="Commitee1">
                <span className="md-headline" align="center"  > Đăng ký Doanh nghiệp</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm1}>
                <div className="form-input">
                    <label htmlFor="first_name" className="required"> Tài khoản Doanh nghiệp</label>
                    <input type="text" name="Address" value={this.state.fields1.Address} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Address}</div>                
                  </div>
                  <div className="form-input">                    
                    <label htmlFor="first_name" className="required"> Tên Doanh nghiệp</label>
                    <input type="text" name="Name" value={this.state.fields1.Name} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Name}</div>
                  </div>
                  <div className="form-input">                    
                    <label htmlFor="first_name" className="required"> Thông tin Doanh nghiệp</label>
                    <input type="text" name="Information" value={this.state.fields1.Information} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Information}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa AES</label>
                    <input type="text" name="AES" value={this.state.fields1.AES} onChange={this.handleChange1} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.AES}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa bí mật của Ủy ban</label>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa công khai của Doanh nghiệp</label>
                    <input type="file" onChange={(e) => this.showFile2(e)} />
                  </div>
                  <div className="form-submit">
                    <input type="submit" value="Đăng ký" className="submit" id="submit" name="submit" />               
                  </div>
                </form>
              </div>         

              
    </div>);
  };

} 
export default Committee3;
