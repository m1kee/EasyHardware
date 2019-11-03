using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IProductService
    {
        IList<Product> Get(EasyHardwareEntities context);
        Product Get(EasyHardwareEntities context, int productId);
        Product Get(EasyHardwareEntities context, string productPartNumber);
        Product Add(EasyHardwareEntities context, Product product);
        Product Edit(EasyHardwareEntities context, int productId, Product product);
        Product Delete(EasyHardwareEntities context, int productId);
    }
}
