drop database if exists top_songsdb;
drop database if exists bamazon_db;
create database bamazon_db; 
use bamazon_db;

create table products (
itemId int auto_increment primary key,
productName varchar(100) not null,
departmentName varchar(100) not null,
price int not null,
stockQuantity int not null
);

insert into products (productName, departmentName, price, stockQuantity)
values ('All About Alpacas', 'literature', '10.00', '15'),
('Corgi Cushion', 'furniture/bedding', '15.50', '3'),
('Cat Onesie', 'clothing', '12.75', '22'),
('Spice Rack', 'kitchen', '25.00', '8'),
('Crock Pot', 'kitchen','30.00', '32'), 
('Cat Cave', 'pets', '10.00', '5'),
('Dog Bed', 'pets', '10.00', '5'),
('Garden Hose', 'gardening','45.00', '18'),
('Large Potting Planter', 'gardening', '20.00', '13'), 
('Small Potting Planter', 'gardening', '10.00', '20');


