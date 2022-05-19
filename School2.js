import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import { ABI } from "./ABI.js";
import ipfs from "./ipfs";



class School2 extends Component {
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
          fields1: {Student_Code: '', Graduation_year:'', Certificate_Code:'', AES:'', AES_KEY_Cipher:'', AES_KEY_Cipher_2:''},
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
          Sender_Private_Key:'',
          Sender_Public_Key:'',
          Receiver_Public_Key:'',
          Receiver_Private_Key:'',
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

      //////////////////////////////////////////////////////////
      
      handleChange1(e) {
        let fields1 = this.state.fields1;
        fields1[e.target.name] = e.target.value;
        this.setState({
          fields1
        });
      
      }
      
    
      validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
      
        if (!fields["Student_Code"]) {
          formIsValid = false;
          errors["Student_Code"] = "*Vui lòng nhập Mã sinh viên!";
        }
      
        if (typeof fields["Student_Code"] !== "undefined") {
          if (!fields["Student_Code"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors["Student_Code"] = "*Vui lòng nhập Mã sinh viên!";
          }
        }      
    
        this.setState({
          errors: errors
        });
        return formIsValid;
      }

      validateForm1() {

        let fields1 = this.state.fields1;
        let errors1 = {};
        let formIsValid = true;
      
        if (!fields1["Certificate_Code"]) {
          formIsValid = false;
          errors1["Certificate_Code"] = "*Vui lòng nhập Mã bằng cấp!";
        }
      
        if (typeof fields1["Certificate_Code"] !== "undefined") {
          if (!fields1["Certificate_Code"].match(/^[0-9]*$/)) {
            formIsValid = false;
            errors1["Certificate_Code"] = "*Vui lòng nhập Mã bằng cấp!";
          }
        }
           
        if (!fields1["Graduation_year"]) {
          formIsValid = false;
          errors1["Graduation_year"] = "*Vui lòng nhập Năm tốt nghiệp!";
        }
      
        if (!fields1["AES"]) {
          formIsValid = false;
          errors1["AES"] = "*Vui lòng nhập AES!";
        }
      
        this.setState({
          errors1: errors1
        });
        return formIsValid;
      }
           
      
        /////////////////////////////
  
      async submituserRegistrationForm(e) {
        e.preventDefault();
        //Verify input data
      
        if (this.validateForm()){ 
          let fields = {};
          fields["Student_Code"] = "";
          this.setState({ fields });
        
           //Store into Blockchain by SmartContract
          var str= this.state.fields.Student_Code
          this.state.fields["Student_Code"] = str.substring(0, 16)
  
          console.log("Test FP "+this.state.fields.Student_Code);
          var EOA_Owner = await this.state.contract.methods.Xem_SinhVien(this.state.fields.Student_Code).call().then(function(result) {
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
          const Receiver_Private_Key = new NodeRSA(key2); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
          console.log("Receiver Private Key!!!!!!!: ",Receiver_Private_Key);
  
          const key3 = this.state.Sender_Public_Key.toString();
          console.log("Key RSA!!!!!!!: ",key3);
          const Sender_Public_Key = new NodeRSA(key3); // Chỗ này nó chưa nhận dc key2. Chị tìm cách bất đồng bộ sau cho key2 phải có giá trị trước cái lệnh này
          console.log("Sender Public Key!!!!!!!: ",Sender_Public_Key);
  
  
  
          /// Read file từ IPFS 
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
      
            console.log("Day la ma sinh vien: "+json.Student_Code); // 'my message'
            console.log("Day la ten chua giai ma: "+json.Name); // can duoc giai ma
            console.log("Day la ngay sinh chua giai ma: "+json.Birthday); // 'my message'
            console.log("Day la ngay bat dau: "+json.Start_Date); // can duoc giai ma
            console.log("Day la chuyen nganh chua giai ma: "+json.Specialized);
  
            var bytes  = CryptoJS.AES.decrypt(json.Name, key);
            var Name = bytes.toString(CryptoJS.enc.Utf8);
            
            var bytes  = CryptoJS.AES.decrypt(json.Specialized, key);
            var Specialized = bytes.toString(CryptoJS.enc.Utf8);

           
            console.log("Day la ten giai ma: "+Name); // 'my message'
            console.log("Day la ngay sinh giai ma: "+json.Birthday); // 'my message'
            console.log("Day la chuyen nganh giai ma: "+Specialized); // 'my message'


  
            self.setState({EOA_Owner1: json.Student_Code})
            self.setState({EOA_Owner2: Name})
            self.setState({EOA_Owner3: json.Birthday})
            self.setState({EOA_Owner4: json.Start_Date})
            self.setState({EOA_Owner5: Specialized})
        
            }  else {
              console.log("Do not thing!")
              alert("The AES_Key_Check/FP is False");
              self.setState({EOA_Owner1:""})
              self.setState({EOA_Owner2: ""})
              self.setState({EOA_Owner3: ""})
              self.setState({EOA_Owner4: ""})
              self.setState({EOA_Owner5: ""})
            
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
      fields["Student_Code"] = "";
      fields["Certificate_Code"] = "";
      fields["Graduation_year"] = "";
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
    
    fields1["Student_Code"] = this.state.EOA_Owner1;
    fields1["Certificate_Code"] = this.state.fields1.Certificate_Code;
    fields1["Graduation_year"] = this.state.fields1.Graduation_year;
    fields1["Birthday"] = this.state.EOA_Owner3;


    var Name = CryptoJS.AES.encrypt(this.state.EOA_Owner2, key).toString(); //=>Day la lúc update lai đúng
    fields1["Name"] = Name;      
    var Specialized = CryptoJS.AES.encrypt(this.state.EOA_Owner5, key).toString(); //=>Day la lúc update lai đúng
    fields1["Specialized"] = Specialized;    

   
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

    const Certificate_Code = await this.state.JSON1.Certificate_Code
    console.log('Certificate_Code', Certificate_Code)

    const Student_Code = await this.state.JSON1.Student_Code
    console.log('Student_Code', Student_Code)

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
        this.state.contract.methods.Them_BangCap(Student_Code, Certificate_Code, result[0].hash).send({
          from: this.state.account,
          gas: 3000000
        }, (error, transactionHash) => {
          alert(" Thêm Bằng cấp thành công!");
        this.setState({ transactionHash });
        }).then((r) => {
          return this.setState({ ipfsHash: result[0].hash })
          console.log('ipfsHash:', this.state.ipfsHash)
        });    
      })
    }    
}
////////////////////////////////////////////////////////////////////////////


openForm() {
  document.getElementById("myForm").style.display = "block";
}

closeForm() {
  document.getElementById("myForm").style.display = "none";
}
/////////////////////////////////////
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


//////////////////////////////////////////

