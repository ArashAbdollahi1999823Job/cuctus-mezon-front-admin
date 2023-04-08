import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {TypeDto} from "../../../shared/dto/type/typeDto";
import {BrandParamDto} from "../../../shared/dto/brand/brandParamDto";
import {BrandDto} from "../../../shared/dto/brand/brandDto";
import {BrandAddDto} from "../../../shared/dto/brand/brandAddDto";
import {BrandEditDto} from "../../../shared/dto/brand/brandEditDto";
@Injectable({
  providedIn: 'root'
})

export class BrandService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public brandParamDto = new BrandParamDto();
  public constructor(private http: HttpClient) {}
  public brandGetParam() {
    return this.brandParamDto;
  }
  public brandSetParam(brandParamDto: BrandParamDto) {
    this.brandParamDto = brandParamDto;
  }
  public brandGetAll(): Observable<PaginationDto<BrandDto>> {
    let brandParam = this.generateBrandParam();
    return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlAdmin}/BrandAdmin/BrandGetAll`, {params: brandParam});
  }
  private generateBrandParam() {
    let requestBrandParam = new HttpParams();
    if (this.brandParamDto.name) requestBrandParam = requestBrandParam.append("name", this.brandParamDto.name);
    if (this.brandParamDto.id) requestBrandParam=requestBrandParam.append('id',this.brandParamDto.id);
    requestBrandParam = requestBrandParam.append('pageIndex', this.brandParamDto.pageIndex);
    requestBrandParam = requestBrandParam.append('pageSize', this.brandParamDto.pageSize);
    requestBrandParam=requestBrandParam.append('sortType',this.brandParamDto.sortType);
    return requestBrandParam;
  }

  public brandAdd(brandAddDto:BrandAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/BrandAdmin/BrandAdd`, brandAddDto);
  }
  public brandEdit(brandEditDto:BrandEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/BrandAdmin/BrandEdit`, brandEditDto);
  }
  public brandGetById(id:string): Observable<PaginationDto<BrandDto>> {
      let requestBrandParam = this.generateBrandByIdParam(id);
      return this.http.get<PaginationDto<BrandDto>>(`${this.backendUrlAdmin}/BrandAdmin/BrandGetAll`,{params: requestBrandParam});
    }
  private generateBrandByIdParam(id) {
      let requestBrandParam = new HttpParams();
      requestBrandParam=requestBrandParam.append('id',id);
      return requestBrandParam;
    }

  public brandDelete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/BrandAdmin/BrandDelete/${id}`);
  }
}
