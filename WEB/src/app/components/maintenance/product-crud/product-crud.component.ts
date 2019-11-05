import { Component, OnInit } from '@angular/core';
import { IProduct } from '@domain/product';
import { faSave, faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '@services/product.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { CategoryService } from '@services/category.service';
import { ICategory } from '@domain/category';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
    selector: 'app-product-crud',
    templateUrl: './product-crud.component.html',
    styles: []
})
export class ProductCrudComponent implements OnInit {
    private products: IProduct[] = [];
    private categories: ICategory[] = [];
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
        totalItems: this.products.length
    };
    private loading: boolean = false;
    private dropdownSettings: IDropdownSettings = {
        singleSelection: false,
        idField: 'Id',
        textField: 'Name',
        allowSearchFilter: true,
        searchPlaceholderText: 'Ingrese el nombre de la categoría',
        enableCheckAll: true,
        selectAllText: 'Seleccionar todas',
        unSelectAllText: 'Desmarcar todas',
        noDataAvailablePlaceholderText: 'No hay categorías'
    };

    constructor(
        private productService: ProductService,
        private toastrService: ToastrService,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.getAllProducts();
        this.getAllCategories();
    }

    public getAllProducts() {
        this.loading = true;
        this.productService.getAll().subscribe((products: IProduct[]) => {
            this.products = products;
            this.loading = false;
        });
    };
    public getAllCategories() {
        this.categoryService.getAll(false).subscribe((categories: ICategory[]) => {
            this.categories = categories;
        }, (error) => {
            console.log('Error getting categories: ', error);
        }, () => {
            this.loading = false;
        });
    };
    public save(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            this.mapCategories();
            /* Put */
            if (this.currentProduct.Id) {
                this.productService
                    .put(this.currentProduct.Id, this.currentProduct)
                    .subscribe((editedStore: IProduct) => {
                        let index = this.products.findIndex((c) => c.Id === editedStore.Id);
                        this.products.splice(index, 1, editedStore);
                        this.toastrService.success('Se ha editado correctamente', 'Producto Editado');
                    }, (error) => {
                        this.loading = false;
                        this.toastrService.error('Ocurrió un error al editar el producto', 'Error');
                    }, () => {
                        this.loading = false;
                    });
            }
            /* Post */
            else {
                this.productService
                    .post(this.currentProduct)
                    .subscribe((createdStore: IProduct) => {
                        this.currentProduct = createdStore;
                        this.products.push(createdStore);
                        this.toastrService.success('Se ha creado correctamente', 'Producto Creado');
                    }, (error) => {
                        this.loading = false;
                        this.toastrService.error('Ocurrió un error al crear el producto', 'Error');
                    }, () => {
                        this.loading = false;
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
            Categories: null
        }
    };
    public pageChanged($event) {
        this.paginationConfig.currentPage = $event;
    };
    /* called before post submit to append fully loaded categories to the product */
    public mapCategories() {
        if (this.currentProduct.Categories && this.currentProduct.Categories.length > 0) {
            let selectedCategories: ICategory[] = [];
            this.currentProduct.Categories.forEach((category) => {
                let categoryFound = this.categories.find(c => c.Id === category.Id);
                if (categoryFound) {
                    selectedCategories.push(categoryFound);
                }
            });

            if (selectedCategories.length > 0) {
                this.currentProduct.Categories = selectedCategories;
            }
        }
        console.log('currentProduct.Categories: ', this.currentProduct.Categories);
    }
}
