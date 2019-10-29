using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class ProductService : IProductService
    {
        /// <summary>
        /// Get active products
        /// </summary>
        /// <param name="context"></param>
        /// <returns>List of products</returns>
        public IList<Domain.Product> Get(EasyHardwareEntities context)
        {
            return context.Product.Where(x => x.Active)
                                  .ToList();
        }
        public Domain.Product Get(EasyHardwareEntities context, int productId)
        {
            // get the attached product 
            return context.Product.SingleOrDefault(x => x.Id == productId);
        }
        public Domain.Product Add(EasyHardwareEntities context, Domain.Product product)
        {
            // add product to context
            context.Product.Add(product);
            // save changes
            context.SaveChanges();
            return product;
        }
        public Domain.Product Edit(EasyHardwareEntities context, int productId, Domain.Product product)
        {
            // get the attached product 
            Domain.Product dbProduct = context.Product.Single(x => x.Id == productId);
            // edit values
            dbProduct.Active = product.Active;
            dbProduct.Description = product.Description;
            dbProduct.Name = product.Name;
            dbProduct.PartNumber = product.PartNumber;
            // save changes after edit
            context.SaveChanges();
            // return edited product
            return product;
        }
        public Domain.Product Delete(EasyHardwareEntities context, int productId)
        {
            // get the attached product 
            Domain.Product product = context.Product.Single(x => x.Id == productId);
            // soft delete
            product.Active = false;
            // save changes after soft delete
            context.SaveChanges();
            // returns deleted product
            return product;
        }
    }
}
