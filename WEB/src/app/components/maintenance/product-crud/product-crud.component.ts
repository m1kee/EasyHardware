import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../domain/product';
import { faSave, faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styles: []
})
export class ProductCrudComponent implements OnInit {
    private products: any = [];
    private currentProduct: IProduct = this.defaultProduct();
    private icons: any = {
        faSave: faSave,
        faTimes: faTimes,
        faEdit: faEdit,
        faTrashAlt: faTrashAlt
    };
    private paginationConfig: any = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.products.count
    };
    private loading: boolean = false;

    constructor(private productService: ProductService, private toastrService: ToastrService) { }

    ngOnInit() {
        this.getAllProducts();
    }

    public getAllProducts() {
        this.loading = true;
        this.productService.getAll().subscribe((products: IProduct[]) => {
            this.products = products;
            this.loading = false;
        });
    };
    public save(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            /* Put */
            if (this.currentProduct.Id) {
                this.productService
                    .put(this.currentProduct.Id, this.currentProduct)
                    .subscribe((editedStore: IProduct) => {
                        let index = this.products.findIndex((c) => c.Id === editedStore.Id);
                        this.products.splice(index, 1, editedStore);
                        this.loading = false;
                        this.toastrService.success('Se ha editado correctamente', 'Producto Editado');
                    });
            }
            /* Post */
            else {
                this.productService
                    .post(this.currentProduct)
                    .subscribe((createdStore: IProduct) => {
                        this.currentProduct = createdStore;
                        this.products.push(createdStore);
                        this.loading = false;
                        this.toastrService.success('Se ha creado correctamente', 'Producto Creado');
                    });
            }
        }
    };
    public edit(store: IProduct) {
        this.currentProduct = store;
    };
    public delete(store: IProduct) {
        this.productService.delete(store.Id).subscribe((deletedStore: IProduct) => {
            let index = this.products.findIndex((c) => c.Id === deletedStore.Id);
            this.products.splice(index, 1);
            this.toastrService.success('Se ha eliminado correctamente', 'Producto Eliminado');
        });
    };
    public cancel() {
        this.currentProduct = this.defaultProduct();
    };
    public defaultProduct(): IProduct {
        return {
            Id: null,
            Name: null,
            Price: null,
            Description: null,
            PartNumber: null,
            Active: true,
            ProductCategory: null,
            Categories: null
        }
    };
    public pageChanged($event) {
        this.paginationConfig.currentPage = $event;
    }
}
