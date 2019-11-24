using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class Purchase : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (customMap)
            {
                if (this.PurchaseDetail != null)
                {
                    result.PurchaseDetail = this.PurchaseDetail.MapAll(true);
                }

                if (this.PurchaseState != null)
                {
                    result.PurchaseState = this.PurchaseState.Map(false);
                }
            }

            return result;
        }
    }
}
