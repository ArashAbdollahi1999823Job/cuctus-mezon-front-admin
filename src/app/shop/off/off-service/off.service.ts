import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {BrandDto} from "../../../shared/dto/brand/brandDto";
import {OffParamDto} from "../../../shared/dto/off/offParamDto";
import {OffDto} from "../../../shared/dto/off/offDto";
import {OffAddDto} from "../../../shared/dto/off/offAddDto";
import {OffEditDto} from "../../../shared/dto/off/offEditDto";
@Injectable({
  providedIn: 'root'
})

export class OffService {
  private backendUrlAdmin = environment.setting.url.backendUrlAdmin;
  public offParamDto = new OffParamDto();

  public constructor(private http: HttpClient) {
  }

  public offGetParam() {
    return this.offParamDto;
  }

  public offSetParam(offParamDto: OffParamDto) {
    this.offParamDto = offParamDto;
  }

  public offGetAll(): Observable<OffDto[]> {
    let offParam = new HttpParams();
    if (this.offParamDto.id) offParam = offParam.append('id', this.offParamDto.id);
    if (this.offParamDto.storeId) offParam = offParam.append('storeId', this.offParamDto.storeId);
    return this.http.get<OffDto[]>(`${this.backendUrlAdmin}/OffAdmin/OffGetAll`, {params: offParam});
  }

  public offAdd(offAddDto: OffAddDto): Observable<boolean> {
    return this.http.post<boolean>(`${this.backendUrlAdmin}/OffAdmin/OffAdd`, offAddDto);
  }

  public offEdit(offEditDto: OffEditDto): Observable<boolean> {
    return this.http.put<boolean>(`${this.backendUrlAdmin}/OffAdmin/OffEdit`, offEditDto);
  }

  public offGetById(id: string): Observable<OffDto[]> {
    let requestBrandParam = new HttpParams();
    requestBrandParam = requestBrandParam.append('id', id);
    return this.http.get<OffDto[]>(`${this.backendUrlAdmin}/OffAdmin/OffGetAll`, {params: requestBrandParam});
  }

  public offDelete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.backendUrlAdmin}/OffAdmin/OffDelete/${id}`);
  }
}
