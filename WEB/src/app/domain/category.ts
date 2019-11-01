export interface ICategory {
    Id: number;
    Name: string;
    Description: string;
    Order: number;
    Active: boolean;
    ParentCategoryId: number;
    ParentCategory: ICategory;
    SubCategories: ICategory[];
    ProductCategory: any[];
}
