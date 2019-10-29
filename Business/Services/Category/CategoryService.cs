using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class CategoryService : ICategoryService
    {
        /// <summary>
        /// Get active categories with respective subcategories
        /// </summary>
        /// <param name="context"></param>
        /// <returns>List of categories</returns>
        public IList<Category> Get(EasyHardwareEntities context)
        {
            return context.Category.Where(x => x.Active && x.ParentCategoryId == null)
                                   .OrderBy(x => x.Order)
                                   .ToList();
        }
        public Category Get(EasyHardwareEntities context, int categoryId)
        {
            // get the attached category 
            return context.Category.SingleOrDefault(x => x.Id == categoryId);
        }
        public Category Get(EasyHardwareEntities context, string categoryCode)
        {
            // get the attached category 
            return context.Category.SingleOrDefault(x => x.Code == categoryCode);
        }
        public Category Add(EasyHardwareEntities context, Category category)
        {
            // add category to context
            context.Category.Add(category);
            // save changes
            context.SaveChanges();
            return category;
        }
        public Category Edit(EasyHardwareEntities context, int categoryId, Category category)
        {
            // get the attached category 
            Category dbCategory = context.Category.Single(x => x.Id == categoryId);
            // edit values
            dbCategory.Active = category.Active;
            dbCategory.Description = category.Description;
            dbCategory.Name = category.Name;
            dbCategory.Order = category.Order;
            dbCategory.ParentCategoryId = category.ParentCategoryId;
            // save changes after edit
            context.SaveChanges();
            // return edited category
            return category;
        }
        public Category Delete(EasyHardwareEntities context, int categoryId)
        {
            // get the attached category 
            Category category = context.Category.Single(x => x.Id == categoryId);
            // soft delete
            category.Active = false;
            // save changes after soft delete
            context.SaveChanges();
            // returns deleted category
            return category;
        }
    }
}
