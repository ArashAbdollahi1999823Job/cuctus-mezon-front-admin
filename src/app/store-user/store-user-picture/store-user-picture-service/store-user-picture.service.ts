import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypePictureDto} from "../../../shared/dto/typePicture/typePictureDto";
import {StoreUserPictureParamDto} from "../../../shared/dto/storeUserPicture/storeUserPictureParamDto";
import {StoreUserPictureDto} from "../../../shared/dto/storeUserPicture/storeUserPictureDto";
import {TypePictureEditDto} from "../../../shared/dto/typePicture/typePictureEditDto";
import {StoreUserPictureEditDto} from "../../../shared/dto/storeUserPicture/storeUserPictureEditDto";
@Injectable({
  providedIn: 'root'
})
export class StoreUserPictureService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public storeUserPictureParam = new StoreUserPictureParamDto();

  constructor(private http: HttpClient) { }

  public storeUserPictureAdd(formData:FormData){
    return  this.http.post(`${this.backendUrlAdmin}/StoreUserPictureAdmin/StoreUserPictureAdd`,formData)
  }
  public storeUserPictureGetAll(): Observable<StoreUserPictureDto[]> {
    let storeUserPictureParam =new HttpParams();
    if (this.storeUserPictureParam.storeId) storeUserPictureParam = storeUserPictureParam.append("storeId", this.storeUserPictureParam.storeId);
    if (this.storeUserPictureParam.id) storeUserPictureParam=storeUserPictureParam.append('id',this.storeUserPictureParam.id);
    return this.http.get<StoreUserPictureDto[]>(`${this.backendUrlAdmin}/StoreUserPictureAdmin/StoreUserPictureGetAll`, {params: storeUserPictureParam});
  }
  public storeUserPictureDelete(id:number){
    return this.http.delete(`${this.backendUrlAdmin}/StoreUserPictureAdmin/StoreUserPictureDelete/${id}`);
  }
  public storeUserPictureGetById(id:string):Observable<StoreUserPictureDto[]>{
    let requestStoreUserPictureParam = new HttpParams();
    requestStoreUserPictureParam=requestStoreUserPictureParam.append('id',id);
    return this.http.get<StoreUserPictureDto[]>(`${this.backendUrlAdmin}/StoreUserPictureAdmin/StoreUserPictureGetAll`,{params: requestStoreUserPictureParam});
  }
  public storeUserPictureEdit(storeUserPictureEditDto:StoreUserPictureEditDto):Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/StoreUserPictureAdmin/StoreUserPictureEdit`, storeUserPictureEditDto);
  }
}
