import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import { ABI } from "./ABI.js";
import ipfs from "./ipfs";



class Business1 extends Component {
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
          fields1: {Employee_Code:'',Position:'', Salary:'', AES:'', AES_KEY_Cipher:'', AES_KEY_Cipher_2:''},
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
          Sender_Private_Key:'',
          Sender_Public_Key:'',
          Receiver_Public_Key:'',
          Receiver_Private_Key:'',
          buffer1: null,
          page: 1,
          ct: '{"constant":false,"inputs":[{"name":"_address","type":"address"}],"name" ...........,"type":"event"}'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChange1 = this.handleChange1.bind(this);
      

        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        this.submituserRegistrationForm1 = this.submituserRegistrationForm1.bind(this);

        this.showFile = this.showFile.bind(this);
        this.showFile2 = this.showFile2.bind(this);
        this.showFile3 = this.showFile3.bind(this);
        this.showFile4 = this.showFile4.bind(this);

        
    };
    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
          fields
        });
      
      }
      ////////////////////////////////////////////////////////////////////////

    handleChange1(e) {
        let fields1 = this.state.fields1;
        fields1[e.target.name] = e.target.value;
        this.setState({
          fields1
        });
      
      }
      ////////////////////////////////////////////////////////////////////////
      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
      
        if (!fields["Certificate_Code"]) {
          formIsValid = false;
          errors["Certificate_Code"] = "*Vui l??ng nh???p M?? B???ng c???p!";
        }
      
        if (typeof fields["Certificate_Code"] !== "undefined") {
          if (!fields["Certificate_Code"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["Certificate_Code"] = "*Vui l??ng nh???p M?? b???ng c???p!";
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
      
        if (!fields1["Employee_Code"]) {
          formIsValid = false;
          errors1["Employee_Code"] = "*Vui l??ng nh???p M?? nh??n vi??n!";
        }
      
        if (typeof fields1["Employee_Code"] !== "undefined") {
          if (!fields1["Employee_Code"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors1["Employee_Code"] = "*Vui l??ng nh???p M?? nh??n vi??n!";
          }
        }

        if (!fields1["Position"]) {
          formIsValid = false;
          errors1["Position"] = "*Vui l??ng nh???p V??? tr??!";
        }

        if (!fields1["Salary"]) {
          formIsValid = false;
          errors1["Salary"] = "*Vui l??ng nh???p L????ng!";
        }
      
        if (typeof fields1["Salary"] !== "undefined") {
          if (!fields1["Salary"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors1["Salary"] = "*Vui l??ng nh???p L????ng!";
          }
        }
                
        if (!fields1["AES"]) {
          formIsValid = false;
          errors1["AES"] = "*Vui l??ng nh???p AES!";
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
      showFile3 = async (e) => {
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
      showFile4 = async (e) => {
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
////////////////////////////////////
  
      async submituserRegistrationForm(e) {
        e.preventDefault();
        //Verify input data
      
        if (this.validateForm()){ 
        let fields = {};
        fields["Certificate_Code"] = "";
        this.setState({ fields });
      
         //Store into Blockchain by SmartContract
        var str= this.state.fields.Certificate_Code
        this.state.fields1["Certificate_Code"] = str.substring(0, 16)

        console.log("Test FP "+this.state.fields.Certificate_Code);
        var EOA_Owner = await this.state.contract.methods.Xem_BangCap(this.state.fields.Certificate_Code).call().then(function(result) {
          return result;        
        })
        
                // Decrypt
        //Khi em doc  tu blockchain ra, du lieu se duoc ma hoa nguoc lai
        //Ten: U2FsdGVkX185H467mDCrmgqoksagYZ3y55p1oBgcGtw=
        //Que Quan: U2FsdGVkX1+JPeEf11/ZQCs9KpBKbDqOx1LA03xdhQw=
       // var key = 'abcdabcdabcdabcdabcdabcdabcdabcd'; //Key nay la 1 cai textbox de chi nhap vao

        var CryptoJS = require("crypto-js");
       	var NodeRSA = require('node-rsa');

        const key2 = this.state.Receiver_Private_Key.toString();
        console.log("Key RSA!!!!!!!: ",key2);
        const Receiver_Private_Key = new NodeRSA(key2); // Ch??? n??y n?? ch??a nh???n dc key2. Ch??? t??m c??ch b???t ?????ng b??? sau cho key2 ph???i c?? gi?? tr??? tr?????c c??i l???nh n??y
        console.log("Receiver Private Key!!!!!!!: ",Receiver_Private_Key);

        const key3 = this.state.Sender_Public_Key.toString();
        console.log("Key RSA!!!!!!!: ",key3);
        const Sender_Public_Key = new NodeRSA(key3); // Ch??? n??y n?? ch??a nh???n dc key2. Ch??? t??m c??ch b???t ?????ng b??? sau cho key2 ph???i c?? gi?? tr??? tr?????c c??i l???nh n??y
        console.log("Sender Public Key!!!!!!!: ",Sender_Public_Key);



        /// Read file t??? IPFS 
        let self = this;
        

        await ipfs.cat(EOA_Owner[0], function (err, file) {
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
    
          console.log("Day la ten chua duoc giai ma: "+json.Name); // 'my message'
          console.log("Day la ng??y sinh: "+json.Birthday); // 'my message'
          console.log("Day la nam tot nghiep: "+json.Graduation_year); // can duoc giai ma
          console.log("Day la chuyen nganh: "+json.Specialized); // can duoc giai ma

          var bytes  = CryptoJS.AES.decrypt(json.Name, key);
          var Name = bytes.toString(CryptoJS.enc.Utf8);
          
          bytes  = CryptoJS.AES.decrypt(json.Specialized, key);
          var Specialized = bytes.toString(CryptoJS.enc.Utf8);

      
          console.log("Day la ten da duoc giai ma: "+Name); // 'my message'
          console.log("Day la ngay sinh: "+json.Birthday); // 'my message'
          console.log("Day la nam tot nghiep: "+json.Graduation_year); // 'my message'
          console.log("Day la chuyen nganh da duoc giai ma: "+Specialized); // 'my message'

          self.setState({EOA_Owner0: json.Certificate_Code})
          self.setState({EOA_Owner1: Name})
          self.setState({EOA_Owner2: json.Birthday})
          self.setState({EOA_Owner3: json.Graduation_year})
          self.setState({EOA_Owner4: Specialized})
      
          }  else {
            console.log("Do not thing!")
            alert("The AES_Key_Check/FP is False");
            self.setState({EOA_Owner0:""})
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
    let fields = {};
    let fields1 = {};
    fields["Employee_Code"] = "";
    fields["Position"] = "";
    fields["Salary"] = "";
    fields["AES"] = "";
    this.setState({ fields1 : fields });
    console.log("Running Account "+this.state.account);


      var CryptoJS = require("crypto-js");
      var NodeRSA = require('node-rsa');

      //1. Generate Random AES256 Key
      var key = this.state.fields1.AES;
      
      //2. Sign AES Key with Sender Private Key
    
    // Ng?????i g???i kh???i t???o c???p kh??a Public v?? Private c???a thu???t to??n RSA
      
      const key2 = this.state.Sender_Private_Key.toString();
      console.log("Key RSA!!!!!!!: ",key2);
      const Sender_Private_Key = new NodeRSA(key2); // Ch??? n??y n?? ch??a nh???n dc key2. Ch??? t??m c??ch b???t ?????ng b??? sau cho key2 ph???i c?? gi?? tr??? tr?????c c??i l???nh n??y
      console.log("Sender Private Key!!!!!!!: ",Sender_Private_Key);

      console.log("Key AES!!!!!!!: ",key);
      fields1["AES_KEY_Cipher"] = Sender_Private_Key.sign(key, 'base64', 'utf8');//
      console.log("AES_KEY_Cipher!!!!!!!: ", fields1["AES_KEY_Cipher"]);

      //3. Encrypt Data with AES Key
      
      var Position = CryptoJS.AES.encrypt(this.state.fields1.Position, key).toString(); //=>Day la l??c update lai ????ng
      fields1["Position"] = Position;

      var Name = CryptoJS.AES.encrypt(this.state.EOA_Owner1, key).toString(); //=>Day la l??c update lai ????ng
      fields1["Name"] = Name;    
      
      var Salary = CryptoJS.AES.encrypt(this.state.fields1.Salary, key).toString(); //=>Day la l??c update lai ????ng
      fields1["Salary"] = Salary; 

      fields1["Employee_Code"] = this.state.fields1.Employee_Code;
      fields1["Birthday"] = this.state.EOA_Owner2; 
        
      //4. Encrypt AES Key With Receiver Public Key
      const key3 = this.state.Receiver_Public_Key.toString();
      console.log("Receiver Public Key RSA!!!!!!!: ",key3);
      const Receiver_Public_Key = new NodeRSA(key3); // Ch??? n??y n?? ch??a nh???n dc key2. Ch??? t??m c??ch b???t ?????ng b??? sau cho key2 ph???i c?? gi?? tr??? tr?????c c??i l???nh n??y
      console.log("Receiver Public Key!!!!!!!: ",Receiver_Public_Key);

	  
      fields1["AES_KEY_Cipher_2"] = 	Receiver_Public_Key.encrypt(key, 'base64');		
      console.log('*****Encrypted AES Key for Receiver: '+ fields1.AES_KEY_Cipher_2);
      console.log('*****Signed AES Key: '+ fields1.AES_KEY_Cipher);

      //Parse data to JSON
      const str = JSON.stringify(fields1)
      console.log('Step 1: JSON is', str)
      this.setState({JSON1: JSON.parse(str) })
      const buf =  Buffer.from(str)
      console.log('The Buffer', buf)

      const Employee_Code =  fields1.Employee_Code
      console.log('Employee_Code', Employee_Code)

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
      this.state.contract.methods.Them_NhanVien(this.state.EOA_Owner0, Employee_Code, result[0].hash).send({
        from: this.state.account,
        gas: 3000000
      }, (error, transactionHash) => {
        alert(" Th??m Nh??n Vi??n th??nh c??ng!");
      this.setState({ transactionHash });
      }).then((r) => {
        return this.setState({ ipfsHash: result[0].hash })
        console.log('ipfsHash:', this.state.ipfsHash)
      });    
    })
  }
}


//////////////////////////////////////////

    render() {
    return (<div>
      <ol className="breadcrumb">
      <li className="breadcrumb-item" style={{fontSize: 25,fontWeight:"bold", color: "blue"}}>
      Doanh nghi???p
      </li>
        <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#EEE8AA",border: "1px solid #EEE8AA"}}  value={"Login Account: "+this.state.account} disabled></input>
      </ol>

        <div className="Police1">
                <span className="md-headline" align="center"  > Th??ng tin B???ng c???p</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>
                  <div className="form-input">
                    <label htmlFor="first_name" className="required"> M?? B???ng c???p</label>
                    <input type="text" name="Certificate_Code" value={this.state.fields.Certificate_Code} onChange={this.handleChange} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Certificate_Code}</div>                
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Kh??a b?? m???t c???a c??ng d??n</label>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Kh??a c??ng khai c???a Tr?????ng h???c</label>
                    <input type="file" onChange={(e) => this.showFile2(e)} />
                  </div>

                  <div className="form-submit">
                    <input type="submit" value="Xem B???ng C???p" className="submit" id="submit" name="submit" />                                      
                  </div>              
                                  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> H??? v?? t??n</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner1} disabled></input>
                  </div>
                  

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ng??y sinh</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner2} disabled></input>
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ng??y t???t nghi???p</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner3} disabled></input>
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" class="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Chuy??n ng??nh</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner4} disabled></input>
                  </div>                          
                </form>                
        </div>

      <div className="Police2">
                <span className="md-headline" align="center"  > Th??m Nh??n vi??n</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm1}>
                  
                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> H??? v?? t??n</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner1} disabled></input>
                  </div>
                  

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ng??y sinh</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner2} disabled></input>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> M?? Nh??n vi??n</label>
                    <input type="text" name="Employee_Code" value={this.state.fields1.Employee_Code} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.Employee_Code}</div>                
                  </div>
                  
                  <div className="form-input">
                    <label htmlFor="company" className="required"> V??? tr??</label>
                    <input type="text" name="Position" value={this.state.fields1.Position} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.Position}</div>                
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> L????ng</label>
                    <input type="text" name="Salary" value={this.state.fields1.Salary} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.Salary}</div>                
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Kh??a AES</label>
                    <input type="text" name="AES" value={this.state.fields1.AES} onChange={this.handleChange1} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.AES}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Kh??a b?? m???t c???a doanh nghi???p</label>
                    <input type="file" onChange={(e) => this.showFile3(e)} />
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Kh??a c??ng khai c???a C??ng d??n</label>
                    <input type="file" onChange={(e) => this.showFile4(e)} /> 
                  </div>                 

                  <div className="form-submit">
                    <input type="submit" value="Th??m" className="submit" id="submit" name="submit" />                                      
                  </div>            
                   
                </form>
      </div>     
    </div>);
  };
}
export default Business1;
