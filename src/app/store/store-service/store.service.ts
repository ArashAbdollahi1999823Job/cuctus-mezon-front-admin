import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PaginationDto} from "../../shared/dto/base/paginationDto";
import {Observable} from "rxjs/internal/Observable";
import {StoreSearchDto} from "../../shared/dto/store/storeSearchDto";
import {StoreEditDto} from "../../shared/dto/store/storeEditDto";
import {StoreAddDto} from "../../shared/dto/store/storeAddDto";
import {StoreDto} from "../../shared/dto/store/storeDto";
@Injectable({
  providedIn: 'root'
})

export class StoreService {
  private backendUrlAdmin = environment.setting.url.backendUrlAdmin;
  public storeSearchDto = new StoreSearchDto();
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
    if (this.storeSearchDto.mobileNumber) requestStoreParam = requestStoreParam.append("mobileNumber", this.storeSearchDto.mobileNumber);
    if (this.storeSearchDto.phoneNumber) requestStoreParam = requestStoreParam.append("phoneNumber", this.storeSearchDto.phoneNumber);
    if (this.storeSearchDto.name) requestStoreParam = requestStoreParam.append("name", this.storeSearchDto.name);
    if (this.storeSearchDto.userId) requestStoreParam = requestStoreParam.append("userId", this.storeSearchDto.userId);
    if (this.storeSearchDto.id) requestStoreParam=requestStoreParam.append('id',this.storeSearchDto.id);
    requestStoreParam = requestStoreParam.append('pageIndex', this.storeSearchDto.pageIndex);
    requestStoreParam = requestStoreParam.append('pageSize', this.storeSearchDto.pageSize);
    requestStoreParam = requestStoreParam.append('activeType', this.storeSearchDto.activeType);
    requestStoreParam=requestStoreParam.append('sortType',this.storeSearchDto.sortType);
    return requestStoreParam;
  }
  public storeDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/StoreAdmin/StoreDelete/${id}`);
  }
  public storeSearchDtoGet() {
    return this.storeSearchDto;
  }
  public storeSearchDtoSet(storeSearchDto: StoreSearchDto) {
    this.storeSearchDto = storeSearchDto;
  }
}
