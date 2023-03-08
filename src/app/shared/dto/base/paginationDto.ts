export class PaginationDto<T> {
  pageIndex: number
  pageSize: number
  count: number
  data: T[]
}
