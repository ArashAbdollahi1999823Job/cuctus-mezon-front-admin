 import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypePictureParamDto} from "../../../shared/dto/typePicture/typePictureParamDto";
import {TypePictureDto} from "../../../shared/dto/typePicture/typePictureDto";
 import {PaginationDto} from "../../../shared/dto/base/paginationDto";
 import {StoreDto} from "../../../shared/dto/store/storeDto";
 import {TypeEditDto} from "../../../shared/dto/type/typeEditDto";
 import {TypePictureEditDto} from "../../../shared/dto/typePicture/typePictureEditDto";
@Injectable({
  providedIn: 'root'
})

export class TypePictureService {
  public typeId;
  private backendUrlAdmin = environment.backendUrlAdmin;
  public typePictureParam = new TypePictureParamDto();
  public constructor(private http: HttpClient) {}

  public typePictureAdd(formData:FormData){
   return  this.http.post(`${this.backendUrlAdmin}/TypePictureAdmin/TypePictureAdd`,formData)
  }
  setTypeId(id){
    this.typeId=id;
    this.typePictureParam.typeId=id;
  }
  getTypeId(){
    return this.typeId;
  }
  public typePictureGetParam() {
    return this.typePictureParam;
  }
  public typePictureSetParam(typePictureParam: TypePictureParamDto) {
    this.typePictureParam = typePictureParam;
  }
  public typePictureGetAll(): Observable<TypePictureDto[]> {
    let typePictureParam = this.generateProductTypePictureParams();
    return this.http.get<TypePictureDto[]>(`${this.backendUrlAdmin}/TypePictureAdmin/TypePictureGetAll`, {params: typePictureParam});
  }
  private generateProductTypePictureParams() {
    let requestParams = new HttpParams();
    if (this.typePictureParam.typeId) requestParams = requestParams.append("typeId", this.typePictureParam.typeId);
    if (this.typePictureParam.id) requestParams=requestParams.append('id',this.typePictureParam.id);
    return requestParams;
  }
  public typePictureDelete(id:number){
    return this.http.delete(`${this.backendUrlAdmin}/TypePictureAdmin/TypePictureDelete/${id}`);
  }
  public typePictureGetById(id:string):Observable<TypePictureDto[]>{
    let requestTypePictureParam = new HttpParams();
    requestTypePictureParam=requestTypePictureParam.append('id',id);
    return this.http.get<TypePictureDto[]>(`${this.backendUrlAdmin}/TypePictureAdmin/TypePictureGetAll`,{params: requestTypePictureParam});
  }
  public typePictureEdit(typePictureEditDto:TypePictureEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/TypePictureAdmin/TypePictureEdit`, typePictureEditDto);
  }
}
