import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ProductAddDto} from "../../../shared/dto/product/productAddDto";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductParamDto} from "../../../shared/dto/product/productParamDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {ProductDto} from "../../../shared/dto/product/productDto";
import {ProductEditDto} from "../../../shared/dto/product/ProductEditDto";
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public productParamDto = new ProductParamDto();
  public constructor(private http: HttpClient) {}

  public productGetParam() {
    return this.productParamDto;
  }
  public productSetParam(productParamDto: ProductParamDto) {
    this.productParamDto = productParamDto;
  }
  public productGetAll(): Observable<PaginationDto<ProductDto>> {
    let productParam = this.generateProductParam();
    return this.http.get<PaginationDto<ProductDto>>(`${this.backendUrlAdmin}/ProductAdmin/ProductGetAll`, {params: productParam});
  }
  private generateProductParam() {
    let requestProductParam = new HttpParams();
    if (this.productParamDto.id) requestProductParam=requestProductParam.append('id',this.productParamDto.id);
    requestProductParam = requestProductParam.append('isActive', this.productParamDto.isActive);
    if (this.productParamDto.name) requestProductParam = requestProductParam.append("name", this.productParamDto.name);
    if (this.productParamDto.slug) requestProductParam = requestProductParam.append("slug", this.productParamDto.slug);
    if (this.productParamDto.price) requestProductParam = requestProductParam.append("price", this.productParamDto.price);
    if (this.productParamDto.typeId) requestProductParam = requestProductParam.append("typeId", this.productParamDto.typeId);
    if (this.productParamDto.inventoryId) requestProductParam = requestProductParam.append("inventoryId", this.productParamDto.inventoryId);
    if (this.productParamDto.brandId) requestProductParam = requestProductParam.append("brandId", this.productParamDto.brandId);
    if (this.productParamDto.storeId) requestProductParam = requestProductParam.append("storeId", this.productParamDto.storeId);
    if (this.productParamDto.off) requestProductParam = requestProductParam.append("off", this.productParamDto.off);
    requestProductParam = requestProductParam.append('pageIndex', this.productParamDto.pageIndex);
    requestProductParam = requestProductParam.append('pageSize', this.productParamDto.pageSize);
    requestProductParam=requestProductParam.append('sortType',this.productParamDto.sortType);
    return requestProductParam;
  }
  public productAdd(productAddDto: ProductAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/ProductAdmin/ProductAdd`, productAddDto);
  }
  public productEdit(productEditDto:ProductEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/ProductAdmin/ProductEdit`, productEditDto);
  }
  public productGetById(id:string): Observable<PaginationDto<ProductDto>> {
    let requestProductParam = new HttpParams();
    requestProductParam = requestProductParam.append('id', id);
    return this.http.get<PaginationDto<ProductDto>>(`${this.backendUrlAdmin}/ProductAdmin/ProductGetAll`,{params: requestProductParam});
  }
  public productDelete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/ProductAdmin/ProductDelete/${id}`);
  }
}
