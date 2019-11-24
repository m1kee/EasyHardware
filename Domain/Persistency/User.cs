using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class User : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (customMap)
            {
                if (this.Profile != null)
                {
                    result.Profile = this.Profile.Map(false);
                }

                if (this.UserAdresses != null && this.UserAdresses.Any())
                {
                    result.UserAdresses = this.UserAdresses.MapAll(false);
                }
            }

            return result;
        }
    }
}
