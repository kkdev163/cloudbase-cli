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
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../error");
const gateway_1 = require("../../gateway");
const utils_1 = require("../../utils");
function queryGw(ctx, commandOptions) {
    return __awaiter(this, void 0, void 0, function* () {
        const { envId } = ctx;
        const { domain: domainName, servicePath, serviceId } = commandOptions;
        if (!envId && !domainName) {
            throw new error_1.CloudBaseError('请指定需要查询的环境ID或HTTP service域名！');
        }
        const loading = utils_1.loadingFactory();
        loading.start('查询HTTP service中...');
        try {
            const res = yield gateway_1.queryGateway({
                envId,
                domain: domainName,
                path: servicePath,
                gatewayId: serviceId
            });
            loading.succeed('查询HTTP service成功！');
            const head = ['Id', 'Path', 'FunctionName', 'CreateTime'];
            const tableData = res.APISet.map(item => [
                item.APIId,
                item.Path,
                item.Name,
                utils_1.formatDate(item.CreateTime * 1000, 'yyyy-MM-dd hh:mm:ss'),
            ]);
            utils_1.printHorizontalTable(head, tableData);
        }
        catch (e) {
            loading.stop();
            throw e;
        }
    });
}
exports.queryGw = queryGw;