import { Body, Controller, Delete, Get, HttpException, HttpStatus, Inject, Param, Patch, Post, Query, UploadedFile, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from './dto/sign-up.dto';
import { LoginDto } from './dto/login.dto';
import { lastValueFrom } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { AddFoodDto } from './dto/add-food.dto';
import { AuthGuard } from '@nestjs/passport';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(process.env.IDENTITY_NAME) private identifyService: ClientProxy,
    @Inject(process.env.NOTIFICATION_NAME) private notificationService: ClientProxy,
    @Inject(process.env.PAYMENT_NAME) private paymentService: ClientProxy,
    @Inject(process.env.PRODUCT_NAME) private productService: ClientProxy,
  ) { }

  // check heath
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // auth
  @ApiTags("Auth")
  @Post("auth/sign-up")
  @ApiOperation({ summary: 'dang ky' })
  async signUp(
    @Body() body: SignUpDto,
  ) {
    try {
      // return this.authService.signUp(body)
      return await lastValueFrom(this.identifyService.send("sign_up", body));
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiTags("Auth")
  @Post("auth/login")
  @ApiOperation({ summary: 'dang nhap' })
  async login(
    @Body() body: LoginDto,
  ) {
    try {
      return await lastValueFrom(this.identifyService.send("login", body));
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // user
  @ApiTags("User")
  @Get('users')
  @ApiOperation({ summary: 'get all user' })
  async findAll() {
    try {
      return await lastValueFrom(this.identifyService.send("users_findAll", ''));
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiTags("User")
  @ApiOperation({ summary: 'sua user' })
  @Patch('users/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await lastValueFrom(this.identifyService.send("users_update", {
        id, updateUserDto
      }));
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  @ApiTags("User")
  @Delete('users/:id')
  @ApiOperation({ summary: 'del user' })
  async remove(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.identifyService.send("users_del", id));
    } catch (error) {
      throw new HttpException("Error", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // categories
  @ApiTags("Categories")
  @Get('categories')
  async findAllCategories() {
    try {
      return await lastValueFrom(this.identifyService.send("categories_findAllCategories", ""));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags("Categories")
  @Post("categories")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
      },
    },
  })
  async createCategorie(@Body() body: { name: string }) {
    try {
      return await lastValueFrom(this.identifyService.send("categories_createCategorie", body.name));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags("Categories")
  @Delete("categories")
  async delCategorie(@Query("id") id: string) {
    try {
      return await lastValueFrom(this.identifyService.send("categories_delCategorie", id));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // restaurants
  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Tao cua hang' })
  @ApiResponse({ status: 400, description: 'Yêu cầu không hợp lệ.' })
  @Post("restaurants")
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
  ) {
    try {
      return await lastValueFrom(this.productService.send("restaurants_create", createRestaurantDto));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Lay ds cua hang' })
  @Get('restaurants')
  async restaurantsFindAll() {
    try {
      return await lastValueFrom(this.productService.send("restaurants_findAll", ""));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Chi tiet cua hang' })
  @Get('restaurants/:id')
  async restaurantsFindOne(@Param('id') id: string) {
    try {
      return await lastValueFrom(this.productService.send("restaurants_findOne", id));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'Lay ds cua hang (phan trang) theo danh muc' })
  @Get("restaurants/categories/foods")
  async getRestaurantsOfCategories(
    @Query("categorie") categorie: string,
    @Query("page") page: string = "1",
    @Query("size") size: string = "9",
    @Query("query") query: string
  ) {
    try {
      return await lastValueFrom(this.productService.send("categories_foods", {
        categorie,
        page: +page,
        size: +size,
        query
      }));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Restaurants')
  @ApiOperation({ summary: 'del Restaurants' })
  @Delete("/categories/foods")
  async delRestaurants(
    @Query("id") id: string
  ) {
    try {
      return await lastValueFrom(this.productService.send("delRestaurants", id));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Foods
  @ApiTags('Foods')
  @ApiOperation({ summary: 'Them food vao restaurant' })
  @ApiConsumes('multipart/form-data')
  @Post("foods")
  async addFoodToRestaurant(
    @Body() addFoodsToRestaurantDto: AddFoodDto,
  ) {
    try {
      return await lastValueFrom(this.productService.send("addFoodToRestaurant", addFoodsToRestaurantDto));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Foods')
  @Get('foods')
  @ApiOperation({ summary: "Get all foods" })
  async getAllFoods() {
    try {
      return await lastValueFrom(this.productService.send("foods_get", ''));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiTags('Foods')
  @Delete("foods")
  @ApiOperation({ summary: "del foods" })
  async delFoods(@Query("id") id: string) {
    try {
      return await lastValueFrom(this.productService.send("foods_del", id));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //Payment - JWT
  @ApiBearerAuth()
  @ApiTags('Payment')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Tao don hang' })
  @Post('payment')
  async createOrders(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      // await lastValueFrom(this.notificationService.send("confirm_order", ''));
      let result = await lastValueFrom(this.paymentService.send("payment_createOrders", createPaymentDto));
      if (result) {
        // await lastValueFrom(this.notificationService.send("success_order", ''));
      }
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiTags('Payment')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'tat ca don hang' })
  @Get("payment/order")
  async getAllOrder() {
    try {
      return await lastValueFrom(this.paymentService.send("payment_getAllOrder", ''));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiTags('Payment')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'chi tiet don hang' })
  @Get("payment/orderDetail")
  async getOrderDetail(@Query('id') id: string) {
    try {
      return await lastValueFrom(this.paymentService.send("payment_getOrderDetail", id));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth()
  @ApiTags('Payment')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'del don hang' })
  @Delete("payment/order")
  async delOrder(@Query('id') id: string) {
    try {
      return await lastValueFrom(this.paymentService.send("payment_delOrder", id));
    } catch (error) {
      throw new HttpException("Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
