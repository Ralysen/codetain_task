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
    async paginate(dataRepo, page, pageSize) {
        const startIndex = (page - 1) * pageSize;
        const next_page = page + 1;
        let previous_page;
        const [data, total_count] = await dataRepo
            .createQueryBuilder('charging_station')
            .skip(startIndex)
            .take(pageSize)
            .getManyAndCount();
        const last_page = Math.ceil(total_count / pageSize);
        if (page > 1) {
            previous_page = page - 1;
        }
        else {
            previous_page = undefined;
        }
        return { data, total_count, next_page, previous_page, last_page };
    }
}
exports.Pagination = Pagination;
exports.default = new Pagination();
