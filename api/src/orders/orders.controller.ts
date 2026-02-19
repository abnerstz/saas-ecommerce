import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserRole } from '../common/types';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderFilterDto } from './dto/order-filter.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Criar pedido' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser('id') userId: string
  ) {
    return this.ordersService.create(createOrderDto, userId);
  }

  @ApiOperation({ summary: 'Listar pedidos (Admin/Manager)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN, UserRole.MANAGER)
  @Get()
  findAll(@Query() filters: OrderFilterDto) {
    return this.ordersService.findAll(filters);
  }

  @ApiOperation({ summary: 'Listar meus pedidos' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('my-orders')
  findMyOrders(
    @CurrentUser('id') userId: string,
    @Query() filters: OrderFilterDto
  ) {
    return this.ordersService.findByUser(userId, filters);
  }

  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.findOne(id, user);
  }

  @ApiOperation({ summary: 'Atualizar status do pedido' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SUPER_ADMIN, UserRole.TENANT_ADMIN, UserRole.MANAGER)
  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, updateStatusDto);
  }

  @ApiOperation({ summary: 'Cancelar pedido' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id/cancel')
  cancel(@Param('id') id: string, @CurrentUser() user: any) {
    return this.ordersService.cancel(id, user);
  }
}
