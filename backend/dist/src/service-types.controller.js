"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypesController = void 0;
const common_1 = require("@nestjs/common");
const service_types_service_1 = require("./service-types.service");
let ServiceTypesController = class ServiceTypesController {
    serviceTypesService;
    constructor(serviceTypesService) {
        this.serviceTypesService = serviceTypesService;
    }
    findByOffice(officeId, search) {
        return this.serviceTypesService.findByOffice(officeId, search);
    }
    create(body) {
        return this.serviceTypesService.create({
            officeId: Number(body.officeId),
            workGroupId: Number(body.workGroupId),
            name: body.name,
            startBookingDate: new Date(body.startBookingDate),
            note: body.note,
            schedule: body.schedule,
        });
    }
    findOne(id) {
        return this.serviceTypesService.findOne(id);
    }
    update(id, body) {
        return this.serviceTypesService.update(id, {
            workGroupId: Number(body.workGroupId),
            name: body.name,
            startBookingDate: new Date(body.startBookingDate),
            note: body.note,
            schedule: body.schedule,
        });
    }
    delete(id) {
        return this.serviceTypesService.delete(id);
    }
};
exports.ServiceTypesController = ServiceTypesController;
__decorate([
    (0, common_1.Get)('office/:officeId'),
    __param(0, (0, common_1.Param)('officeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "findByOffice", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ServiceTypesController.prototype, "delete", null);
exports.ServiceTypesController = ServiceTypesController = __decorate([
    (0, common_1.Controller)('service-types'),
    __metadata("design:paramtypes", [service_types_service_1.ServiceTypesService])
], ServiceTypesController);
//# sourceMappingURL=service-types.controller.js.map