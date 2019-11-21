using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public partial class Category : EasyHardwareBase
    {
        public override JObject Map(bool customMap)
        {
            dynamic result = base.Map(customMap);

            if (customMap)
            {
                if (this.SubCategories != null && this.SubCategories.Any())
                {
                    result.SubCategories = this.SubCategories.MapAll(false);
                }

                if (this.ParentCategory != null)
                {
                    result.ParentCategory = this.ParentCategory.Map(false);
                }
            }

            return result;
        }
    }
}
