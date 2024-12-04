# BaeminApp_Microservice - Đặng Hoài Trọng

- Có upload `.env` `db_baemin.dump` `logstash.conf` đã config node-network 
- run BE: docker-compose up -d
- run FE:  cd ./FE_baemin
  docker build . -t fe-baemin
  docker run -d -p 3000:3000 --name fe-baemin --net node-network fe-baemin

## Tech
- Microservice with NestJS
- ELK stack 
- RabbitMQ
- Redis
- PostgresQL

## Service 
- api-gateway
- identity-service
- notification-service
- payment-service
- product-service

## Feature
- Đăng nhập, đăng ký, JWT
- Redis lưu cache categories, restaurants => tối ưu Get với cache
- ELK stack thu thập log các service vào index:service-logs-%{+YYYY.MM.dd}, đồng bộ Elastic table (restaurants, food) đã config trong logstash.conf
- Tìm kiếm với elasticsearch danh sách  restaurants theo categories ( phân trang, search (food.name, restaurant.name) ) 
- Xem chi tiết restaurants có foods (search, filter categories ,thêm món vào giỏ hàng) 
- Giỏ hàng có thể thêm nhiều food của nhiều restaurant thanh toán 1 lần 
- Thanh toán gửi email xác nhận sau đó tự trừ tồn kho và ra đơn orders và liên kết bằng order_food sau đó 10s sẽ gửi email giao hàng thành công

##  PostgreSQL Relation Table 
- `categories` - `foods`: 1-n (1 danh mục có nhiều món ăn).
- `restaurants` - `foods`: 1-n (1 nhà hàng có nhiều món ăn).
- `orders` - `order_food`: 1-n (1 đơn hàng có nhiều món ăn).
- `users` - `orders`: 1-n (1 người dùng có nhiều đơn hàng).
- `foods` - `order_food`: n-n (Nhiều món ăn có thể nằm trong nhiều đơn hàng).

## API: 
- **User**: login, đăng ký, CRUD user 	
- **Categories**: CRUD categories 
- **Restaurant**: CRUD restaurant 
  - Thêm món ăn vào nhà hàng 			
- **Foods**: CRUD foods 
- **Payment**: 
  - Auth JWT			
  - CRUD order
  - Tạo đơn hàng với món ăn của nhà hàng 
