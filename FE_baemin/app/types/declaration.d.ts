// types/declaration.d.ts
declare global {
    type Category = {
      id: string;
      name: string;
      foods?: Food[];
    };
  
    type Food = {
      id: string;
      name: string;
      description?: string;
      price: number;
      img?: string;
      stock: number;
      restaurant_id?: string;
      category_id?: string;
      categories: Category;
      restaurants?: Restaurant;
      order_food: OrderFood[];
    };
  
    type OrderFood = {
      order_id: string;
      food_id: string;
      quantity: number;
      foods: Food;
      orders: Order;
    };
  
    type Order = {
      id: string;
      user_id?: string;
      total_price: number;
      order_date: Date;
      order_food: OrderFood[];
      users?: User;
    };
  
    type Restaurant = {
      id: string;
      name: string;
      address?: string;
      img: string;
      foods: Food[];
    };
  
    type User = {
      id: string;
      firstname: string;
      lastname: string;
      username: string;
      phonenumber: string;
      email: string;
      password: string;
      orders: Order[];
    };
  
    type CustomRestaurant = {
      currentPage: number
      data: Restaurant[]
      size: number
      totalCount: number
      totalPages: number
    }
  }
  
  export { };
  