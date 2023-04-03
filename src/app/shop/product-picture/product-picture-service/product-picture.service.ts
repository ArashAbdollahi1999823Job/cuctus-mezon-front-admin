 import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
 import {ProductPictureParamDto} from "../../../shared/dto/productPicture/productPictureParamDto";
 import {ProductPictureDto} from "../../../shared/dto/productPicture/productPictureDto";
 import {ProductPictureEditDto} from "../../../shared/dto/productPicture/productPictureEditDto";
@Injectable({
  providedIn: 'root'
})

export class ProductPictureService {
  public productId;
  private backendUrlAdmin = environment.backendUrlAdmin;
  public productPictureParam = new ProductPictureParamDto();
  public constructor(private http: HttpClient) {}

  public productPictureAdd(formData:FormData){
   return  this.http.post(`${this.backendUrlAdmin}/ProductPictureAdmin/ProductPictureAdd`,formData)
  }
  setProductId(id){
    this.productId=id;
    this.productPictureParam.productId=id;
  }
  getProductId(){
    return this.productId;
  }
  public productPictureGetParam() {
    return this.productPictureParam;
  }
  public productPictureSetParam(productPictureParam: ProductPictureParamDto) {
    this.productPictureParam = productPictureParam;
  }
  public productPictureGetAll(): Observable<ProductPictureDto[]> {
    let productPictureParam = new HttpParams();
    if (this.productPictureParam.productId) productPictureParam = productPictureParam.append("productId", this.productPictureParam.productId);
    if (this.productPictureParam.id) productPictureParam=productPictureParam.append('id',this.productPictureParam.id);
    return this.http.get<ProductPictureDto[]>(`${this.backendUrlAdmin}/ProductPictureAdmin/ProductPictureGetAll`, {params: productPictureParam});
  }
  public productPictureDelete(id:number){
    return this.http.delete(`${this.backendUrlAdmin}/ProductPictureAdmin/ProductPictureDelete/${id}`);
  }
  public productPictureGetById(id:string):Observable<ProductPictureDto[]>{
    let requestProductPictureParam = new HttpParams();
    requestProductPictureParam=requestProductPictureParam.append('id',id);
    return this.http.get<ProductPictureDto[]>(`${this.backendUrlAdmin}/ProductPictureAdmin/ProductPictureGetAll`,{params: requestProductPictureParam});
  }
  public productPictureEdit(productPictureEditDto:ProductPictureEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/ProductPictureAdmin/ProductPictureEdit`, productPictureEditDto);
  }
}
