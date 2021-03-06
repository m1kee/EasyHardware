﻿using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public interface ICategoryService
    {
        IList<Category> Get(EasyHardwareEntities context, bool onlyUnparent);
        Category Get(EasyHardwareEntities context, int category);
        Category Get(EasyHardwareEntities context, string categoryCode);
        Category Add(EasyHardwareEntities context, Category category);
        Category Edit(EasyHardwareEntities context, int categoryId, Category category);
        Category Delete(EasyHardwareEntities context, int categoryId);

    }
}
