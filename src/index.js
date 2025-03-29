"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
var express_1 = require("express");
var node_postgres_1 = require("drizzle-orm/node-postgres");
var migrator_1 = require("drizzle-orm/node-postgres/migrator");
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
// Load environment variables
dotenv_1.default.config();
// Initialize Express app
var app = (0, express_1.default)();
app.use(express_1.default.json());
// Database connection configuration
var connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/mydb';
var pool = new pg_1.Pool({ connectionString: connectionString });
// Initialize Drizzle with the PostgreSQL connection
var db = (0, node_postgres_1.drizzle)(pool);
// API routes
app.get('/health', function (req, res) {
    res.status(200).json({ status: 'ok' });
});
// Server startup function with migration
function startServer() {
    return __awaiter(this, void 0, void 0, function () {
        var PORT_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log('Connecting to PostgreSQL database...');
                    // Run migrations from the specified directory
                    console.log('Running migrations if needed...');
                    return [4 /*yield*/, (0, migrator_1.migrate)(db, {
                            migrationsFolder: path_1.default.join(__dirname, '../drizzle'),
                        })];
                case 1:
                    _a.sent();
                    console.log('Migrations completed successfully');
                    PORT_1 = process.env.PORT || 3000;
                    app.listen(PORT_1, function () {
                        console.log("Server running on port ".concat(PORT_1));
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error('Failed to start server:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Start the server
startServer();
