import {Component, EnvironmentInjector} from '@angular/core';
import {HeaderComponent} from "../../../../../../libs/shared-components/src/lib/components/header/header-component";
import {
  HeaderDescriptionComponent
} from "../../../../../../libs/shared-components/src/lib/components/header-description/header-description-component";
import {NavBarComponent} from "../../../../../../libs/shared-components/src/lib/components/nav-bar/nav-bar-component";
import {AdminNavLinks} from "../../../../../../libs/shared-components/src/lib/data/navlinks";
import {
  PartnerCardComponent
} from "../../../../../../libs/shared-components/src/lib/components/cards/partner/partner-card/partner-card-component";
import {ButtonComponent} from "../../../../../../libs/shared-components/src/lib/components/button/button-component";
import {InputComponent} from "../../../../../../libs/shared-components/src/lib/components/input/input-component";
import {
  CategoryCardAdmin
} from "../../../../../../libs/shared-components/src/lib/components/cards/category/category-card-admin/category-card-admin";
import {NgForOf, NgIf} from "@angular/common";
import {Category} from "../../../../../../libs/shared-components/src/lib/interfaces/category.interface";
import {Partner} from "../../../../../../libs/shared-components/src/lib/interfaces/partner.interface";
import {CategoryModalModes} from "../../../shared/modes/modals/category-model-modes.enum";
import {
  ConfirmModalService
} from "../../../../../../libs/shared-components/src/lib/services/modals/confirm-modal.service";
import {HttpClient} from "@angular/common/http";
import {CategoryService} from "../../../services/routes/category/category.service";
import {CategoryLocalService} from "../../../services/routes/category/category-local.service";
import {PartnersService} from "../../../services/routes/partner/partners.service";
import {PartnersLocalService} from "../../../services/routes/partner/partners-local.service";
import {CategoriesModalComponent} from "../../components/modals/categories-modal/categories-modal-component";
import {
  ModalBaseComponent
} from "../../../../../../libs/shared-components/src/lib/components/modals/modal-base/modal-base-component";
import {PartnersModalComponent} from "../../components/modals/partners-modal/partners-modal-component";

@Component({
  selector: 'app-partners-controls-page',
  imports: [
    HeaderComponent,
    HeaderDescriptionComponent,
    NavBarComponent,
    PartnerCardComponent,
    ButtonComponent,
    InputComponent,
    CategoryCardAdmin,
    NgForOf,
    NgIf,
    CategoriesModalComponent,
    ModalBaseComponent,
    PartnersModalComponent
  ],
  templateUrl: './partners-controls-page.html',
  styleUrl: './partners-controls-page.css',
  standalone: true
})
export class PartnersControlsPage {

  constructor(private http: HttpClient,private partnerService: PartnersService, protected partnerLocalService: PartnersLocalService, private httpClient: HttpClient, private injector: EnvironmentInjector) {
  }

  filteredPartners: Partner[] = [];
  partners: Partner[] = [];
  selectedPartnerEntry: Partner | null = null;
  searchQuery: string = "";

  protected readonly AdminNavLinks = AdminNavLinks;

  modalsControls = {
    createOrEditPartner: {
      isModalOpen: false,
      mode: CategoryModalModes.CREATE,
    }
  }

  async ngOnInit(){
    await this.partnerLocalService.syncPartners();
    await this.updatePartners();
  }

  protected async updatePartners() {
    await this.partnerLocalService.syncPartners();
    this.partners = this.partnerLocalService.getPartners();
    this.filteredPartners = this.partners;
  }

  async onDeletePartner(partner: Partner) {
    const confirm = await ConfirmModalService.createConfirmModal(this.injector, '', `Вы уверены, что хотите удалить партнера "${partner.company_name}"?`);
    if(confirm){
      await this.partnerLocalService.deletePartner(partner.id);
      await this.updatePartners();
    }
  }

  onEditPartner(partner: Partner) {
    this.modalsControls.createOrEditPartner.mode = CategoryModalModes.EDIT;
    this.openCreateOrEditPartnerModal();
    this.selectedPartnerEntry = partner;
  }

  onAddPartner() {
    this.modalsControls.createOrEditPartner.mode = CategoryModalModes.CREATE;
    this.openCreateOrEditPartnerModal();
  }

  closeCreateOrEditPartnerModal(){
    this.modalsControls.createOrEditPartner.isModalOpen = false;
    this.selectedPartnerEntry = null;
  }

  openCreateOrEditPartnerModal(){
    this.modalsControls.createOrEditPartner.isModalOpen = true;
  }

  onChangeSearchQuery(query: string) {
    this.searchQuery = query;
    this.filterPartners();
  }

  filterPartners() {
    if(this.searchQuery === ''){
      this.filteredPartners = this.partners;
      return;
    }
    this.filteredPartners = this.filteredPartners.filter((entry) => (entry.company_name.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase()) ||
      (entry.phone.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase()) ||
      (entry.email.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase()) ||
      (entry.contact_person.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase()) ||
      (entry.address.toLowerCase() ?? '').includes(this.searchQuery.toLowerCase())
    );
  }
}
