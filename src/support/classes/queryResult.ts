import {SelectQueryBuilder} from "typeorm";

export class QueryResult {
    query: SelectQueryBuilder<any>;
    last_page: number;
    actual_page: number;

    /*constructor(query: SelectQueryBuilder<any>, last_page: number, actual_page: number) {
        this.query = query;
        this.actual_page = actual_page;
        this.last_page = last_page;
    };*/
}