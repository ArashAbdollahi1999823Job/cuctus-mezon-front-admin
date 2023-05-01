import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {BrandSearchDto} from "../../../shared/dto/brand/brandSearchDto";
import {BrandDto} from "../../../shared/dto/brand/brandDto";
import {BrandAddDto} from "../../../shared/dto/brand/brandAddDto";
import {BrandEditDto} from "../../../shared/dto/brand/brandEditDto";
@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public brandParamDto = new BrandSearchDto();
  public constructor(private http: HttpClient) {}
  public brandSearchDtoGet():BrandSearchDto {
    return this.brandParamDto;
  }
  public brandSearchDtoSet(brandParamDto: BrandSearchDto) {
    this.brandParamDto = brandParamDto;
  }
  public brandGetAll(): Observable<PaginationDto<BrandDto>> {
    let brandSearchDtoReq = new HttpParams();
    if (this.brandParamDto.name) brandSearchDtoReq = brandSearchDtoReq.append("name", this.brandParamDto.name);
    if (this.brandParamDto.id) brandSearchDtoReq=brandSearchDtoReq.append('id',this.brandParamDto.id);
    brandSearchDtoReq = brandSearchDtoReq.append('pageIndex', this.brandParamDto.pageIndex);
    brandSearchDtoReq = brandSearchDtoReq.append('pageSize', this.brandParamDto.pageSize);
    brandSearchDtoReq=brandSearchDtoReq.append('sortType',this.brandParamDto.sortType);
    return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlAdmin}/BrandAdmin/BrandGetAll`, {params: brandSearchDtoReq});
  }
  public brandAdd(brandAddDto:BrandAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/BrandAdmin/BrandAdd`, brandAddDto);
  }
  public brandEdit(brandEditDto:BrandEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/BrandAdmin/BrandEdit`, brandEditDto);
  }
  public brandDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/BrandAdmin/BrandDelete/${id}`);
  }
}
