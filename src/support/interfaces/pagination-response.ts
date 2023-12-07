export interface PaginationResponse <T> {
    result: T[],
    total_count: number,
    last_page?: number,
    actual_page?: number
}