using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface IPurchaseService
    {
        IList<Purchase> GetAll(EasyHardwareEntities context, int userId);
        Purchase Get(EasyHardwareEntities context, int purchaseId);
        Purchase Get(EasyHardwareEntities context, Guid purchaseCode);
        Purchase Add(EasyHardwareEntities context, Purchase purchase);
    }
}
