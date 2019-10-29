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
        IList<Domain.Product> Get(EasyHardwareEntities context);
        Domain.Product Get(EasyHardwareEntities context, int productId);
        Domain.Product Add(EasyHardwareEntities context, Domain.Product product);
        Domain.Product Edit(EasyHardwareEntities context, int productId, Domain.Product product);
        Domain.Product Delete(EasyHardwareEntities context, int productId);
    }
}
