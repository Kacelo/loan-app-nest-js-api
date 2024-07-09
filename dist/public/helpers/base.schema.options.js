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
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyBaseSchemaOptions = exports.BaseSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let BaseSchema = class BaseSchema {
};
exports.BaseSchema = BaseSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], BaseSchema.prototype, "deleted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now, index: true }),
    __metadata("design:type", Date)
], BaseSchema.prototype, "createdAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: Date.now }),
    __metadata("design:type", Date)
], BaseSchema.prototype, "updatedAt", void 0);
exports.BaseSchema = BaseSchema = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], BaseSchema);
const applyBaseSchemaOptions = (schema) => {
    schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
    });
    schema.pre('findOneAndUpdate', function (next) {
        this.set({ updatedAt: new Date() });
        next();
    });
    schema.pre('updateMany', function (next) {
        this.set({ updatedAt: new Date() });
        next();
    });
    schema.set('timestamps', true);
    schema.set('toJSON', {
        virtuals: true,
        transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
        },
    });
    console.log('Schema options applied:', schema);
};
exports.applyBaseSchemaOptions = applyBaseSchemaOptions;
//# sourceMappingURL=base.schema.options.js.map