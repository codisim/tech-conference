import { Role } from '@prisma/client';
import { CategoryService } from './category.service';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorators';
import { CreateCategoryDto } from './dto/create-category.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('categories')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    // create a category
    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: "Create a new category" })
    @ApiBody({ type: CreateCategoryDto })
    async createCategory(@Body() createCategory: CreateCategoryDto): Promise<void> {
        
    }
}
