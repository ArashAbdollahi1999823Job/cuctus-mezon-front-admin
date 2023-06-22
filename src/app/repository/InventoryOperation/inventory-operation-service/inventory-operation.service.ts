import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {InventoryOperationParamDto} from "../../../shared/dto/inventoryOperation/inventoryOperationParamDto";
import {InventoryOperationAddDto} from "../../../shared/dto/inventoryOperation/inventoryOperationAddDto";
import {InventoryOperationDto} from "../../../shared/dto/inventoryOperation/inventoryOperationDto";
import {InventoryOperationType} from "../../../shared/enums/inventoryOperationType";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";

@Injectable({
  providedIn: 'root'
})

export class InventoryOperationService {
  private backendUrlAdmin = environment.setting.url.backendUrlAdmin;
  public inventoryOperationParamDto = new InventoryOperationParamDto();
  public constructor(private http: HttpClient) {}
  public inventoryOperationAdd(inventoryOperationAddDto: InventoryOperationAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/InventoryOperationAdmin/InventoryOperationAdd`,inventoryOperationAddDto);
  }
  public inventoryOperationGetAll(): Observable<PaginationDto<InventoryOperationDto>> {
    let requestInventoryOperationParam = this.generateInventoryOperationParam();
    return this.http.get<PaginationDto<InventoryOperationDto>>(`${this.backendUrlAdmin}/InventoryOperationAdmin/InventoryOperationGetAll`, {params: requestInventoryOperationParam});
  }
  private generateInventoryOperationParam() {
    let requestInventoryOperationParam = new HttpParams();
    if (this.inventoryOperationParamDto.price) requestInventoryOperationParam = requestInventoryOperationParam.append("price", this.inventoryOperationParamDto.price);
    if (this.inventoryOperationParamDto.count) requestInventoryOperationParam = requestInventoryOperationParam.append("count", this.inventoryOperationParamDto.count);
    if (this.inventoryOperationParamDto.inventoryOperationType!=InventoryOperationType.notImportant) requestInventoryOperationParam = requestInventoryOperationParam.append("inventoryOperationType", this.inventoryOperationParamDto.inventoryOperationType);

    if (this.inventoryOperationParamDto.id) requestInventoryOperationParam=requestInventoryOperationParam.append('id',this.inventoryOperationParamDto.id);
    if (this.inventoryOperationParamDto.productId) requestInventoryOperationParam=requestInventoryOperationParam.append('productId',this.inventoryOperationParamDto.productId);
    if (this.inventoryOperationParamDto.inventoryId) requestInventoryOperationParam=requestInventoryOperationParam.append('inventoryId',this.inventoryOperationParamDto.inventoryId);
    if (this.inventoryOperationParamDto.storeId) requestInventoryOperationParam=requestInventoryOperationParam.append('storeId',this.inventoryOperationParamDto.storeId);
    requestInventoryOperationParam = requestInventoryOperationParam.append('pageIndex', this.inventoryOperationParamDto.pageIndex);
    requestInventoryOperationParam = requestInventoryOperationParam.append('pageSize', this.inventoryOperationParamDto.pageSize);
    requestInventoryOperationParam=requestInventoryOperationParam.append('sortType',this.inventoryOperationParamDto.sortType);
    return requestInventoryOperationParam;
  }
  public inventoryOperationDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/InventoryOperationAdmin/InventoryOperationDelete/${id}`);
  }
  public inventoryOperationGetParam() {
    return this.inventoryOperationParamDto;
  }
  public inventoryOperationSetParam(inventoryOperationParamDto: InventoryOperationParamDto) {
    this.inventoryOperationParamDto = inventoryOperationParamDto;
  }
}
