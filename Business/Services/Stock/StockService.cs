using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;

namespace Business.Services
{
    public class StockService : IStockService
    {
        public void GenerateStock(EasyHardwareEntities context, Product product)
        {
            // get all stores to generate stock for this product
            List<Store> stores = context.Store.ToList();

            if (stores != null && stores.Any())
            {
                foreach (Store store in stores)
                {
                    context.Stock.Add(new Stock()
                    {
                        ProductId = product.Id,
                        StoreId = store.Id,
                        Quantity = 0
                    });
                }

                context.SaveChanges();
            }
        }

        public void GenerateStock(EasyHardwareEntities context, Store store)
        {
            // get all products to generate stock all products
            List<Product> products = context.Product.ToList();

            if (products != null && products.Any())
            {
                foreach (Product product in products)
                {
                    context.Stock.Add(new Stock()
                    {
                        ProductId = product.Id,
                        StoreId = store.Id,
                        Quantity = 0
                    });
                }

                context.SaveChanges();
            }
        }
    }
}
