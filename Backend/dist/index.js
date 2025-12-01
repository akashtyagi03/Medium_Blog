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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var client_1 = require("@prisma/client");
var bcrypt_1 = __importDefault(require("bcrypt"));
var zod_1 = __importDefault(require("zod"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var cors_1 = __importDefault(require("cors"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1.default)();
// take username , password , check for zod schema
// take password hash it using bcrypt
// put data into data base using prisma
// return jwt token
// handle errors properly
// use express json middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post('/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zodSchema, parsedData, _a, email, password, hasedpassword, user, token, error_1, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                zodSchema = zod_1.default.object({
                    email: zod_1.default.email("Please enter a valid email address").trim(),
                    password: zod_1.default
                        .string()
                        .min(4, "Password must be at least 8 characters long")
                        .max(32, "Password can't be longer than 32 characters")
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                        .regex(/[0-9]/, "Password must contain at least one number")
                        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
                });
                parsedData = zodSchema.safeParse(req.body);
                if (!parsedData.success) {
                    console.log("error is", parsedData.error);
                    return [2 /*return*/, res.json({
                            message: "Invalid data"
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hasedpassword = _b.sent();
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: email,
                            password: hasedpassword,
                        },
                    })];
            case 3:
                user = _b.sent();
                token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
                return [2 /*return*/, res.json({
                        message: "User created successfully",
                        user: user,
                        token: token
                    })];
            case 4:
                error_1 = _b.sent();
                console.error(error_1);
                return [2 /*return*/, res.status(500).send('Internal Server Error')];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.error(error_2);
                return [2 /*return*/, res.status(500).send('Internal Server Error')];
            case 7: return [2 /*return*/];
        }
    });
}); });
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var zodSchema, parsedData, _a, email, password, hasedpassword, user, isPasswordValid, token, error_3, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                zodSchema = zod_1.default.object({
                    email: zod_1.default.email("Please enter a valid email address").trim(),
                    password: zod_1.default
                        .string()
                        .min(4, "Password must be at least 8 characters long")
                        .max(32, "Password can't be longer than 32 characters")
                        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
                        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
                        .regex(/[0-9]/, "Password must contain at least one number")
                        .regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
                });
                parsedData = zodSchema.safeParse(req.body);
                if (!parsedData.success) {
                    console.log("error is", parsedData.error);
                    return [2 /*return*/, res.json({
                            message: "Invalid data"
                        })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                _a = req.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
            case 2:
                hasedpassword = _b.sent();
                return [4 /*yield*/, prisma.user.findFirst({
                        where: { email: email },
                        select: { id: true, email: true, password: true }
                    })];
            case 3:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid credentials" })];
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
            case 4:
                isPasswordValid = _b.sent();
                if (!isPasswordValid) {
                    return [2 /*return*/, res.status(400).json({ message: "Invalid credentials" })];
                }
                token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET);
                return [2 /*return*/, res.json({
                        message: "User created successfully",
                        user: user,
                        token: token
                    })];
            case 5:
                error_3 = _b.sent();
                console.error(error_3);
                return [2 /*return*/, res.status(500).send('Internal Server Error')];
            case 6: return [3 /*break*/, 8];
            case 7:
                error_4 = _b.sent();
                console.error(error_4);
                return [2 /*return*/, res.status(500).send('Internal Server Error')];
            case 8: return [2 /*return*/];
        }
    });
}); });
app.listen(process.env.PORT, function () {
    console.log('Server is running on' + " " + process.env.PORT);
});
//# sourceMappingURL=index.js.map