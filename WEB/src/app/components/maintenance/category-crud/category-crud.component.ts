import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { faSave, faTimes, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { ICategory } from '../../../domain/category';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-category-crud',
    templateUrl: './category-crud.component.html',
    styles: []
})
export class CategoryCrudComponent implements OnInit {

    unparentCategories: any = [];
    categories: any = [];
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
        totalItems: this.categories.count
    };
    loading: boolean = false;

    constructor(private categoryService: CategoryService, private toastrServive: ToastrService) { };

    ngOnInit() {
        this.getCategories();
    };

    categoryPageChanged(event) {
        this.paginationConfig.currentPage = event;
    };

    getCategories() {
        this.loading = true;
        this.categoryService.getAll(false).subscribe((categories: any[]) => {
            this.categories = categories;
            this.assignUnparentCategories(this.currentCategory.Id);
            this.loading = false;
        });
    };

    saveCategory(categoryForm: NgForm) {
        this.loading = true;
        //console.log('formulario posteado');
        //console.log('ngForm: ', categoryForm);
        //console.log('values:', categoryForm.value);
        //console.log('category:', this.currentCategory);
        if (categoryForm.valid) {
            if (!this.currentCategory.Id) {
                // post
                this.categoryService.post(this.currentCategory).subscribe((createdCategory: ICategory) => {
                    console.log('category created: ', createdCategory);
                    console.log('adding to categories list');
                    this.categories.push(createdCategory);
                    this.loading = false;
                    this.toastrServive.success('Se ha creado correctamente', 'Categoría Creada');
                });
            } else {
                // put
                this.categoryService.put(this.currentCategory.Id ,this.currentCategory).subscribe((editedCategory: ICategory) => {
                    console.log('category edited: ', editedCategory);
                    console.log('replacing in categories list');
                    let cIndex = this.categories.findIndex((c) => c.Id === editedCategory.Id);
                    this.categories.splice(cIndex, 1, editedCategory);
                    this.loading = false;
                    this.toastrServive.success('Se ha editado correctamente', 'Categoría Editada');
                });
            }
        }
    };

    editCategory(category: ICategory) {
        this.currentCategory = category;
        this.assignUnparentCategories(this.currentCategory.Id);
    };

    deleteCategory(category: ICategory) {
        this.categoryService.delete(category.Id).subscribe((deletedCategory: ICategory) => {
            console.log('removed category: ', deletedCategory);
            console.log('removing from categories list');
            let cIndex = this.categories.findIndex((c) => c.Id === deletedCategory.Id);
            this.categories.splice(cIndex, 1);
            this.toastrServive.success('Se ha eliminado correctamente', 'Categoría Eliminada');
        });
    };

    cancelEdit() {
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
            Name: null,
            Order: 1,
            ParentCategoryId: null,
            ParentCategory: null,
            ProductCategory: null,
            SubCategories: null
        };
    };
}
