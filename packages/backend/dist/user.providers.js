"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const user_entity_1 = require("./user.entity");
exports.usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: user_entity_1.User,
    },
];
//# sourceMappingURL=user.providers.js.map