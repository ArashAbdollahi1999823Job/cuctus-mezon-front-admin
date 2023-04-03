import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {TypeParamDto} from "../../../shared/dto/Type/typeParamDto";
import {TypeDto} from "../../../shared/dto/Type/typeDto";
import {TypeAddDto} from "../../../shared/dto/Type/typeAddDto";
import {TypeEditDto} from "../../../shared/dto/Type/typeEditDto";
import {InventoryParamDto} from "../../../shared/dto/inventory/inventoryParamDto";
import {InventoryDto} from "../../../shared/dto/inventory/inventoryDto";
import {InventoryAddDto} from "../../../shared/dto/inventory/inventoryAddDto";
import {InventoryEditDto} from "../../../shared/dto/inventory/inventoryEditDto";
@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public inventoryParamDto = new InventoryParamDto();
  public constructor(private http: HttpClient) {}
  public inventoryGetParam() {
    return this.inventoryParamDto;
  }
  public inventorySetParam(inventoryParamDto: InventoryParamDto) {
    this.inventoryParamDto = inventoryParamDto;
  }
  public inventoryGetAll(): Observable<InventoryDto[]> {
    let inventoryParam = this.generateInventoryParam();
    return this.http.get<InventoryDto[]>(`${this.backendUrlAdmin}/InventoryAdmin/InventoryGetAll`, {params: inventoryParam});
  }
  private generateInventoryParam() {
    let requestInventoryParam = new HttpParams();
    if (this.inventoryParamDto.name) requestInventoryParam = requestInventoryParam.append("name", this.inventoryParamDto.name);
    if (this.inventoryParamDto.storeId) requestInventoryParam = requestInventoryParam.append("storeId", this.inventoryParamDto.storeId);
    requestInventoryParam = requestInventoryParam.append('isActive', this.inventoryParamDto.activeType);
    return requestInventoryParam;
  }
  public inventoryAdd(inventoryAddDto: InventoryAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/InventoryAdmin/InventoryAdd`, inventoryAddDto);
  }
  public inventoryEdit(inventoryEditDto:InventoryEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/InventoryAdmin/InventoryEdit`, inventoryEditDto);
  }
  public inventoryGetById(id:string): Observable<InventoryDto[]> {
      let requestInventoryParam = this.generateInventoryByIdParam(id);
      return this.http.get<InventoryDto[]>(`${this.backendUrlAdmin}/InventoryAdmin/InventoryGetAll`,{params: requestInventoryParam});
    }
  private generateInventoryByIdParam(id) {
      let requestInventoryParam = new HttpParams();
      requestInventoryParam=requestInventoryParam.append('id',id);
      return requestInventoryParam;
    }
  public inventoryDelete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/InventoryAdmin/InventoryDelete/${id}`);
  }
}
