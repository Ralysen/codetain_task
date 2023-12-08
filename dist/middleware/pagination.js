"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = void 0;
class Pagination {
    static handleQuery(req) {
        let page;
        let limit;
        const { query } = req;
        if (query.page != undefined) {
            page = parseInt(query.page);
        }
        if (query.limit != undefined) {
            limit = parseInt(query.limit);
        }
        return { page, limit };
    }
    async paginate(dataRepo, page, limit) {
        const startIndex = (page - 1) * limit;
        const [result, total_count] = await dataRepo
            .createQueryBuilder('charging_station')
            .skip(startIndex)
            .take(limit)
            .getManyAndCount();
        const last_page = Math.ceil(total_count / limit);
        const actual_page = page;
        return { result, total_count, last_page, actual_page };
    }
}
exports.Pagination = Pagination;
exports.default = new Pagination();
