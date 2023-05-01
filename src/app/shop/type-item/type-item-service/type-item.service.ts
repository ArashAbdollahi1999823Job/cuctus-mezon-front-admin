import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {TypeItemSearchDto} from "../../../shared/dto/typeItem/typeItemSearchDto";
import {TypeItemDto} from "../../../shared/dto/typeItem/typeItemDto";
import {TypeItemAddDto} from "../../../shared/dto/typeItem/typeItemAddDto";
@Injectable({
  providedIn: 'root'
})

export class TypeItemService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public typeItemSearchDto = new TypeItemSearchDto();
  public constructor(private http: HttpClient) {}
  public typeItemSearchDtoGet() {
    return this.typeItemSearchDto;
  }
  public typeItemSearchDtoSet(typeItemSearchDto: TypeItemSearchDto) {
    this.typeItemSearchDto = typeItemSearchDto;
  }
  public typeItemGetAll(): Observable<TypeItemDto[]> {
    let typeItemSearchDtoReq = new HttpParams();
    if (this.typeItemSearchDto.id) typeItemSearchDtoReq=typeItemSearchDtoReq.append('id',this.typeItemSearchDto.id);
    if (this.typeItemSearchDto.typeId) typeItemSearchDtoReq=typeItemSearchDtoReq.append('typeId',this.typeItemSearchDto.typeId);
    return this.http.get<TypeItemDto[]>(`${this.backendUrlAdmin}/TypeItemAdmin/TypeItemGetAll`, {params: typeItemSearchDtoReq});
  }
  public typeItemAdd(typeItemAddDto:TypeItemAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/TypeItemAdmin/TypeItemAdd`, typeItemAddDto);
  }
  public typeItemDelete(id:string):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/TypeItemAdmin/TypeItemDelete/${id}`);
  }
}
