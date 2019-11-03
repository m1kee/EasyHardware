using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IStoreService
    {
        IList<Store> Get(EasyHardwareEntities context);
        Store Get(EasyHardwareEntities context, int storeId);
        Store Get(EasyHardwareEntities context, string storeCode);
        Store Add(EasyHardwareEntities context, Store store);   
        Store Edit(EasyHardwareEntities context, int storeId, Store store);
        Store Delete(EasyHardwareEntities context, int storeId);
    }
}
