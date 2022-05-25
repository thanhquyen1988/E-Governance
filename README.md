# E-Governance

### HƯỚNG DẪN CÀI ĐẶT HỆ THỐNG ###############
- Sử dụng Remix IDE để lập trình Smart Contract tại trang web: https://remix.ethereum.org/
- Cài đặt tiện ích Metamask để quản lý tài khoản tại: https://metamask.io
- Hệ thống E-Governance được tạo bởi [Create React App](https://github.com/facebook/create-react-app)

**## Cài đặt môi trường cho ReactJs ###**
1. React Developer Tool
2. NodeJS: 
Link cài đặt và hướng dẫn: https://nodejs.org/en/
Kiểm tra phiên bản: node –v và npm –v
Cú pháp cài đặt package: npm install [package-name] --save
3. Yarn: 
Cú pháp: npm install –g yarn
Cú pháp cài đặt package bằng yarn: yarn add [package-name]
4. Sublime Text 3: để lập trình ReactJS.
- Link cài đặt: https://www.sublimetext.com/3
Cài đặt package control cho Sublime Text 3.
Cài đặt các package cần thiết: 
+ Babel Snippets.
+ Emmet.
+ JSX/Babel Syntax Highlighting.

**#### Tạo một Project ####**

Cài đặt create-react-app: dùng để tự động hóa việc xây dựng project ReactJS mà không phải config.
Cài đặt bằng câu lệnh: 
npm install –g create-react-app
Tạo mới project: create-react-app [project-name]
Chạy project: cd [project-name] -> npm start
Sau khi chạy project, chỉnh sửa file App.js để xây dựng ứng dụng.

**##### Cài đặt dependencies ########**
- Web3.js là thư viện JavaScript chính để giao tiếp với chuỗi khối Ethereum. Nó sẽ có hiệu quả biến ứng dụng React của chúng ta thành một ứng dụng hỗ trợ blockchain. Chúng ta sẽ sử dụng Web3 để tương tác smart contract. Link: https://web3js.readthedocs.io/en/v1.2.6/web3-eth-contract.html
Cài đặt Web3.js bằng lệnh: npm install –save web3
- React Bootstrap là phiên bản React của Bootstrap framework. Nó sẽ cho phép chúng ta tạo giao diện người dùng tương tác phong phú mà không phải viết nhiều CSS. 
Link: https://getbootstrap.com/. 
Cài đặt Bootstrap bằng lệnh: npm install bootstrap

**######## QUY TRÌNH HOẠT ĐỘNG CỦA HỆ THỐNG ################**
Các bước triển khai hệ thống: 
- Bước 1: Chạy Smart Contract trên Remix IDE.
- Bước 2: Copy ABI và Smart Contract Address vào code ReactJs.
- Bước 3: Hệ thống hoạt động theo trình tự sau:
1. Committee đăng ký thông tin các đối tượng tham gia hệ thống: Citizen, Police, School, Business.
2. Police có thể tạo/chỉnh sửa/hủy passport cho citizen.
3. Shool đăng ký thông tin student cho citizen, cấp phát bằng cho citizen.
4. Business đăng ký thông tin employee cho citizen.
5. Citizen có thể tra cứu thông tin cá nhân, passport, student, employee.
