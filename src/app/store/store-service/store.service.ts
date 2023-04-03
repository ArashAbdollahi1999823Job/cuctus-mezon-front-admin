import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {Observable} from "rxjs/internal/Observable";
import {StoreParamDto} from "../../shared/dto/store/storeParamDto";
import {StoreEditDto} from "../../shared/dto/store/storeEditDto";
import {StoreAddDto} from "../../shared/dto/store/storeAddDto";
import {StoreDto} from "../../shared/dto/store/storeDto";
@Injectable({
  providedIn: 'root'
})

export class StoreService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public storeParamDto = new StoreParamDto();
  public storeId:string;

  public constructor(private http: HttpClient) {}
  public storeEdit(storeEditDto:StoreEditDto):Observable<boolean>{
    return this.http.put<boolean>(`${this.backendUrlAdmin}/StoreAdmin/StoreEdit`,storeEditDto);
  }
  public storeAdd(storeAddDto: StoreAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/StoreAdmin/StoreAdd`,storeAddDto);
  }
  public storeGetAll(): Observable<PaginationDto<StoreDto>> {
    let requestStoreParam = this.generateStoreParam();
    return this.http.get<PaginationDto<StoreDto>>(`${this.backendUrlAdmin}/StoreAdmin/StoreGetAll`, {params: requestStoreParam});
  }
  private generateStoreParam() {
    let requestStoreParam = new HttpParams();
    if (this.storeParamDto.mobileNumber) requestStoreParam = requestStoreParam.append("mobileNumber", this.storeParamDto.mobileNumber);
    if (this.storeParamDto.phoneNumber) requestStoreParam = requestStoreParam.append("phoneNumber", this.storeParamDto.phoneNumber);
    if (this.storeParamDto.name) requestStoreParam = requestStoreParam.append("name", this.storeParamDto.name);
    if (this.storeParamDto.userId) requestStoreParam = requestStoreParam.append("userId", this.storeParamDto.userId);
    if (this.storeParamDto.id) requestStoreParam=requestStoreParam.append('id',this.storeParamDto.id);
    requestStoreParam = requestStoreParam.append('pageIndex', this.storeParamDto.pageIndex);
    requestStoreParam = requestStoreParam.append('pageSize', this.storeParamDto.pageSize);
    requestStoreParam = requestStoreParam.append('activeType', this.storeParamDto.activeType);
    requestStoreParam=requestStoreParam.append('sortType',this.storeParamDto.sortType);
    return requestStoreParam;
  }
  public storeDelete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/StoreAdmin/StoreDelete/${id}`);
  }
  public storeGetById(id:string): Observable<PaginationDto<StoreDto>> {
    let requestStoreParam = new HttpParams();
    requestStoreParam=requestStoreParam.append('id',id);
    return this.http.get<PaginationDto<StoreDto>>(`${this.backendUrlAdmin}/StoreAdmin/StoreGetAll`,{params: requestStoreParam});
  }
  public storeGetParam() {
    return this.storeParamDto;
  }
  public storeSetParam(storeParamDto: StoreParamDto) {
    this.storeParamDto = storeParamDto;
  }
}
