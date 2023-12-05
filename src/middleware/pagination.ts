import { Repository } from "typeorm";
import { Request } from "express";

export class Pagination {
    static handleQuery(
        req: Request
    ):{page: number|undefined,limit: number|undefined}{
        let page: undefined | number;
        let limit: undefined | number;
        const { query } = req;

        if(query.page != undefined){
            page = parseInt(query.page as string);
        }

        if(query.limit != undefined){
            limit = parseInt(query.limit as string);
        }

        return {page, limit}
    }

    async paginate<T>(
        dataRepo: Repository<any>,
        page: number,
        limit: number
    ): Promise<{
        result: T[];
        total_count: number;
        last_page: number
        actual_page: number;
    }>
    {
        const startIndex = (page - 1) * limit;
        const [result, total_count] = await dataRepo
            .createQueryBuilder('charging_station')
            .skip(startIndex)
            .take(limit)
            .getManyAndCount();
        const last_page = Math.ceil(total_count/limit);
        const actual_page = page;
        return { result, total_count, last_page, actual_page  };
    }
}
export default new Pagination();