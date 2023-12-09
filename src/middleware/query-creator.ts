import { SelectQueryBuilder } from "typeorm";
import { Request } from "express";
import { PaginationResponse } from "../support/interfaces/pagination-response";

export class QueryCreator {
    async createQuery(
        req: Request,
        queryBuilder: SelectQueryBuilder<any>,
        type: string
    ): Promise<PaginationResponse<any>> {
        const queryResult = await this.queryAddFilters(req, queryBuilder, type);
        const modifiedQueryResult = await this.queryAddPagination(req, queryResult);
        const [result, totalCount] = await modifiedQueryResult.query.getManyAndCount();

        return {
            result,
            total_count: totalCount,
            last_page: modifiedQueryResult.last_page,
            actual_page: modifiedQueryResult.actual_page
        };
    }

    async queryAddPagination(
        req: Request,
        queryBuilder: SelectQueryBuilder<any>
    ): Promise<{ query: SelectQueryBuilder<any>; last_page: number; actual_page: number }> {
        const { page = "1", limit = "5" } = req.query;
        const pageInt = parseInt(page as string);
        const limitInt = parseInt(limit as string);
        const startIndex = (pageInt - 1) * limitInt;
        const total_count = await queryBuilder.getCount();
        const last_page = Math.ceil(total_count / limitInt);
        const actual_page = pageInt;

        return {
            query: queryBuilder.skip(startIndex).take(limitInt),
            last_page,
            actual_page
        };
    }

    async queryAddFilters(
        req: Request,
        queryBuilder: SelectQueryBuilder<any>,
        type: string
    ): Promise<SelectQueryBuilder<any>> {
        const { query } = req;

        if (type === "charging_station") {
            if (query.name) {
                queryBuilder.where(`${type}.name = :name`, { name: query.name });
            }

            if (query.firmware_version) {
                queryBuilder.andWhere(`${type}.firmware_version = :firmware_version`, { firmware_version: query.firmware_version });
            }

            if (query.ip_address) {
                queryBuilder.andWhere(`${type}.ip_address = :ip_address`, { ip_address: query.ip_address });
            }
        } else if (type === "connector") {
            if (query.name) {
                queryBuilder.andWhere(`${type}.name = :name`, { name: query.name });
            }

            if (query.priority) {
                const priority = query.priority === "true" ? "1" : query.priority === "false" ? "0" : query.priority as string;
                queryBuilder.andWhere(`${type}.priority = :priority`, { priority });
            }
        } else if (type === "station_type") {
            if (query.name) {
                queryBuilder.andWhere(`${type}.name = :name`, { name: query.name });
            }

            if (query.plug_count) {
                queryBuilder.andWhere(`${type}.plug_count = :plug_count`, { plug_count: query.plug_count });
            }

            if (query.current_type) {
                queryBuilder.andWhere(`${type}.current_type = :current_type`, { current_type: query.current_type });
            }
        }

        return queryBuilder;
    }
}

export default new QueryCreator();
