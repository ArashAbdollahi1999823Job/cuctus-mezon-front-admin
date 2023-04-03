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
  public productAdd(productAddDto: ProductAddDto):Observable<boolean> {
    console.log(productAddDto)
    return this.http.post<boolean>(`${this.backendUrlAdmin}/ProductAdmin/ProductAdd`, productAddDto);
  }
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
 /*





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



  private generateTypeByIdParam(id) {
      let requestTypeParam = new HttpParams();
      requestTypeParam=requestTypeParam.append('id',id);
      return requestTypeParam;
    }

 */
}
