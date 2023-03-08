import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {TypeParamDto} from "../../../shared/dto/Type/typeParamDto";
import {TypeDto} from "../../../shared/dto/Type/typeDto";
import {TypeAddDto} from "../../../shared/dto/Type/typeAddDto";
import {TypeEditDto} from "../../../shared/dto/Type/typeEditDto";
@Injectable({
  providedIn: 'root'
})

export class TypeService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public typeParamDto = new TypeParamDto();
  public constructor(private http: HttpClient) {}
  public typeGetParam() {
    return this.typeParamDto;
  }
  public typeSetParam(typeParamDto: TypeParamDto) {
    this.typeParamDto = typeParamDto;
  }
  public typeGetAll(): Observable<PaginationDto<TypeDto>> {
    let productTypeParam = this.generateTypeParam();
    return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlAdmin}/TypeAdmin/TypeGetAll`, {params: productTypeParam});
  }
  private generateTypeParam() {
    let requestTypeParam = new HttpParams();
    if (this.typeParamDto.name) requestTypeParam = requestTypeParam.append("name", this.typeParamDto.name);
    if (this.typeParamDto.parentTypeId) requestTypeParam = requestTypeParam.append("parentTypeId", this.typeParamDto.parentTypeId);
    if (this.typeParamDto.id) requestTypeParam=requestTypeParam.append('id',this.typeParamDto.id);
    requestTypeParam = requestTypeParam.append('pageIndex', this.typeParamDto.pageIndex);
    requestTypeParam = requestTypeParam.append('pageSize', this.typeParamDto.pageSize);
    requestTypeParam = requestTypeParam.append('isActive', this.typeParamDto.activeType);
    requestTypeParam=requestTypeParam.append('sortType',this.typeParamDto.sortType);
    return requestTypeParam;
  }
  public typeGet(): Observable<PaginationDto<TypeDto>> {
    let requestTypeGetParam = this.generateTypeGetParam();
    return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlAdmin}/TypeAdmin/TypeGetAll`, {params: requestTypeGetParam});
  }
  private generateTypeGetParam() {
    let requestTypeGetParam = new HttpParams();
    requestTypeGetParam = requestTypeGetParam.append('pageIndex', 1);
    requestTypeGetParam = requestTypeGetParam.append('pageSize', 1000);
    return requestTypeGetParam;
  }
  public typeAdd(typeAddDto: TypeAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/TypeAdmin/TypeAdd`, typeAddDto);
  }
  public typeEdit(typeEditDto:TypeEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/TypeAdmin/TypeEdit`, typeEditDto);
  }
  public typeGetById(id:string): Observable<PaginationDto<TypeDto>> {
      let requestTypeParam = this.generateTypeByIdParam(id);
      return this.http.get<PaginationDto<TypeDto>>(`${this.backendUrlAdmin}/TypeAdmin/TypeGetAll`,{params: requestTypeParam});
    }
  private generateTypeByIdParam(id) {
      let requestTypeParam = new HttpParams();
      requestTypeParam=requestTypeParam.append('id',id);
      return requestTypeParam;
    }

  public typeDelete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/TypeAdmin/TypeDelete/${id}`);
  }
}
