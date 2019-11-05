import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { faSave, faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ICategory } from '@domain/category';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-category-crud',
    templateUrl: './category-crud.component.html',
    styles: []
})
export class CategoryCrudComponent implements OnInit {

    unparentCategories: any = [];
    categories: ICategory[] = [];
    currentCategory: ICategory = this.defaultCategory();
    dropdownSettings: IDropdownSettings = {
        singleSelection: true,
        idField: 'Id',
        textField: 'Name',
        allowSearchFilter: true,
        searchPlaceholderText: 'Ingrese el nombre de la categoría'
    };
    icons: any = {
        faSave: faSave,
        faTimes: faTimes,
        faEdit: faEdit,
        faTrashAlt: faTrashAlt
    };
    paginationConfig: any = {
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: this.categories.length
    };
    loading: boolean = false;

    constructor(
        private categoryService: CategoryService,
        private toastrService: ToastrService
    ) { };

    ngOnInit() {
        this.getCategories();
    };

    categoryPageChanged(event) {
        this.paginationConfig.currentPage = event;
    };

    getCategories() {
        this.loading = true;
        this.categoryService.getAll(false).subscribe((categories: ICategory[]) => {
            this.categories = categories;
            this.assignUnparentCategories(this.currentCategory.Id);
            this.loading = false;
        });
    };

    save(form: NgForm) {
        this.loading = true;
        if (form.valid) {
            if (!this.currentCategory.Id) {
                // post
                this.categoryService
                    .post(this.currentCategory)
                    .subscribe((createdCategory: ICategory) => {
                        this.currentCategory = createdCategory;
                        this.categories.push(createdCategory);
                        this.loading = false;
                        this.toastrService.success('Se ha creado correctamente', 'Categoría Creada');
                    });
            } else {
                // put
                this.categoryService
                    .put(this.currentCategory.Id, this.currentCategory)
                    .subscribe((editedCategory: ICategory) => {
                        let cIndex = this.categories.findIndex((c) => c.Id === editedCategory.Id);
                        this.categories.splice(cIndex, 1, editedCategory);
                        this.loading = false;
                        this.toastrService.success('Se ha editado correctamente', 'Categoría Editada');
                    });
            }
        }
    };

    edit(category: ICategory) {
        this.currentCategory = category;
        this.assignUnparentCategories(this.currentCategory.Id);
    };

    delete(category: ICategory) {
        this.categoryService.delete(category.Id).subscribe((deletedCategory: ICategory) => {
            let cIndex = this.categories.findIndex((c) => c.Id === deletedCategory.Id);
            this.categories.splice(cIndex, 1);
            this.toastrService.success('Se ha eliminado correctamente', 'Categoría Eliminada');
        });
    };

    cancel() {
        this.currentCategory = this.defaultCategory();
        this.assignUnparentCategories(this.currentCategory.Id);
    };

    assignUnparentCategories(categoryId: number) {
        this.unparentCategories = this.categories.filter(c => !c.ParentCategoryId && (!categoryId || (categoryId && c.Id !== categoryId)));
    }

    defaultCategory() {
        return {
            Active: true,
            Description: null,
            Id: null,
            Code: null,
            Name: null,
            Order: 1,
            ParentCategoryId: null,
            ParentCategory: null,
            ProductCategory: null,
            SubCategories: null
        };
    };
}
