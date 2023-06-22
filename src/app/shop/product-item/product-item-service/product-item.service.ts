import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductItemSearchDto} from "../../../shared/dto/productItem/productItemSearchDto";
import {ProductItemDto} from "../../../shared/dto/productItem/productItemDto";
import {ProductItemAddDto} from "../../../shared/dto/productItem/productItemAddDto";
@Injectable({
  providedIn: 'root'
})

export class ProductItemService {
  private backendUrlAdmin = environment.setting.url.backendUrlAdmin;
  public productItemSearchDto = new ProductItemSearchDto();
  public constructor(private http: HttpClient) {}
  public productItemSearchDtoGet() {
    return this.productItemSearchDto;
  }
  public productItemSearchDtoSet(productItemSearchDto: ProductItemSearchDto) {
    this.productItemSearchDto = productItemSearchDto;
  }
  public productItemGetAll(): Observable<ProductItemDto[]> {
    let productItemSearchDtoReq = new HttpParams();
    if (this.productItemSearchDto.id) productItemSearchDtoReq=productItemSearchDtoReq.append('id',this.productItemSearchDto.id);
    if (this.productItemSearchDto.productId) productItemSearchDtoReq=productItemSearchDtoReq.append('productId',this.productItemSearchDto.productId);
    return this.http.get<ProductItemDto[]>(`${this.backendUrlAdmin}/ProductItemAdmin/ProductItemGetAll`, {params: productItemSearchDtoReq});
  }
  public productItemAdd(productItemAddDto:ProductItemAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/ProductItemAdmin/ProductItemAdd`, productItemAddDto);
  }
  public productItemDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/ProductItemAdmin/ProductItemDelete/${id}`);
  }
}
