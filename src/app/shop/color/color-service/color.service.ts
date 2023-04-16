import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ColorSearchDto} from "../../../shared/dto/color/colorSearchDto";
import {ColorDto} from "../../../shared/dto/color/colorDto";
import {ColorAddDto} from "../../../shared/dto/color/colorAddDto";
import {ColorEditDto} from "../../../shared/dto/color/colorEditDto";
@Injectable({
  providedIn: 'root'
})

export class ColorService {
  private backendUrlAdmin = environment.backendUrlAdmin;
  public colorSearchDto = new ColorSearchDto();
  public constructor(private http: HttpClient) {}
  public colorSearchDtoGet() {
    return this.colorSearchDto;
  }
  public colorSearchDtoSet(colorSearchDto: ColorSearchDto) {
    this.colorSearchDto = colorSearchDto;
  }
  public colorGetAll(): Observable<ColorDto[]> {
    let colorSearchDtoReq = new HttpParams();
    if (this.colorSearchDto.name) colorSearchDtoReq = colorSearchDtoReq.append("name", this.colorSearchDto.name);
    if (this.colorSearchDto.id) colorSearchDtoReq=colorSearchDtoReq.append('id',this.colorSearchDto.id);
    if (this.colorSearchDto.productId) colorSearchDtoReq=colorSearchDtoReq.append('productId',this.colorSearchDto.productId);
    return this.http.get<ColorDto[]>(`${this.backendUrlAdmin}/ColorAdmin/ColorGetAll`, {params: colorSearchDtoReq});
  }
  public colorAdd(colorAddDto:ColorAddDto):Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/ColorAdmin/ColorAdd`, colorAddDto);
  }
  public colorDelete(id:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/ColorAdmin/ColorDelete/${id}`);
  }
}
