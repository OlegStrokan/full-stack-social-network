import { Controller, Post, Body, Get, Param, UseGuards } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RoleModel } from "./models/role.model";
import { RolesGuard } from "../auth/guards/roles.guard";
import { Roles } from "../auth/decorators/role-auth.decorator";

@ApiTags("Roles functional")
@Controller("roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: "Create new role" })
  @ApiOkResponse({ status: 200, type: RoleModel })
  @UseGuards(RolesGuard)
  @Roles("admin")
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @ApiOperation({ summary: "Get role" })
  @ApiOkResponse({ status: 200, type: RoleModel })
  @UseGuards(RolesGuard)
  @Roles("admin")
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.roleService.getRoleByValue(value);
  }
  @ApiOperation({ summary: "Get roles" })
  @ApiOkResponse({ status: 200, type: [RoleModel] })
  @Roles("admin")
  @UseGuards(RolesGuard)
  @Get()
  getRoles() {
    return this.roleService.getRoles();
  }
}
