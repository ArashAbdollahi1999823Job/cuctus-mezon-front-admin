import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {ProductAddDto} from "../../../shared/dto/product/productAddDto";
import {Observable} from "rxjs/internal/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {ProductSearchDto} from "../../../shared/dto/product/productSearchDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {ProductDto} from "../../../shared/dto/product/productDto";
import {ProductEditDto} from "../../../shared/dto/product/ProductEditDto";
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private backendUrlAdmin = environment.setting.url.backendUrlAdmin;
  public productSearchDto = new ProductSearchDto();
  public constructor(private http: HttpClient) {}

  public productSearchDtoGet() {
    return this.productSearchDto;
  }
  public productSearchDtoSet(productParamDto: ProductSearchDto) {
    this.productSearchDto = productParamDto;
  }
  public productGetAll(): Observable<PaginationDto<ProductDto>> {
    let productParam = this.generateProductParam();
    return this.http.get<PaginationDto<ProductDto>>(`${this.backendUrlAdmin}/ProductAdmin/ProductGetAll`, {params: productParam});
  }
  private generateProductParam() {
    let requestProductParam = new HttpParams();
    if (this.productSearchDto.id) requestProductParam=requestProductParam.append('id',this.productSearchDto.id);
    requestProductParam = requestProductParam.append('isActive', this.productSearchDto.isActive);
    if (this.productSearchDto.name) requestProductParam = requestProductParam.append("name", this.productSearchDto.name);
    if (this.productSearchDto.slug) requestProductParam = requestProductParam.append("slug", this.productSearchDto.slug);
    if (this.productSearchDto.price) requestProductParam = requestProductParam.append("price", this.productSearchDto.price);
    if (this.productSearchDto.typeId) requestProductParam = requestProductParam.append("typeId", this.productSearchDto.typeId);
    if (this.productSearchDto.inventoryId) requestProductParam = requestProductParam.append("inventoryId", this.productSearchDto.inventoryId);
    if (this.productSearchDto.brandId) requestProductParam = requestProductParam.append("brandId", this.productSearchDto.brandId);
    if (this.productSearchDto.storeId) requestProductParam = requestProductParam.append("storeId", this.productSearchDto.storeId);
    if (this.productSearchDto.off) requestProductParam = requestProductParam.append("off", this.productSearchDto.off);
    requestProductParam = requestProductParam.append('pageIndex', this.productSearchDto.pageIndex);
    requestProductParam = requestProductParam.append('pageSize', this.productSearchDto.pageSize);
    requestProductParam=requestProductParam.append('sortType',this.productSearchDto.sortType);
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
  public productDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/ProductAdmin/ProductDelete/${id}`);
  }
}
