import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ToastrService} from "ngx-toastr";
import {UserSearchDto} from "../../../shared/dto/user/userSearchDto";
import {UserDto} from "../../../shared/dto/user/userDto";
import {PaginationDto} from "../../../shared/dto/base/paginationDto";
import {UserService} from "../../../user/user-service/user.service";
import {StoreService} from "../../store-service/store.service";
import {StoreDto} from "../../../shared/dto/store/storeDto";
import {StoreEditDto} from "../../../shared/dto/store/storeEditDto";
import {Subscription} from "rxjs/internal/Subscription";
import {StoreSearchDto} from "../../../shared/dto/store/storeSearchDto";
import {environment} from "../../../../environments/environment";
import { slugify } from 'src/app/shared/tool/slugify';
@Component({
  selector: 'store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.scss']
})
export class StoreEditComponent implements OnInit, OnDestroy,AfterViewInit {
  constructor(private storeService: StoreService,private ef:ElementRef,private renderer: Renderer2, private activatedRoute: ActivatedRoute, private title: Title, private toastService: ToastrService, private userService: UserService, private router: Router) {
  }
  ngAfterViewInit() {
    this.renderer.setStyle(this.ef.nativeElement.querySelector('.body'), 'height', window.innerHeight-120+ "px");
  }
  public storeId: string;
  public userDtos: UserDto[];
  public storeDto: StoreDto;
  public subscription: Subscription;
  public storeEditForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.maxLength(30), Validators.minLength(3)]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(10)]),
    phoneNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    mobileNumber: new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500), Validators.minLength(10)]),
    userId: new FormControl(null, [Validators.required]),
    isActive: new FormControl(),
    slug: new FormControl(null, [Validators.required, Validators.maxLength(60), Validators.minLength(3)]),

  })
  ngOnInit(): void {
    this.storeId = this.activatedRoute.snapshot.paramMap.get('StoreId');
    this.storeGetById();
    this.UserGetAllAsSeller();
  }
  public storeGetById() {
    let storeSearchDto = new StoreSearchDto();
    storeSearchDto.id=this.storeId;
    this.storeService.storeSearchDtoSet(storeSearchDto);
    this.subscription = this.storeService.storeGetAll().subscribe((res: PaginationDto<StoreDto>) => {
      this.storeDto = res.data[0];
      this.title.setTitle("در حال اپدیت مغازه" + res.data[0].name + " هستید ");
      this.storeEditForm.controls.name.setValue(this.storeDto.name);
      this.storeEditForm.controls.phoneNumber.setValue(this.storeDto.phoneNumber);
      this.storeEditForm.controls.mobileNumber.setValue(this.storeDto.mobileNumber);
      this.storeEditForm.controls.address.setValue(this.storeDto.address);
      this.storeEditForm.controls.description.setValue(this.storeDto.description);
      this.storeEditForm.controls.userId.setValue(this.storeDto.userId);
      this.storeEditForm.controls.slug.setValue(this.storeDto.slug);
      this.storeEditForm.controls["isActive"].setValue(this.storeDto.isActive);
    })
  }
  public UserGetAllAsSeller() {
    let userSearchDto = new UserSearchDto();
    userSearchDto.roleType = 3;
    userSearchDto.pageSize = 100;
    this.userService.userSearchDtoSet(userSearchDto);
    this.subscription = this.userService.userGetAll().subscribe((res: PaginationDto<UserDto>) => {
      this.userDtos = res.data;
    });
  }
  public storeEdit() {
    let storeEditDto = new StoreEditDto();
    storeEditDto.id = this.storeId;
    storeEditDto.name = this.storeEditForm.controls.name.value;
    storeEditDto.phoneNumber = this.storeEditForm.controls.phoneNumber.value;
    storeEditDto.mobileNumber = this.storeEditForm.controls.mobileNumber.value;
    storeEditDto.description = this.storeEditForm.controls.description.value;
    storeEditDto.address = this.storeEditForm.controls.address.value;
    storeEditDto.userId = this.storeEditForm.controls.userId.value;
    storeEditDto.slug = this.storeEditForm.controls.slug.value;
    storeEditDto.isActive = this.storeEditForm.controls['isActive'].value;
    this.subscription = this.storeService.storeEdit(storeEditDto).subscribe((res: boolean) => {
      if (res == true) {
        this.toastService.success(environment.messages.store.storePictureEditSuccess);
        this.router.navigateByUrl("/Store/StoreMain");
      }
    })
  }
  slugify() {
    this.storeEditForm.controls['slug'].setValue(slugify(this.storeEditForm.controls['name'].value+"-"+Math.floor((Math.random() * 1000) + 1)));
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