    render() {
    return (<div>
      <ol className="breadcrumb">
      <li className="breadcrumb-item" style={{fontSize: 25,fontWeight:"bold", color: "blue"}}>
      Trường học
      </li>
        <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#EEE8AA",border: "1px solid #EEE8AA"}}  value={"Tài khoản đăng nhập: "+this.state.account} disabled></input>
      </ol>

        <div className="Police1">
                <span className="md-headline" align="center"  > Thông tin Sinh viên</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm}>

                  <div className="form-input">
                    <label htmlFor="first_name" className="required"> Mã Sinh viên</label>
                    <input type="text" name="Student_Code" value={this.state.fields.Student_Code} onChange={this.handleChange} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors.Student_Code}</div>                
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa bí mật của Công dân</label>
                    <input type="file" onChange={(e) => this.showFile(e)} />
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa công khai của Trường</label>
                    <input type="file" onChange={(e) => this.showFile2(e)} />
                  </div>

                  <div className="form-submit">
                    <input type="submit" value="Xem" className="submit" id="submit" name="submit" />                                      
                  </div>     

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Mã Sinh viên</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner1} disabled></input>
                  </div>
                  

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Họ và tên</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner2} disabled></input>
                  </div>  

                   <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ngày sinh</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner3} disabled></input>
                  </div>    
                                  

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ngày vào học</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner4} disabled></input>
                  </div>
                  

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Chuyên ngành</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner5} disabled></input>
                  </div>
                                          
                </form>                
        </div>

      <div className="Police2">
                <span className="md-headline" align="center"  > Thêm Bằng cấp</span>
                <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm1}>
                  <div className="form-input">
                    <label htmlFor="first_name" className="required"> Mã Sinh viên</label>
                    <input type="text" name="Fingter_Print" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}} value={this.state.EOA_Owner1} onChange={this.handleChange1} disabled></input>
                  </div>
                  
                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Họ và tên</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner2} disabled></input>
                  </div>
                  

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Ngày sinh</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner3} disabled></input>
                  </div>

                  <div className="form-input">
                    <label htmlFor="company" className="fa fa-user" aria-hidden="true" style={{fontWeight:"bold",color: "black"}}> Chuyên ngành</label>
                    <input type="text" name="account" style={{fontWeight:"bold",width:"100%",backgroundColor:"#F0F8FF",border: "1px solid #191970", color: "purple"}}  value={this.state.EOA_Owner5} disabled></input>
                  </div>
                
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Mã Bằng cấp</label>
                    <input type="text" name="Certificate_Code" value={this.state.fields1.Certificate_Code} onChange={this.handleChange1} ></input>
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.Certificate_Code}</div>                
                  </div>
                
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Năm tốt nghiệp</label>
                    <input type="date" name="Graduation_year" value={this.state.fields1.Graduation_year} onChange={this.handleChange1} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.Graduation_year}</div>
                  </div>           

                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa AES</label>
                    <input type="text" name="AES" value={this.state.fields1.AES} onChange={this.handleChange1} />
                    <div className="errorMsg" style={{ color: 'red' }}>{this.state.errors1.AES}</div>
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa bí mật của Trường</label>
                    <input type="file" onChange={(e) => this.showFile3(e)} />
                  </div>
                  <div className="form-input">
                    <label htmlFor="company" className="required"> Khóa công khai của Công dân</label>
                    <input type="file" onChange={(e) => this.showFile4(e)} />
                  </div>

                  <div className="form-submit">
                    <input type="submit" value="Thêm" className="submit" id="submit" name="submit" />                                      
                  </div>                       
                </form>
      </div>     
    </div>);
  };
}
export default School2;
