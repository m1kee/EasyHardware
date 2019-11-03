import { Component, OnInit } from '@angular/core';
import { IStore } from '@domain/store';
import { faSave, faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { StoreService } from '@services/store.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-store-crud',
    templateUrl: './store-crud.component.html',
    styles: []
})
export class StoreCrudComponent implements OnInit {

    private stores: any = [];
    private currentStore: IStore = this.defaultStore();
    private icons: any = {
        faSave: faSave,
        faTimes: faTimes,
        faEdit: faEdit,
        faTrashAlt: faTrashAlt
    };
    private paginationConfig: any = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.stores.count
    };
    private loading: boolean = false;

    constructor(private storeService: StoreService, private toastrService: ToastrService) { }

    ngOnInit() {
        this.getAllStores();
    }

    public getAllStores() {
        this.loading = true;
        this.storeService.getAll().subscribe((stores: IStore[]) => {
            this.stores = stores;
            this.loading = false;
        });
    };
    public save(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            /* Put */
            if (this.currentStore.Id) {
                this.storeService
                    .put(this.currentStore.Id, this.currentStore)
                    .subscribe((editedStore: IStore) => {
                        let index = this.stores.findIndex((c) => c.Id === editedStore.Id);
                        this.stores.splice(index, 1, editedStore);
                        this.loading = false;
                        this.toastrService.success('Se ha editado correctamente', 'Sucursal Editada');
                    });
            }
            /* Post */
            else {
                this.storeService
                    .post(this.currentStore)
                    .subscribe((createdStore: IStore) => {
                        this.currentStore = createdStore;
                        this.stores.push(createdStore);
                        this.loading = false;
                        this.toastrService.success('Se ha creado correctamente', 'Sucursal Creada');
                    });
            }
        }
    };
    public edit(store: IStore) {
        this.currentStore = store;
    };
    public delete(store: IStore) {
        this.storeService.delete(store.Id).subscribe((deletedStore: IStore) => {
            let index = this.stores.findIndex((c) => c.Id === deletedStore.Id);
            this.stores.splice(index, 1);
            this.toastrService.success('Se ha eliminado correctamente', 'Sucursal Eliminada');
        });
    };
    public cancel() {
        this.currentStore = this.defaultStore();
    };
    public defaultStore() {
        return {
            Id: null,
            Name: null,
            Description: null,
            Location: null,
            Active: true
        }
    };
    public pageChanged($event) {
        this.paginationConfig.currentPage = $event;
    }
}
