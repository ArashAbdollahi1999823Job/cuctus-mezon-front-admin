import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {ShopSellerToAddDto} from "../../shared/dto/shopSeller/shopSellerToAddDto";
import {environment} from "../../../environments/environment";
import {IPaginationDto} from "../../shared/dto/base/IPaginationDto";
import {Observable} from "rxjs/internal/Observable";
import {IShopSellerForAdminDto} from "../../shared/dto/shopSeller/IShopSellerForAdminDto";
import {IUserForAdminDto} from "../../shared/dto/user/IUserForAdminDto";
import {UserParamsDto} from "../../shared/dto/user/userParamsDto";
import {shopSellerParamsDto} from "../../shared/dto/shopSeller/ShopSellerParamsDto";
import {ShopSellerForSendEditDto} from "../../shared/dto/shopSeller/ShopSellerForSendEditDto";
@Injectable({
  providedIn: 'root'
})

export class SellerService {
  private backendUrl = environment.backendUrl;
  public shopSellerParams = new shopSellerParamsDto();
  public constructor(private http: HttpClient) {}

  public editShopSeller(user:ShopSellerForSendEditDto){
    return this.http.put<any>(`${this.backendUrl}/ShopSeller/EditShopSeller`,user);
  }
  public addSeller(shopSellerToAddDto: ShopSellerToAddDto):Observable<IShopSellerForAdminDto> {
    return this.http.post<IShopSellerForAdminDto>(`${this.backendUrl}/ShopSeller/AddShopSeller`, shopSellerToAddDto);
  }
  public getAllShopSellers(): Observable<IPaginationDto<IShopSellerForAdminDto>> {
    let requestUserParams = this.generateShopSellerParams();
    return this.http.get<IPaginationDto<IShopSellerForAdminDto>>(`${this.backendUrl}/ShopSeller/GetAllShopSeller`, {params: requestUserParams});
  }
  public getShopSellerById(id:string): Observable<IPaginationDto<IShopSellerForAdminDto>> {
    let requestUserParams = this.generateShopSellerParamsById(id);
    return this.http.get<IPaginationDto<IShopSellerForAdminDto>>(`${this.backendUrl}/ShopSeller/GetAllShopSeller`,{params: requestUserParams});
  }
  public toggleActiveShopSeller(id:number){
    return this.http.put<boolean>(`${this.backendUrl}/ShopSeller/toggleActiveShopSeller/${id}`,{});
  }
  public deleteShopSeller(id:number){
    return this.http.delete<boolean>(`${this.backendUrl}/ShopSeller/DeleteShopSellerById/${id}`);
  }
  private generateShopSellerParams() {
    let requestShopSellerParams = new HttpParams();
    if (this.shopSellerParams.mobileNumber) requestShopSellerParams = requestShopSellerParams.append("mobileNumber", this.shopSellerParams.mobileNumber);
    if (this.shopSellerParams.phoneNumber) requestShopSellerParams = requestShopSellerParams.append("phoneNumber", this.shopSellerParams.phoneNumber);
    if (this.shopSellerParams.name) requestShopSellerParams = requestShopSellerParams.append("name", this.shopSellerParams.name);
    if (this.shopSellerParams.userId) requestShopSellerParams = requestShopSellerParams.append("userId", this.shopSellerParams.userId);
    if (this.shopSellerParams.id) requestShopSellerParams=requestShopSellerParams.append('id',this.shopSellerParams.id);
    requestShopSellerParams = requestShopSellerParams.append('pageIndex', this.shopSellerParams.pageIndex);
    requestShopSellerParams = requestShopSellerParams.append('pageSize', this.shopSellerParams.pageSize);
    requestShopSellerParams = requestShopSellerParams.append('activeType', this.shopSellerParams.activeType);
    requestShopSellerParams=requestShopSellerParams.append('sortType',this.shopSellerParams.sortType);

    return requestShopSellerParams;
  }
  private generateShopSellerParamsById(id) {
    let requestShopSellerParams = new HttpParams();
     requestShopSellerParams=requestShopSellerParams.append('id',id);
    return requestShopSellerParams;
  }
  public getShopSellerParams() {
    return this.shopSellerParams;
  }
  public setShopSellerParams(shopSellerParams: shopSellerParamsDto) {
    this.shopSellerParams = shopSellerParams;
  }
}
