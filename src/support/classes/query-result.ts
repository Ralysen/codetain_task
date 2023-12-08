import { SelectQueryBuilder } from "typeorm";

export class QueryResult {
    query: SelectQueryBuilder<any>;
    last_page: number;
    actual_page: number;
}